import authenticationMiddleware from '../../../utils/authorizationMiddleware'
import prisma from '../../../utils/prisma'

export default authenticationMiddleware(async function handle(req, res) {
  const { id } = req.body
  console.log(req.body)
  try {
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
