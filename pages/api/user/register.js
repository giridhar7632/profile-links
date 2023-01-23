import prisma from '../../../utils/prisma'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

export default async function handler(req, res) {
  const { name, email, password, links, socials } = req.body

  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (user) {
      return res.json({
        message: 'User already exists! try logging in',
        type: 'error',
      })
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
    return res.json({ message: 'User registered!', token, type: 'success' })
  } catch (error) {
    console.log(error)
    return res.json({ message: 'Something went wrong!', type: 'error' })
  }
}
