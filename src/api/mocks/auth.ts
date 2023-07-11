import { rest } from 'msw'

export default [
  rest.post<TSignInParams>('/login', (req, res, ctx) => {
    if (
      req.body.email === import.meta.env.VITE_EMAIL &&
      req.body.password === import.meta.env.VITE_PASSWORD
    ) {
      localStorage.setItem('is-authenticated', 'true')

      return res(ctx.status(200))
    }

    throw Error('Email or password is incorrect')
  }),
]
