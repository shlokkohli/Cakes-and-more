import prisma from '@/lib/prisma'
import {
  cakesData,
  cakeTypeData,
  configData,
} from './seedData'
import logger from '@/lib/logger'

const main = async () => {
  logger.info('Starting database seeding')

  await prisma.$transaction(async (tx) => {
    try {
      await tx.shuffleConfig.upsert({
        where: {
          id: 1,
        },
        update: {},
        create: configData,
      })
    } catch (error) {
      logger.error(
        'Seeding shuffle config tale failed',
        error
      )
      throw error
    }

    try {
      await tx.cakeType.createMany({
        data: cakeTypeData,
        skipDuplicates: true,
      })
    } catch (error) {
      logger.error('Seeding CakeType table failed', error)
      throw error
    }

    try {
      for (const cake of cakesData) {
        await tx.cake.create({
          data: {
            title: cake.title,
            description: cake.description,
            shortDescription: cake.shortDescription,
            price: cake.price,
            images: { create: cake.images },
            types: {
              create: cake.types.map((eachType) => ({
                cakeType: { connect: { name: eachType } },
              })),
            },
          },
        })
      }
    } catch (error) {
      logger.error('Seeding cakes table failed', error)
      throw error
    }
  })
}

main()
  .then(async () => {
    logger.info('Seeding completed successfully')
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    logger.error('Error while generating seed', error)
    await prisma.$disconnect()
    process.exit(1)
  })
