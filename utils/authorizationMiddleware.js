import { verify } from 'jsonwebtoken'

function authenticationMiddleware(handler) {
  return async (req, res) => {
    try {
      const token = req.headers['authorization'].split(' ')[1]
      const { userId } = verify(token, process.env.JWT_SECRET)
      req.user = userId
      return await handler(req, res)
    } catch (error) {
      console.log(error)
      return res.status(401).json({ message: 'Unauthorized', type: 'error' })
    }
  }
}

export default authenticationMiddleware
