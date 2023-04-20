import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'

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
      message: 'Độ dài pasdword từ 5 - 160 kí tự!!'
    },
    minLength: {
      value: 6,
      message: 'Độ dài password từ 5 - 160 kí tự!!'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Nhập lại password là bắt buộc!!'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài pasdword từ 5 - 160 kí tự!!'
    },
    minLength: {
      value: 6,
      message: 'Độ dài password từ 5 - 160 kí tự!!'
    },
    validate:
      typeof getValues === 'function'
        ? (value) => value === getValues('password') || 'Mật khẩu không khớp!!'
        : undefined
  }
})
