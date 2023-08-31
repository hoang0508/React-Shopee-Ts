import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { FormMethod, Link, useNavigate } from 'react-router-dom'
import { Input } from 'src/components/Input'
import { Schema, schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { registerAccount } from 'src/apis/auth.api'
import { omit } from 'lodash'
import { isAxiosUnprocessableEntity } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import { AppContext } from 'src/contexts/app.context'

type FormData = Schema

const Register = () => {
  const { setIsAuthenticated } = useContext(AppContext)
  const navigate = useNavigate()
  // react hook form
  const {
    handleSubmit,
    setError,
    formState: { errors },
    register
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  // rules
  // const rules = getRules(getValues)
  const registerMutation = useMutation({
    mutationFn: (data: Omit<FormData, 'confirm_password'>) => registerAccount(data)
  })

  // handle submit register
  const handleSubmitRegister = (values: FormData) => {
    const data = omit(values, ['confirm_password'])
    registerMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        navigate('/')
      },
      onError: (error) => {
        console.log('error', error)
        if (isAxiosUnprocessableEntity<ErrorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data?.data
          console.log('🚀 ~ file: Register.tsx:43 ~ handleSubmitRegister ~ formError:', formError)
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                type: 'server'
              })
            })
          }
        }
      }
    })
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
                // rules={rules.email}
                className='mt-8'
                type='email'
                placeholder='Email'
                errorMessage={errors.email?.message}
              />
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
              <Input
                autoComplete='on'
                name='confirm_password'
                register={register}
                // rules={rules.confirm_password}
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
