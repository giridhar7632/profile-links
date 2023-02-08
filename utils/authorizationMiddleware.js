import jwt from 'jsonwebtoken'

// 1. take handler function as input
function authenticationMiddleware(handler) {
  return async (req, res) => {
    try {
      // 2. check for valid token
      const token = req.headers['authorization'].split(' ')[1]
      const { userId } = jwt.verify(token, process.env.JWT_SECRET)
      req.user = userId
      // 3. execute the main request handler
      return await handler(req, res)
    } catch (error) {
      console.log(error)
      return res.status(401).json({ message: 'Unauthorized', type: 'error' })
    }
  }
}

export default authenticationMiddleware
