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
    return res.json({ message: 'User found!', data, type: 'success' })
  } catch (error) {
    console.log(error)
    return res.json({ message: 'Something went wrong!', type: 'error' })
  }
}
