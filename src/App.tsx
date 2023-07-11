import React, { useCallback } from 'react'
import { SignUpForm, useSignUpForm } from './components/index'

import toast from 'react-hot-toast'
import axios from 'axios'

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
  const { steps, currentStep, isFirstStep, isLastStep, loading, setLoading, back, next } = useSignUpForm([
    'informationForm',
    'paymantForm',
  ])

  const onSubmit = useCallback(async (data: IFormProps, e?: { preventDefault: () => void }) => {
    setLoading(true)

    if (isFirstStep) {
      e && e.preventDefault()
      try {
        const response = await axios.post('https://fakestoreapi.com/products', data)
        setLoading(false)
        next()
        console.log('1st response', response?.data)
      } catch (error) {
        console.error(error)
        toast.error('Something went wrong. Please try again later.')
      }
    } else if (isLastStep) {
      e && e.preventDefault()
      try {
        const response = await fetch('https://dummyjson.com/users/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data }),
        })
        const res = await response.json()
        console.log('2nd response: ', res)
        if (response.ok) {
          toast.success('Your account has been registered successfully')
          // router.push('/receipt');
        } else {
          throw new Error('Something went wrong. Please try again later.')
        }
      } catch (error) {
        console.error(error)
        toast.error('Something went wrong. Please try again later.')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        firstColor='#4A55A2'
        secondColor='#D9D9D9'
        buttonColor='#7895CB'
        headingTitle={['Enter Your Information']}
        subCaption={[
          'Please fill out the following fields to create an account: *Email and password are case sensitive',
        ]}
        steps={steps}
        currentStep={currentStep}
        loading={loading}
        back={back}
        onSubmit={onSubmit}
        paymentMethod={'dd'}
        message={''}
      />
    </div>
  )
}

export default App
