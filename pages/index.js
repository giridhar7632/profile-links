import Link from 'next/link'
import Router from 'next/router'
import { useEffect } from 'react'

import Button from '../components/common/Button'
import Meta from '../components/layout/Meta'
import { useAuth } from '../utils/useAuth'

export default function Index() {
  const { user, isAuth } = useAuth()

  useEffect(() => {
    if (isAuth) {
      Router.replace(`/p/${user}`)
    }
  }, [isAuth, user])

  return (
    <div
      className={
        "max-w-screen relative flex min-h-screen min-w-full bg-[url('/background.png')] bg-cover bg-clip-border bg-left-bottom bg-no-repeat"
      }
    >
      <Meta />
      <nav className="absolute z-10 flex w-full items-center justify-between p-4">
        <Link className="text-lg" href={'/'}>
          Rosette links
        </Link>
        <div className="btn-group">
          <Link href={'/login'}>
            <Button
              variant="text"
              style={{ background: 'white', marginRight: 10 }}
            >
              Log in
            </Button>
          </Link>
          <Link href={'/register'}>
            <Button>Sign up</Button>
          </Link>
        </div>
      </nav>
      <div className="flex w-full flex-1 flex-col items-center bg-white bg-opacity-90 px-4 backdrop-blur-sm md:max-w-2xl md:px-0 lg:max-w-3xl">
        <div className="flex flex-1 flex-col justify-center">
          <h1 className="max-w-lg text-xl font-semibold md:text-3xl">
            A place to add and share your links online. Add links and share your
            profile on social media.
          </h1>
          <div className="my-8">
            <Link href={'/register'}>
              <Button>Get started</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
