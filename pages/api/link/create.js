import authorizationMiddleware from '../../../utils/authorizationMiddleware'
import prisma from '../../../utils/prisma'

// suthorizing the user
export default authorizationMiddleware(async function handle(req, res) {
  const { data } = req.body
  try {
    const userId = req.user
    // creating new link in table
    const link = await prisma.links.create({
      data: { ...data, User: { connect: { id: userId } } },
    })
    res.status(200).json({ message: 'Link created!', link, type: 'success' })
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
