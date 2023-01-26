import extractId from '../../../utils/extractId'
import prisma from '../../../utils/prisma'

export default async function handle(req, res) {
  const { token, id } = req.body
  try {
    await extractId(token)
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
}
