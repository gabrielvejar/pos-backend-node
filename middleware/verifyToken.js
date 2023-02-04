import jwt from 'jsonwebtoken'

const verifyToken = (request, response, next) => {
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

  const { id: userId, role: userRole } = decodedToken
  request.userId = userId
  request.userRole = userRole

  next()
}

export default verifyToken
