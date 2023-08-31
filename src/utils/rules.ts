import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }
export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: 'Email là bắt buộc!!'
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Email không đúng định dạng!!'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Password là bắt buộc!!'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài pasdword từ 6 - 160 kí tự!!'
    },
    minLength: {
      value: 6,
      message: 'Độ dài password từ 6 - 160 kí tự!!'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Nhập lại password là bắt buộc!!'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài pasdword từ 6 - 160 kí tự!!'
    },
    minLength: {
      value: 6,
      message: 'Độ dài password từ 6 - 160 kí tự!!'
    },
    validate:
      typeof getValues === 'function'
        ? (value) => value === getValues('password') || 'Mật khẩu không khớp!!'
        : undefined
  }
})

export const schema = yup.object({
  email: yup
    .string()
    .required('Nhập email là bắt buộc!!')
    .max(160, 'Độ dài pasdword từ 5 - 160 kí tự!')
    .min(5, 'Độ dài pasdword từ 5 - 160 kí tự!'),
  password: yup
    .string()
    .required('Password là bắt buộc!!')
    .max(160, 'Độ dài pasdword từ 6 - 160 kí tự!!')
    .min(6, 'Độ dài password từ 6 - 160 kí tự!!'),
  confirm_password: yup
    .string()
    .required('Nhập lại password là bắt buộc!!')
    .max(160, 'Độ dài pasdword từ 6 - 160 kí tự!!')
    .min(6, 'Độ dài password từ 6 - 160 kí tự!')
    .oneOf([yup.ref('password')], 'Nhập lại password không khớp')
})

const loginSchema = schema.omit(['confirm_password'])
type LoginSchema = yup.InferType<typeof loginSchema>

export type Schema = yup.InferType<typeof schema>
