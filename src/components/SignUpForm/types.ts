export interface IstepOneProps {
  headingTitle?: string
  subCaption?: string
  steps?: number
  setCurrentStep?: (step: number) => void
  currentStep: number
  setData?: (data: IFormProps) => void
  data?: IFormProps
  onSubmit?: (data: IFormProps) => void
  validedFields: IvalidedFields
  setValidedFields: (data: IvalidedFields) => void
  setSubmiting?: (isSubmiting: boolean) => void
}

export interface IStepButtons {
  setCurrentStep?: (step: number) => void
  currentStep: number
  steps?: number
  isSubmiting?: boolean
}

export interface IstepButtonsSytleProps {
  isSubmiting?: boolean
}

export interface IvalidedFields {
  firstName: boolean
  lastName: boolean
  address: boolean
  zipCode: boolean
  city: boolean
  phoneNumber: boolean
  email: boolean
  cardNumber: boolean
}

export interface IStep {
  active?: boolean
  stepNum?: number
  firstColor?: string
  secondColor?: string
  sucess?: boolean
}

export interface IFieldsStyleProps {
  coverBack?: boolean | undefined
}

export interface IinputWrapperStyleProps {
  borderRemove: string | undefined
  isDirty: boolean | undefined
  isValid: boolean | undefined
}

export interface IinputStyleProps {
  borderRight?: boolean
  fullWidth?: boolean
}

export interface IpreIconStyleProps {
  isValid: boolean | undefined
}

export interface ErrorTextStyleProps {
  isError?: boolean | undefined
  fullWidth?: boolean
}

export interface IFormProps {
  firstName?: string
  lastName?: string
  address?: string | undefined
  zipCode?: string
  city?: string
  phoneNumber?: string
  email?: string
  cardNumber?: string
}

export interface IButtonGroupProps {
  marginTop?: boolean
}
