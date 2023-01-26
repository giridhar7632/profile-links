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
      throw new Error('User does not exist!')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      throw new Error('Incorrect password!')
    }
    res.status(200).json({
      message: 'User logged in!',
      token: user.token,
      type: 'success',
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: error.messsage || 'Something went wrong!',
      type: 'error',
    })
  } finally {
    await prisma.$disconnect()
  }
}
