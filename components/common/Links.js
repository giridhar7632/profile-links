import NextLink from 'next/link'

export const Link = ({ children, ...props }) => {
	return (
		<NextLink {...props} className='px-2 text-orange-600 hover:underline'>
			{children}
		</NextLink>
	)
}

export const NavLink = ({ children, ...props }) => {
	return (
		<NextLink
			{...props}
			className='ease my-2 rounded border border-gray-200 p-2 text-center font-semibold text-gray-800 hover:text-orange-600 hover:shadow-sm'>
			{children}
		</NextLink>
	)
}
