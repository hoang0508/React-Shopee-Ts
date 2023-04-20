import React from 'react'
import { Footer } from 'src/components/Footer'
import { RegisterHeader } from 'src/components/RegisterHeader'

interface IRegisterLayoutProps {
  children: React.ReactNode
}

const RegisterLayout = ({ children }: IRegisterLayoutProps) => {
  return (
    <div>
      <RegisterHeader />
      RegisterLayout
      {children}
      <Footer />
    </div>
  )
}

export default RegisterLayout
