// EXTERNAL
const jwt = require('jsonwebtoken')

module.exports = (request, response, next) => {
  const authorization = request.get('authorization')
  let token = null

  console.log({ authorization })

  if (authorization && authorization.toLocaleLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }
  console.log({ token })

  const decodedToken =
    token &&
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return { error: error.message }
      }
      return decoded
    })

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  if (!decodedToken.activeFlag) {
    return response.status(403).json({ error: 'user is inactive' })
  }

  const {
    id: userId,
    roleName: userRole,
    cashier,
    sales,
    adminProducts,
    adminUsers,
    adminAdmins
  } = decodedToken

  request.userId = userId
  request.userRole = userRole
  request.cashier = cashier
  request.sales = sales
  request.adminProducts = adminProducts
  request.adminUsers = adminUsers
  request.adminAdmins = adminAdmins

  next()
}
