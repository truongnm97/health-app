import { AxiosError, AxiosResponse } from 'axios'
import { useMutation, useQuery } from 'react-query'
import { axiosInstance } from './axios'
import { API_PATH } from '../utils'
import queryClient from './query-client'

export const useGetMe = () => {
  return useQuery<TUser, AxiosError, TUser, string>(API_PATH.GET_ME, () =>
    axiosInstance.get<TUser, AxiosResponse<TUser>>(API_PATH.GET_ME).then((res) => res.data),
  )
}

export const useSignIn = (options?: TMutationOptions) => {
  return useMutation(
    (payload: TSignInParams) =>
      axiosInstance.post<TSignInResponse, AxiosResponse<TSignInResponse>, TSignInParams>(
        API_PATH.SIGN_IN,
        payload,
      ),
    {
      ...options,
      onSuccess: () => {
        queryClient.removeQueries(API_PATH.GET_ME)
        queryClient.invalidateQueries(API_PATH.GET_ME)
      },
    },
  )
}

export const useSignOut = (options?: TMutationOptions) => {
  return useMutation(() => axiosInstance.post(API_PATH.SIGN_OUT), {
    ...options,
    onSuccess: () => {
      queryClient.removeQueries(API_PATH.GET_ME)
      queryClient.invalidateQueries(API_PATH.GET_ME)
    },
  })
}
