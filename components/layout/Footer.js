import React from 'react'
import { Link } from '../common/Links'

const Footer = () => {
	return (
		<footer className='h-[5vh] w-full border-t border-gray-200 bg-white p-3 text-center lg:h-[8vh]'>
			Made by
			<Link href={'https://github.com/giridhar7632'} target={'_blank'}>
				Giridhar
			</Link>
		</footer>
	)
}

export default Footer
