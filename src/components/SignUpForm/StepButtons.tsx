import React from 'react'
import ForwardIcon from '@mui/icons-material/Forward'
import { Badge, ButtonGroup, ButtonIconWrapper, Loader, StepButton, Text } from './styles'
import { BadgeIcon, LockIcon, SubmitLoading } from './Icons'

interface IStepButtons {
  buttonColor?: string
  setCurrentStep?: (step: number) => void
  currentStep: number
  steps?: number
  loading?: boolean
  back?: () => void
  paymentMethod?: string
}

export const StepButtons = ({ buttonColor, currentStep, loading, paymentMethod }: IStepButtons) => {
  const isDisabled = currentStep === 2 && paymentMethod && paymentMethod.toLowerCase() === 'cc'

  return (
    <ButtonGroup marginTop={currentStep === 2} className='sf-sign-up-form-buttons'>
      <StepButton
        type='submit'
        disabled={loading}
        isSubmitting={loading}
        form={currentStep === 1 ? 'stepOneForm' : 'stepTwoForm'}
        buttonColor={buttonColor}
        style={isDisabled ? { pointerEvents: 'none' } : {}}
      >
        <Badge>
          <BadgeIcon />
        </Badge>
        <Text>{currentStep === 1 ? 'Continue' : 'Make a payment'}</Text>
        <ButtonIconWrapper>{currentStep === 1 ? <ForwardIcon /> : <LockIcon />}</ButtonIconWrapper>
        {loading && (
          <Loader>
            <SubmitLoading />
          </Loader>
        )}
      </StepButton>
    </ButtonGroup>
  )
}
