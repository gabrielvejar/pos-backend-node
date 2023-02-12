// EXTERNAL
const jwt = require('jsonwebtoken')

module.exports = (request, response, next) => {
  const authorization = request.get('authorization')
  let token = null

  if (authorization && authorization.toLocaleLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }

  const decodedToken =
    token &&
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return { error: error.message }
      }
      return decoded
    })

  if (!token || !decodedToken.id) {
    return response.status(401).json({ success: false, error: 'token missing or invalid' })
  }

  if (!decodedToken.active_flag) {
    return response.status(403).json({ success: false, error: 'user is inactive' })
  }

  const {
    id: userId,
    role
    // cashier,
    // sales,
    // adminProducts,
    // adminUsers,
    // adminAdmins
  } = decodedToken

  request.userId = userId
  request.userRole = role
  // request.cashier = cashier
  // request.sales = sales
  // request.adminProducts = adminProducts
  // request.adminUsers = adminUsers
  // request.adminAdmins = adminAdmins
  next()
}
