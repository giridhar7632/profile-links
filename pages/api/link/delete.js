import extractId from '../../../utils/extractId'
import prisma from '../../../utils/prisma'

export default async function handle(req, res) {
  const { token, id } = req.body
  try {
    await extractId(token)
    await prisma.links.delete({
      where: { id },
    })
    return res.json({ message: 'Link deleted!', type: 'success' })
  } catch (error) {
    console.log(error)
    return res.json({ message: 'Something went wrong!', type: 'error' })
  }
}
