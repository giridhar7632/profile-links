import extractId from '../../../utils/extractId'
import prisma from '../../../utils/prisma'

export default async function handle(req, res) {
  const { token } = req.body
  try {
    const id = await extractId(token)
    const links = await prisma.links.findMany({ where: { userId: id } })
    return res.json({ message: 'User found!', data: links, type: 'success' })
  } catch (error) {
    console.log(error)
    return res.json({ message: 'Something went wrong!', type: 'error' })
  }
}
