
const { PrismaClient, Prisma } = require('@prisma/client')
const prisma = new PrismaClient()

async function main () {
  // const user = await prisma.user.create({
  //   data: {
  //     name: 'Alice',
  //     email: 'alice@prisma.io',
  //   },
  // })

  // const user = await prisma.users.findMany({select: {
  //     id: true,
  //     firstName: true,
  //     lastName: true,
  //     username: true,
  //     activeFlag: true,
  //     roleName: true
  // }})
  // console.log(user)

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
