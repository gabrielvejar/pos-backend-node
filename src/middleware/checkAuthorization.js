const { defaultErrorResponse } = require('../controller/utils.controller')

/**
 * Middleware to check user role authorization
 * @param {*} roles - authorized roles
 */
const checkRoleAuth = (roles = ['ADMIN']) => (request, response, next) => {
  try {
    const { userRole } = request
    if (!userRole || !roles.includes(userRole)) {
      return response
        .status(403)
        .json({ success: false, error: 'user is not authorized' })
    }
    next()
  } catch (error) {
    defaultErrorResponse(response)
  }
}

module.exports = checkRoleAuth
