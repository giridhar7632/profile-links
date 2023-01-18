import extractId from '../../../utils/extractId'
import prisma from '../../../utils/prisma'

export default async function handle(req, res) {
  const { token } = req.body
  try {
    const userId = await extractId(token)
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        links: true,
        socials: true,
      },
    })
    if (!user) {
      return res.json({
        message: 'User does not exist!',
        type: 'error',
      })
    }
    return res.json({ message: 'User found!', data: user, type: 'success' })
  } catch (error) {
    console.log(error)
    return res.json({ message: 'Something went wrong!', type: 'error' })
  }
}
