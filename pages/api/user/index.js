import prisma from '../../../utils/prisma'

export default async function handle(req, res) {
  const { userId } = req.body
  try {
    // 1. check for user in database
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        links: true,
        socials: true,
      },
    })
    if (!user) {
      // if user doesn't exist return error
      throw new Error('User does not exist!')
    }
    res
      .status(200)
      .json({ message: 'User found!', profile: user, type: 'success' })
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
