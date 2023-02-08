import prisma from '../../../utils/prisma'
import bcrypt from 'bcrypt'
import { sign } from 'jsonwebtoken'

export default async function handler(req, res) {
  const { name, email, password, links, socials } = req.body

  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (user) {
      throw new Error('User already exists! try logging in')
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
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

    const token = sign({ userId: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    })
    res.status(200).json({
      message: 'User registered!',
      token,
      user: newUser.id,
      type: 'success',
    })
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
