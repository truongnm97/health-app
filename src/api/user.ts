import { useInfiniteQuery, useQuery } from 'react-query'
import { axiosInstance } from './axios'
import { AxiosResponse } from 'axios'
import { API_PATH, generateURL } from '../utils'

export const useGetUserMeals = (
  mealType?: TUserMealType,
  pageSize = 8,
  options?: TQueryOptions,
) => {
  return useInfiniteQuery(
    [API_PATH.USER_MEALS, mealType, pageSize],
    ({ pageParam = 1 }) => {
      const url = generateURL(API_PATH.USER_MEALS, { page: pageParam, pageSize, mealType })

      return axiosInstance
        .get<TUserMealList, AxiosResponse<TUserMealList>>(url)
        .then((res) => res.data)
    },
    {
      ...(options as any),
      getNextPageParam: ({ page, pageSize, total }) =>
        page * pageSize < total ? (page ? page + 1 : 1) : undefined,
    },
  )
}

export const useGetUserMeal = (options?: TQueryOptions) => {
  const url = API_PATH.USER_MEAL
  return useQuery(
    url,
    () => axiosInstance.get<TUserMeal, AxiosResponse<TUserMeal>>(url).then((res) => res.data),
    options as any,
  )
}

export const useGetUserRecord = (options?: TQueryOptions) => {
  const url = API_PATH.USER_RECORD
  return useQuery(
    url,
    () => axiosInstance.get<TUserRecord, AxiosResponse<TUserRecord>>(url).then((res) => res.data),
    options as any,
  )
}

export const useGetUserDiaries = (pageSize = 8, options?: TQueryOptions) => {
  return useInfiniteQuery(
    API_PATH.USER_DIARIES,
    ({ pageParam = 1 }) => {
      const url = generateURL(API_PATH.USER_DIARIES, { page: pageParam, pageSize })

      return axiosInstance
        .get<TUserDiaries, AxiosResponse<TUserDiaries>>(url)
        .then((res) => res.data)
    },
    {
      ...(options as any),
      getNextPageParam: ({ page, pageSize, total }) =>
        page * pageSize < total ? (page ? page + 1 : 1) : undefined,
    },
  )
}

export const useGetUserExercises = (pageSize = 16, options?: TQueryOptions) => {
  const url = generateURL(API_PATH.USER_EXERCISES, { pageSize })
  return useQuery(
    url,
    () =>
      axiosInstance
        .get<TUserExerciseList, AxiosResponse<TUserExerciseList>>(url)
        .then((res) => res.data),
    options as any,
  )
}

export const useGetUserRecommendations = (pageSize = 8, options?: TQueryOptions) => {
  return useInfiniteQuery(
    API_PATH.USER_RECOMMENDATIONS,
    ({ pageParam = 1 }) => {
      const url = generateURL(API_PATH.USER_RECOMMENDATIONS, { page: pageParam, pageSize })

      return axiosInstance
        .get<TUserRecommendationList, AxiosResponse<TUserRecommendationList>>(url)
        .then((res) => res.data)
    },
    {
      ...(options as any),
      getNextPageParam: ({ page, pageSize, total }) =>
        page * pageSize < total ? (page ? page + 1 : 1) : undefined,
    },
  )
}
