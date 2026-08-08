import createShuffleList from '@/helper/createShuffleList'
import getCurrentDate from '@/helper/getCurrentDate'
import logger from '@/lib/logger'
import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = searchParams.get('page')

  const pageNumber = page ? Number(page) : 1
  const safePageNumber = pageNumber > 0 ? pageNumber : 1
  const offset = Number((safePageNumber - 1) * 20)
  const pageSize = 20

  let totalEntries
  try {
    totalEntries = await prisma.cake.count()
  } catch (error) {
    logger.warn('Unable to fetch total cakes entries')
    return NextResponse.json(
      { error: 'Something went wrong. Please try again' },
      { status: 500 }
    )
  }

  const lastPage = Math.ceil(totalEntries / pageSize)

  let ShuffleCounter
  try {
    ShuffleCounter = await prisma.shuffleConfig.findFirst({
      where: {
        id: 1,
      },
    })
  } catch (error) {
    logger.error(
      'Unable to fetch counter from ShuffleConfig',
      { error }
    )
    return NextResponse.json(
      {
        error: 'Unable to fetch counter from ShuffleConfig',
      },
      { status: 500 }
    )
  }

  const today = getCurrentDate()
  const seedValue = `${ShuffleCounter}-${today}`

  let shuffledCakeIDs
  try {
    shuffledCakeIDs = await createShuffleList({
      seedValue,
      pageSize,
      offset,
    })
  } catch (error) {
    logger.error('Unable to shuffle cakes list', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
  const ids = shuffledCakeIDs.map((item) => item.id)

  // based on the id's, get those cakes details
  let cakesData
  try {
    cakesData = await prisma.cake.findMany({
      where: {
        id: { in: ids },
      },
      select: {
        title: true,
        shortDescription: true,
        price: true,
        images: {
          where: { label: 'thumbnail' },
          select: { imageUrl: true },
        },
        types: {
          select: {
            cakeType: {
              select: { name: true },
            },
          },
        },
      },
    })
  } catch (error) {
    logger.error('Error fetching cakes data', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again' },
      { status: 500 }
    )
  }

  const formattedCakes = cakesData.map((eachCake) => ({
    ...eachCake,
    types: eachCake.types.map((t) => t.cakeType.name),
    images: eachCake.images[0].imageUrl,
  }))

  return NextResponse.json({
    data: formattedCakes,
    page: safePageNumber,
    totalPages: lastPage,
  })
}
