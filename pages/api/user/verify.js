import authorizationMiddleware from '../../../utils/authorizationMiddleware'
import prisma from '../../../utils/prisma'

// authorization middleware
export default authorizationMiddleware(async function handle(req, res) {
  const userId = req.user
  try {
    // 1. checking for the user
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

    // 2. send the user data
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
