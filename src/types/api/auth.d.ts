type TSignInParams = {
  email: string
  password: string
}

type TSignInResponse = {
  email: string
}

type TSignUpParams = {
  email: string
  password: string
}

type TSignUpResponse = {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
  createdAt: string
  updatedAt: string
}

type TUser = {
  email: string
}
