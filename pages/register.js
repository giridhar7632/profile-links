import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import Link from '../components/common/Link'
import FormSection from '../components/FormSection'
import Layout from '../components/layout'

const Register = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm()
	const [loading, setLoading] = useState(false)
	const onFormSubmit = handleSubmit(async (data) => {
		setLoading(true)
		console.log(data)
		setLoading(false)
		reset()
	})
	return (
		<Layout meta={{ name: 'Register' }}>
			<div className='mx-auto max-w-xl'>
				<h1 className='mb-6 w-max text-clip text-2xl font-bold'>Register</h1>
				<form>
					<FormSection defaultOpen={true} title={'Credentials'}>
						<Input
							label='Nick Name'
							name='name'
							type='text'
							placeholder='Space mozarat'
							aria-label='username'
							autoComplete='current-name'
							autoFocus
							register={register('name', {
								minLength: {
									value: 3,
									message: `Your nick name must be at least 3 characters!`,
								},
							})}
							error={errors?.name}
						/>
						<Input
							label={'Email'}
							name={'email'}
							type='email'
							required
							placeholder='your@email.com'
							aria-label='user-email'
							autoComplete='current-email'
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
							type='password'
							name='password'
							placeholder={`Super secret ✨ - minimum 8 characters`}
							aria-label='user-password'
							handleClick={() => setShowPassword((prev) => !prev)}
							register={register('password', {
								required: `Password is required!`,
								pattern: {
									value:
										/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
									message:
										'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
								},
								minLength: {
									value: 8,
									message: 'Password should be atleast 8 characters long!',
								},
							})}
							error={errors?.password}
						/>
					</FormSection>
					{/* Social media links */}
					<FormSection title={'Social media'}>
						<p className='text-xs text-gray-600'>
							Enter your social media urls
						</p>
						<Input
							name='facebook'
							type='link'
							placeholder='Facebook'
							register={register('socials.facebook')}
						/>
						<Input
							name='instagram'
							type='link'
							placeholder='Instagram'
							register={register('socials.instagram')}
						/>
						<Input
							name='twitter'
							type='link'
							placeholder='Twitter'
							register={register('socials.twitter')}
						/>
					</FormSection>

					{/* Social media links */}
					<FormSection title={'Profile links'}>
						<Input
							name='link'
							type='link'
							placeholder='an important link to share on your profile'
							register={register('link1')}
						/>
						<Button variant={'text'} className='my-2 w-full' onClick={() => {}}>
							+ Add another
						</Button>
					</FormSection>

					<Button
						loading={loading}
						loadingText={'Creating your profile...'}
						className={'mt-4'}
						onClick={onFormSubmit}>
						Create my profile
					</Button>
				</form>

				<p className='mt-6'>
					{'Already have a profile?'} <Link href={'login'}>Login</Link>
				</p>
			</div>
		</Layout>
	)
}

export default Register
