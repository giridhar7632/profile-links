import prisma from '../../../utils/prisma'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export default async function handler(req, res) {
  const { email, password } = req.body

  try {
    // 1. checking for the user
    const user = await prisma.user.findUnique({
      where: { email },
    })
    if (!user) {
      // if user doesn't exist return error
      throw new Error('User does not exist!')
    }

    // 2. check for password match
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      // if password doesn't match return error
      throw new Error('Incorrect password!')
    }

    // 3. sign and send the Json Web Token with response
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    })

    res.status(200).json({
      message: 'User logged in!',
      token,
      user: user.id,
      type: 'success',
    })
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Something went wrong!',
      type: 'error',
    })
  } finally {
    await prisma.$disconnect()
  }
}
