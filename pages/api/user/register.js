import prisma from '../../../utils/prisma'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

export default async function handler(req, res) {
  const { name, email, password, links, socials } = req.body

  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (user) {
      throw new Error('User already exists! try logging in')
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const token = crypto.randomBytes(16).toString('hex')
    await prisma.user.create({
      data: {
        name,
        email,
        token,
        password: hashedPassword,
        socials: {
          create: {
            ...socials,
          },
        },
        links: {
          create: links,
        },
      },
    })
    res
      .status(200)
      .json({ message: 'User registered!', token, type: 'success' })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: error?.message || 'Something went wrong!',
      type: 'error',
    })
  } finally {
    await prisma.$disconnect()
  }
}
