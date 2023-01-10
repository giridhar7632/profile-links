import NextLink from 'next/link'

const Link = ({ children, ...props }) => {
  return (
    <NextLink {...props} className="px-2 text-orange-600 hover:underline">
      {children}
    </NextLink>
  )
}

export default Link
