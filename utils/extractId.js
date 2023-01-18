import prisma from './prisma'

export default async function extractId(token) {
  try {
    const { id } = await prisma.user.findFirst({ where: { token } })
    if (!id) {
      throw new Error({ message: 'User does not exist!', type: 'error' })
    }
    return id
  } catch (error) {
    throw new Error('No user')
  }
}
