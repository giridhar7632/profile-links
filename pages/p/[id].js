import axios from 'axios'
import Image from 'next/image'

import { Facebook, Instagram, Twitter } from '../../components/common/icons'
import Link from '../../components/common/Link'
import Layout from '../../components/layout'
import LinkForm from '../../components/LinkForm'
import ProfileLink from '../../components/ProfileLink'
import prisma from '../../utils/prisma'

const Profile = ({ user, message, type }) => {
  if (type !== 'success')
    return (
      <Layout>
        <div className={'w-full text-center text-2xl font-bold text-gray-400'}>
          {message}
        </div>
      </Layout>
    )

  const handleAddLink = async (data) => {
    const { data: res } = await axios.post('/api/link/create', data)
    user.links.append(res.data)
  }

  return (
    <Layout meta={{ name: user?.name }}>
      <div className="mx-auto flex max-w-lg flex-col">
        <div className="flex flex-col items-center justify-center">
          <Image
            src={'/logo.png'}
            width={100}
            height={100}
            className={'mb-2 rounded-full'}
            alt={user.name}
            loading={'lazy'}
            placeholder={'blur'}
            blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
          <h1 className="text-xl font-bold">{user.name}</h1>
        </div>

        <div className="my-4 mx-auto flex max-w-xs items-center justify-around">
          <Link href={user.socials.twitter}>
            <Twitter width={24} />
          </Link>
          <Link href={user.socials.instagram}>
            <Instagram width={24} />
          </Link>
          <Link href={user.socials.facebook}>
            <Facebook width={24} />
          </Link>
        </div>

        <div className="flex flex-col">
          <h2 className="mb-2 text-gray-500">Links</h2>
          {user.links.length < 10 ? (
            <LinkForm
              className={'w-full'}
              title={'Add Link'}
              onFormSubmit={handleAddLink}
            >
              + Add Link
            </LinkForm>
          ) : (
            ''
          )}
          <ul>
            {user.links.map((i, idx) => (
              <ProfileLink key={idx} {...i} />
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  )
}

export default Profile

export async function getStaticProps({ params }) {
  try {
    const { data } = await axios.post('http://localhost:3000/api/user', {
      token: params.id,
    })
    return {
      props: { ...data },
    }
  } catch (error) {
    console.log(error)
    return {
      props: { message: 'User not found! 😕', type: 'error' },
    }
  }
}

export async function getStaticPaths() {
  const users = await prisma.user.findMany({ select: { token: true } })
  return {
    paths: users.map((item) => ({
      params: { id: item.token },
    })),
    fallback: true,
  }
}
