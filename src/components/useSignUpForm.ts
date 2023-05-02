import { useState } from 'react'

const useSignUpForm = (forms: string[]) => {
  const [currentStep, setCurrentStepIndex] = useState(1)
  const [loading, setLoading] = useState(false)

  function next() {
    setCurrentStepIndex((i) => {
      if (i >= forms.length) return i
      return i + 1
    })
  }

  function back() {
    setCurrentStepIndex((i) => {
      if (i <= 0) return i
      return i - 1
    })
  }

  function goTo(index: number) {
    setCurrentStepIndex(index)
  }

  return {
    currentStep,
    steps: forms.length,
    isFirstStep: currentStep === 1,
    isLastStep: currentStep === forms.length,
    loading,
    setLoading,
    goTo,
    next,
    back,
  }
}

export default useSignUpForm
