import React from 'react'
import ForwardIcon from '@mui/icons-material/Forward'
import { IStepButtons } from './types'
import { BackButton, Badge, ButtonGroup, ButtonIconWrapper, Loader, StepButton, Text } from './styles'
import { BadgeIcon, LockIcon, SubmitLoading } from './Icons'

export const StepButtons = ({ setCurrentStep, currentStep, steps, isSubmiting }: IStepButtons) => {
  const handdleBack = () => {
    if (setCurrentStep) setCurrentStep(currentStep - 1)
  }

  return (
    <ButtonGroup marginTop={currentStep === 2} className='sf-sign-up-form-buttons'>
      {currentStep === 2 && <BackButton onClick={handdleBack}>Back</BackButton>}
      <StepButton
        type='submit'
        disabled={isSubmiting}
        isSubmiting={isSubmiting}
        form={currentStep === 1 ? 'stepOneForm' : 'stepTwoForm'}
      >
        <Badge>
          <BadgeIcon />
        </Badge>
        <Text>{currentStep === 1 ? (steps === 1 ? 'Register' : 'Continue') : 'Make a payment'}</Text>
        <ButtonIconWrapper>{currentStep === 1 ? <ForwardIcon /> : <LockIcon />}</ButtonIconWrapper>
        {isSubmiting && (
          <Loader>
            <SubmitLoading />
          </Loader>
        )}
      </StepButton>
    </ButtonGroup>
  )
}
