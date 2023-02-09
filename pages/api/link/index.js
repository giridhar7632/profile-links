import authorizationMiddleware from '../../../utils/authorizationMiddleware'
import prisma from '../../../utils/prisma'

export default authorizationMiddleware(async function handle(req, res) {
  try {
    const userId = req.user
    const links = await prisma.links.findMany({ where: { userId } })
    res.status(200).json({ message: 'User found!', links, type: 'success' })
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
