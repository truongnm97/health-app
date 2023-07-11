type TMutationOptions<P = any, R = any> = Omit<
  import('react-query').UseMutationOptions<R, TApiError, P>,
  'mutationKey' | 'mutationFn'
>

type TQueryOptions<R = any> = Omit<
  import('react-query').UseQueryOptions<R, TApiError>,
  'queryKey' | 'queryFn'
>

type TApiError = import('axios').AxiosError<{
  message: string | string[]
  error: string
  statusCode: number
}>
