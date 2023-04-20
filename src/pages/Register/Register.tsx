import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Input } from 'src/components/Input'
import { getRules } from 'src/utils/rules'

interface FormData {
  email: string
  password: string
  confirm_password: string
}

const Register = () => {
  // react hook form
  const {
    handleSubmit,
    formState: { errors },
    register,
    getValues
  } = useForm<FormData>()

  // rules
  const rules = getRules(getValues)

  const handleSubmitRegister = (values: any) => {
    // console.log('🚀 ~ file: Register.tsx:9 ~ handleSubmitRegister ~ values:', values)
    const password = getValues('password')
    console.log('🚀 ~ file: Register.tsx:23 ~ handleSubmitRegister ~ password:', password)
  }

  // console.log('error', errors)
  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={handleSubmit(handleSubmitRegister)} noValidate>
              <div className='text-2xl'>Đăng Ký</div>
              <Input
                autoComplete='on'
                name='email'
                register={register}
                rules={rules.email}
                className='mt-8'
                type='email'
                placeholder='Email'
                errorMessage={errors.email?.message}
              />
              <Input
                autoComplete='on'
                name='password'
                register={register}
                rules={rules.password}
                className='mt-2'
                type='password'
                placeholder='Password'
                errorMessage={errors.password?.message}
              />
              <Input
                autoComplete='on'
                name='confirm_password'
                register={register}
                rules={rules.confirm_password}
                className='mt-2'
                type='password'
                placeholder='Confirm Password'
                errorMessage={errors.confirm_password?.message}
              />
              <div className='mt-3'>
                <button
                  type='submit'
                  className='w-full cursor-pointer bg-red-500 px-2 py-4 text-center uppercase text-white hover:bg-red-600'
                >
                  Đăng ký
                </button>
              </div>
              <div className='mt-8 flex items-center justify-center gap-x-1'>
                <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                <Link className='text-red-400' to={'/login'}>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
