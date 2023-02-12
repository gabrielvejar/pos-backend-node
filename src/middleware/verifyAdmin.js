module.exports = (request, response, next) => {
  if (request.userRole !== 'admin') {
    return response.status(403).json({ success: false, error: 'user is not admin' })
  }
  next()
}
