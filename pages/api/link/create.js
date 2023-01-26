import extractId from '../../../utils/extractId'
import prisma from '../../../utils/prisma'

export default async function handle(req, res) {
  const { token, data } = req.body
  try {
    const userId = await extractId(token)
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
}
