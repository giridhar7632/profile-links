import prisma from '../../../lib/prisma'

export default async function handler(req, res) {
  const { name, email, password, links, socials } = req.body

  try {
    const user = await prisma.user.findFirst({ email })
    if (user) {
      res.json({
        message: 'User already exists! try logging in',
        type: 'error',
      })
    }
  } catch (error) {
    res.json({ message: 'Something went wrong!', type: 'error' })
  }
}
