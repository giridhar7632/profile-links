import React from 'react'
import Link from '../common/Link'

const Footer = () => (
	<footer className='relative my-2 mx-4 flex flex-wrap items-center justify-center rounded-lg bg-white bg-opacity-10 py-4 shadow-sm backdrop-blur-sm'>
		Made by
		<Link href={'https://github.com/giridhar7632'} target={'_blank'}>
			Giridhar
		</Link>
	</footer>
)

export default Footer
