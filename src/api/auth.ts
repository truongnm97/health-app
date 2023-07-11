import { AxiosResponse } from 'axios'
import { useMutation, useQuery } from 'react-query'
import { axiosInstance } from './axios'
import { removeStorage, saveStorage } from '../utils'
import queryClient from './query-client'
import { toast } from 'react-toastify'

export const useGetMe = () => {
  return useQuery('/users/me', () => {
    return axiosInstance.get<TUser, AxiosResponse<TUser>>('/users/me')
  })
}

export const useSignIn = (options?: TMutationOptions) => {
  return useMutation(
    async (payload: TSignInParams) =>
      axiosInstance.post<TSignInResponse, AxiosResponse<TSignInResponse>, TSignInParams>(
        '/auth/signIn',
        payload,
      ),
    {
      onSuccess: (res) => {
        saveStorage('access_token', res.data.access_token)
        queryClient.invalidateQueries('/users/me')
        toast('Login Successfully!!!')
      },
      ...options,
    },
  )
}

export const useSignUp = (options?: TMutationOptions) => {
  return useMutation(
    (payload: TSignUpParams) =>
      axiosInstance.post<TSignUpResponse, AxiosResponse<TSignUpResponse>, TSignUpParams>(
        '/auth/signUp',
        payload,
      ),
    options,
  )
}

export const useSignOut = (options?: TMutationOptions) => {
  return useMutation(async () => axiosInstance.post<{ message: string }>('/auth/signOut'), {
    onSuccess: () => {
      removeStorage('access_token')
      queryClient.invalidateQueries('/users/me')
    },
    ...options,
  })
}
