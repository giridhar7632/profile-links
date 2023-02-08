import authenticationMiddleware from '../../../utils/authorizationMiddleware'
import prisma from '../../../utils/prisma'

export default authenticationMiddleware(async function handle(req, res) {
  const userId = req.user
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        links: true,
        socials: true,
      },
    })
    if (!user) {
      throw new Error('User does not exist!')
    }
    res
      .status(200)
      .json({ message: 'User found!', user: user.id, type: 'success' })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: error?.message || 'Something went wrong!',
      type: 'error',
    })
  } finally {
    await prisma.$disconnect()
  }
})
