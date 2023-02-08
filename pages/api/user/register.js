import prisma from '../../../utils/prisma'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export default async function handler(req, res) {
  const { name, email, password, links, socials } = req.body

  try {
    // 1. check if user already exists
    const user = await prisma.user.findUnique({ where: { email } })
    if (user) {
      // if user exists return error
      throw new Error('User already exists! try logging in')
    }

    // 2. hash the password and store the user in database
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

    // 3. sign a Json Web Token and send it along the request
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
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
