const { PrismaClient } = require('@prisma/client')
const { user, links, socials } = require('./data.js')
const prisma = new PrismaClient()

const load = async () => {
  try {
    await prisma.user.deleteMany()
    console.log('Deleted records in user table')

    await prisma.links.deleteMany()
    console.log('Deleted records in links table')

    await prisma.socials.deleteMany()
    console.log('Deleted records in socials table')

    await prisma.$queryRaw`ALTER TABLE User AUTO_INCREMENT = 1`
    console.log('reset user auto increment to 1')

    await prisma.$queryRaw`ALTER TABLE Links AUTO_INCREMENT = 1`
    console.log('reset links auto increment to 1')

    await prisma.$queryRaw`ALTER TABLE Socials AUTO_INCREMENT = 1`
    console.log('reset socials auto increment to 1')

    await prisma.user.createMany({
      data: user,
    })
    console.log('Added user data')

    await prisma.links.createMany({
      data: links,
    })
    console.log('Added links data')

    await prisma.socials.createMany({
      data: socials,
    })
    console.log('Added socials data')

    const allUsers = await prisma.user.findMany({
      include: {
        links: true,
        socials: true,
      },
    })

    console.dir(allUsers, { depth: null })
  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

load()
