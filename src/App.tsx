import { QueryClientProvider } from 'react-query'
import { queryClient } from './api'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PATH } from 'utils'
import { HomeScreen, RecommendationScreen, RecordScreen } from 'screens'
import { MainLayout } from 'components'
import SignInScreen from 'screens/SignInScreen/SignInScreen'

const router = createBrowserRouter([
  {
    path: PATH.HOME,
    element: <MainLayout />,
    children: [
      {
        path: PATH.HOME,
        element: <HomeScreen />,
      },
      {
        path: PATH.RECORD,
        element: <RecordScreen />,
      },
      {
        path: PATH.RECOMMENDATION,
        element: <RecommendationScreen />,
      },
    ],
  },
  {
    path: PATH.SIGN_IN,
    element: <SignInScreen />,
  },
])

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
