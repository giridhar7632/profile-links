import Image from 'next/image'
import React from 'react'
import { Facebook, Instagram, Twitter } from '../../components/common/icons'
import Link from '../../components/common/Link'
import Layout from '../../components/layout'
import temp from '../../data.json'

const Profile = ({ profile }) => {
	if (!profile)
		return (
			<Layout>
				<div className={'w-full text-center text-2xl font-bold text-gray-400'}>
					No data
				</div>
			</Layout>
		)
	return (
		<Layout meta={{ name: profile.name }}>
			<div className='mx-auto flex max-w-lg flex-col'>
				<div className='flex flex-col items-center justify-center'>
					<Image
						src={'/logo.png'}
						width={100}
						height={100}
						className={'mb-2 rounded-full'}
						alt={profile.name}
						loading={'lazy'}
						placeholder={'blur'}
						blurDataURL='data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
					/>
					<h1 className='text-xl font-bold'>{profile.name}</h1>
				</div>

				<div className='my-4 mx-auto flex max-w-xs items-center justify-around'>
					<Link href={profile.socials.twitter}>
						<Twitter width={24} />
					</Link>
					<Link href={profile.socials.instagram}>
						<Instagram width={24} />
					</Link>
					<Link href={profile.socials.facebook}>
						<Facebook width={24} />
					</Link>
				</div>

				<div className='flex flex-col'>
					<h2 className='mb-2 text-gray-500'>Links</h2>
					{profile.links.map((i, idx) => (
						<Link href={i.link} key={idx}>
							<div className='mb-2 flex cursor-pointer items-center justify-between rounded-md border p-3 font-medium shadow-sm hover:shadow-md'>
								{i.title}
							</div>
						</Link>
					))}
				</div>
			</div>
		</Layout>
	)
}

export default Profile

export async function getStaticProps({ params }) {
	try {
		return {
			props: { profile: null },
		}
	} catch (error) {
		return {
			props: {},
		}
	}
}

export async function getStaticPaths() {
	const profiles = [{ id: '1' }, { id: '2' }, { id: '3' }]
	return {
		paths: profiles.map((item) => ({
			params: { id: item.id },
		})),
		fallback: true,
	}
}
