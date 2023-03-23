import React, { useCallback } from 'react'
import { SignUpForm } from './components/index'

import toast from 'react-hot-toast'

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
  const onSubmit = useCallback(async (data: IFormProps, e?: { preventDefault: () => void }) => {
    e && e.preventDefault()
    try {
      // setIsLoading(true);
      const response = await fetch('https://dummyjson.com/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
      })
      const res = await response.json()
      console.log('res: ', res)
      toast.success('Your account has been registered successfully')
      // router.push('/receipt')
    } catch (error) {
      console.log('error', error)
      toast.error('Something went wrong in registering')
    }
  }, [])

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
        paymentMethod={''}
      />
    </div>
  )
}

export default App
