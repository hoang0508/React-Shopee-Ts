import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { loginAccount } from 'src/apis/auth.api'
import { Input } from 'src/components/Input'
import { AppContext } from 'src/contexts/app.context'
import { ErrorResponse } from 'src/types/utils.type'
import { Schema, schema } from 'src/utils/rules'
import { isAxiosUnprocessableEntity } from 'src/utils/utils'

type FormData = Omit<Schema, 'confirm_password'>
const loginSchema = schema.omit(['confirm_password'])

const Login = () => {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  // react hook form
  const {
    handleSubmit,
    setError,
    formState: { errors },
    register
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  // rules
  // const rules = getRules(getValues)
  const registerMutation = useMutation({
    mutationFn: (data: Omit<FormData, 'confirm_password'>) => loginAccount(data)
  })

  // handle submit login
  const handleSubmitLogin = (values: FormData) => {
    registerMutation.mutate(values, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntity<ErrorResponse<FormData>>(error)) {
          const formError = error.response?.data?.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
                type: 'server'
              })
            })
          }
        }
      }
    })
  }

  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={handleSubmit(handleSubmitLogin)}>
              <div className='text-2xl'>Đăng Nhập</div>
              <div>
                <Input
                  autoComplete='on'
                  name='email'
                  register={register}
                  // rules={rules.email}
                  className='mt-8'
                  type='email'
                  placeholder='Email'
                  errorMessage={errors.email?.message}
                />
              </div>
              <div className='mt-3'>
                <Input
                  autoComplete='on'
                  name='password'
                  register={register}
                  // rules={rules.password}
                  className='mt-2'
                  type='password'
                  placeholder='Password'
                  errorMessage={errors.password?.message}
                />
              </div>
              <div className='mt-3'>
                <button className='w-full cursor-pointer bg-red-500 px-2 py-4 text-center uppercase text-white hover:bg-red-600'>
                  Đăng nhập
                </button>
              </div>
              <div className='mt-8 flex items-center justify-center gap-x-1'>
                <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
                <Link className='text-red-400' to={'/register'}>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
