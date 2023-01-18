import extractId from '../../../utils/extractId'
import prisma from '../../../utils/prisma'

export default async function handle(req, res) {
  const { token, links } = req.body
  try {
    const userId = await extractId(token)
    const updatedLinks = links.map((i) => ({ ...i, userId }))
    const data = await prisma.links.createMany({ data: updatedLinks })
    return res.json({ message: 'User found!', data, type: 'success' })
  } catch (error) {
    console.log(error)
    return res.json({ message: 'Something went wrong!', type: 'error' })
  }
}
