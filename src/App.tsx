import React from 'react'
import { SignUpForm } from './components/index'

interface IFormProps {
  firstName?: string
  lastName?: string
  address?: string | undefined
  zipCode?: string
  city?: string
  phoneNumber?: string
  email?: string
  cardNumber?: string
}

function App() {
  const onSubmit = (data: IFormProps) => {
    console.log(data)
  }

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '149px',
      }}
    >
      <SignUpForm
        firstColor='#88B431'
        secondColor='#D9D9D9'
        headingTitle={['Enter Your Information', 'Enter Your Payment Details']}
        subCaption={[
          'Please fill out the following fields to create an account: *Email and password are case sensitive',
          '',
        ]}
        steps={2}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default App
