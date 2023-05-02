import React from 'react'
import ForwardIcon from '@mui/icons-material/Forward'
import { IStepButtons } from './types'
import { BackButton, Badge, ButtonGroup, ButtonIconWrapper, Loader, StepButton, Text } from './styles'
import { BadgeIcon, LockIcon, SubmitLoading } from './Icons'

export const StepButtons = ({ currentStep, steps, loading, back }: IStepButtons) => {
  return (
    <ButtonGroup marginTop={currentStep === 2} className='sf-sign-up-form-buttons'>
      {currentStep === steps && <BackButton onClick={back}>Back</BackButton>}
      <StepButton
        type='submit'
        disabled={loading}
        isSubmitting={loading}
        form={currentStep === 1 ? 'stepOneForm' : 'stepTwoForm'}
      >
        <Badge>
          <BadgeIcon />
        </Badge>
        <Text>{currentStep === 1 ? (steps === 1 ? 'Register' : 'Continue') : 'Make a payment'}</Text>
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
