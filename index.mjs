import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const deleteUser = async (user) => {
  return await prisma.user.delete({
    where: { id: user.id },
  })
}

const deleteUsers = async (users) => {
  users.map((user) => deleteUser(user))
}
prisma.user.findMany({}).then((data) => {
  deleteUsers(data)
})
