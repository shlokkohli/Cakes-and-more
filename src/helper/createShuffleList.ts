import prisma from '@/lib/prisma'

interface createShuffleListParams {
  seedValue: string
  pageSize: number
  offset: number
}

const createShuffleList = async ({
  seedValue,
  pageSize,
  offset,
}: createShuffleListParams) => {
  try {
    const shuffledCakeList = await prisma.$queryRaw<
      { id: number }[]
    >`SELECT id from "Cake" ORDER BY md5(id::text || ' - ' || ${seedValue}) LIMIT ${pageSize} OFFSET ${offset}`
    return shuffledCakeList
  } catch (error) {
    throw error
  }
}

export default createShuffleList
