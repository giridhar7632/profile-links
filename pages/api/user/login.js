import prisma from '../../../utils/prisma'
import bcrypt from 'bcrypt'

export default async function handler(req, res) {
  const { email, password } = req.body

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        links: true,
        socials: true,
      },
    })
    if (!user) {
      return res.json({
        message: 'User does not exist!',
        type: 'error',
      })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.json({
        message: 'Incorrect password!',
        type: 'error',
      })
    }
    return res.json({
      message: 'User logged in!',
      token: user.token,
      type: 'success',
    })
  } catch (error) {
    console.log(error)
    return res.json({ message: 'Something went wrong!', type: 'error' })
  }
}
