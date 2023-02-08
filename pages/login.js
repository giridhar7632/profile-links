import axios from 'axios'
import Router from 'next/router'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import Button from '../components/common/Button'
import Input from '../components/common/Input'
import Link from '../components/common/Link'
import Layout from '../components/layout'
import { useAuth } from '../utils/useAuth'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')
  const { setIsAuth, user, setUser } = useAuth()

  useEffect(() => {
    if (user) {
      Router.replace(`/p/${user}`)
    }
  }, [user])

  const onFormSubmit = handleSubmit(async (data) => {
    setLoading(true)
    try {
      const { data: res } = await axios.post('/api/user/login', data)
      setIsAuth(res.token)
      setUser(res.user)
      reset()
    } catch (error) {
      setStatus(error.message || 'Something went wrong!')
    }
    setLoading(false)
  })

  return (
    <Layout meta={{ name: 'Login' }}>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <form className="w-96 max-w-xl rounded-xl border p-12 text-base">
          <h1 className="mb-6 w-max text-clip text-2xl font-bold">Login</h1>
          {user}
          {status ? (
            <div className="mb-2 rounded-sm bg-red-50 p-2 text-center ring-2 ring-red-200">
              {status}
            </div>
          ) : null}
          <Input
            label={'Email'}
            name={'email'}
            type="email"
            required
            placeholder="your@email.com"
            aria-label="user-email"
            autoComplete="current-email"
            register={register('email', {
              required: `Email is required!`,
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Invalid email address!',
              },
            })}
            error={errors?.email}
          />
          <Input
            label={'Password'}
            type="password"
            name="password"
            placeholder={`Your Super secret ✨`}
            aria-label="user-password"
            register={register('password', {
              required: `Password is required!`,
            })}
            error={errors?.password}
          />
          <Button
            className={'mt-4'}
            loading={loading}
            loadingText={'Logging in...'}
            onClick={onFormSubmit}
          >
            Login
          </Button>
        </form>
        <p className="mt-6">
          {"Don't have an account?"} <Link href={'register'}>Register now</Link>
        </p>
      </div>
    </Layout>
  )
}

export default Login
