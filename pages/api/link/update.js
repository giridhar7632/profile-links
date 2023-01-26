import extractId from '../../../utils/extractId'
import prisma from '../../../utils/prisma'

export default async function handle(req, res) {
  const { token, id, link } = req.body
  try {
    const userId = await extractId(token)
    const data = await prisma.links.update({
      where: { id },
      data: {
        ...link,
        User: {
          connect: { id: userId },
        },
      },
    })
    res.status(200).json({ message: 'User found!', data, type: 'success' })
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
