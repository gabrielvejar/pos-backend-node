const verifyAdmin = (request, response, next) => {
  if (request.userRole !== 0) {
    return response.status(403).json({ success: false, error: 'user is not admin' })
  }
  next()
}

export default verifyAdmin
