import authorizationMiddleware from '../../../utils/authorizationMiddleware'
import prisma from '../../../utils/prisma'

export default authorizationMiddleware(async function handle(req, res) {
  const { id } = req.body
  try {
    // delete the link using id
    await prisma.links.delete({
      where: { id },
    })
    res.status(200).json({ message: 'Link deleted!', type: 'success' })
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
