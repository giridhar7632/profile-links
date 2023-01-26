import extractId from '../../../utils/extractId'
import prisma from '../../../utils/prisma'

export default async function handle(req, res) {
  const { token } = req.body
  try {
    const id = await extractId(token)
    const links = await prisma.links.findMany({ where: { userId: id } })
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
}
