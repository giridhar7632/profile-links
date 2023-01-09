import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => (
	<nav className='relative my-2 mx-4 flex flex-wrap items-center justify-between rounded-lg bg-white bg-opacity-10 py-4 shadow-sm backdrop-blur-sm'>
		<div className='container-fluid flex w-full flex-wrap items-center justify-between px-6'>
			<div className='container-fluid'>
				<Link className='mt-2 mr-1 flex items-center lg:mt-0' href='/'>
					<Image src='/logo.png' height={30} width={30} alt='' loading='lazy' />{' '}
					<span className='ml-2'>Rosette links</span>
				</Link>
			</div>
		</div>
	</nav>
)

export default Navbar
