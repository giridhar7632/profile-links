import axios from 'axios'
import Image from 'next/image'
import { useState } from 'react'

import { Facebook, Instagram, Twitter } from '../../components/common/icons'
import Link from '../../components/common/Link'
import Layout from '../../components/layout'
import { baseUrl } from '../../components/layout/Meta'
import LinkForm from '../../components/LinkForm'
import ProfileLink from '../../components/ProfileLink'
import prisma from '../../utils/prisma'
import { useAuth } from '../../utils/useAuth'

const Profile = ({ profile, message, type }) => {
  const [links, setLinks] = useState(profile?.links || [])
  const { user, isAuth } = useAuth()
  const handleAddLink = async (data) => {
    try {
      const res = await axios.post(
        '/api/link/create',
        { data },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${isAuth}`,
          },
        }
      )
      setLinks((prev) => [...prev, res.data.link])
    } catch (error) {
      console.log(error)
    }
  }

  console.log(isAuth, 'user', user)

  if (type !== 'success')
    return (
      <Layout>
        <div className={'w-full text-center text-2xl font-bold text-gray-400'}>
          {message}
        </div>
      </Layout>
    )

  return (
    <Layout meta={{ name: profile?.name }}>
      <div className="mx-auto flex max-w-lg flex-col">
        <div className="flex flex-col items-center justify-center">
          <Image
            src={'/logo.png'}
            width={100}
            height={100}
            className={'mb-2 rounded-full'}
            alt={profile.name}
            loading={'lazy'}
            placeholder={'blur'}
            blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
          <h1 className="text-xl font-bold">{profile.name}</h1>
        </div>

        <div className="my-4 mx-auto flex max-w-xs items-center justify-around">
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
        {console.log(user, profile.id, user === profile.id)}
        <div className="flex flex-col">
          <h2 className="mb-2 text-gray-500">Links</h2>
          {links.length < 10 && user === profile.id ? (
            <LinkForm
              className={'mb-2 w-full'}
              title={'Add Link'}
              onFormSubmit={handleAddLink}
            >
              + Add Link
            </LinkForm>
          ) : (
            ''
          )}
          <ul>
            {links.map((i, idx) => (
              <ProfileLink
                key={idx}
                setLinks={setLinks}
                own={user === profile.id}
                token={isAuth}
                {...i}
              />
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
    const { data } = await axios.post(`${baseUrl}/api/user`, {
      userId: params.id,
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
  const users = await prisma.user.findMany({ select: { id: true } })
  return {
    paths: users.map((item) => ({
      params: { id: item.id },
    })),
    fallback: true,
  }
}
