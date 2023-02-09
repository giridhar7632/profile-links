import authorizationMiddleware from '../../../utils/authorizationMiddleware'
import prisma from '../../../utils/prisma'

export default authorizationMiddleware(async function handle(req, res) {
  const { id, link } = req.body
  try {
    // 1. garb the user id by authorization
    const userId = req.user
    // 2. find the link by id connected to user id and update
    const data = await prisma.links.update({
      where: { id },
      data: {
        ...link,
        User: {
          connect: { id: userId },
        },
      },
    })
    // 3. send response
    res
      .status(200)
      .json({ message: 'User found!', link: data, type: 'success' })
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
