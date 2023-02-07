import prisma from '../../../utils/prisma'
import bcrypt from 'bcrypt'
import cookie from 'cookie'
import jwt from 'jsonwebtoken'

const KEY = 'JWT_SECTER_KEY'

export default async function handler(req, res) {
	const { email, password } = req.body

	try {
		const user = await prisma.user.findUnique({
			where: { email },
			include: {
				links: true,
				socials: true,
			},
		})
		if (!user) {
			throw new Error('User does not exist!')
		}
		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch) {
			throw new Error('Incorrect password!')
		}

		// saving the token as a cookie
		res.setHeader(
			'Set-Cookie',
			cookie.serialize('token', token, {
				httpOnly: true,
				secure: 'development',
				sameSite: 'strict',
				maxAge: 60 * 60 * 24 * 7, // 1 week
				path: '/',
			})
		)

		res.status(200).json({
			message: 'User logged in!',
			token: user.id,
			type: 'success',
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: error.messsage || 'Something went wrong!',
			type: 'error',
		})
	} finally {
		await prisma.$disconnect()
	}
}