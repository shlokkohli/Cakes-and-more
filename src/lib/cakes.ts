import { logger } from 'better-auth'
import prisma from './prisma'
import { format } from 'path'
import { Elsie_Swash_Caps } from 'next/font/google'

export async function getCakeById(cakeIdSlug: string) {
  const slugArray = cakeIdSlug.split('-')
  const lastIndex = slugArray.length - 1

  const cakeId = Number(slugArray[lastIndex])

  let cakesData
  try {
    cakesData = await prisma.cake.findFirst({
      where: {
        id: cakeId,
      },
      select: {
        title: true,
        description: true,
        price: true,
        shortDescription: false,
        images: {
          where: { label: 'main' },
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
    logger.info('Unable to fetch cake data for id ', {
      error,
      cakeId,
    })
    throw error
  }

  if (!cakesData) {
    return null
  }

  const formattedCakeData = {
    ...cakesData,
    price: cakesData.price.toNumber(),
    images: cakesData.images[0].imageUrl,
    types: cakesData.types.map((t) => t.cakeType.name),
  }

  return formattedCakeData
}
