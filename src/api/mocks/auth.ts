import { rest } from 'msw'
import { API_PATH, getStorage, removeStorage, saveStorage } from 'utils'

export default [
  rest.post<TSignInParams>(API_PATH.SIGN_IN, async (req, res, ctx) => {
    const body = await req.json<TSignInParams>()

    if (
      body.email === import.meta.env.VITE_USER_EMAIL &&
      body.password === import.meta.env.VITE_USER_PASSWORD
    ) {
      saveStorage('email', body.email)

      return res(ctx.status(200), ctx.json({ email: body.email }))
    }

    return res(ctx.status(401, 'Invalid email or password'))
  }),

  rest.post(API_PATH.SIGN_OUT, (_, res, ctx) => {
    removeStorage('email')

    return res(ctx.status(200))
  }),

  rest.get(API_PATH.GET_ME, (_, res, ctx) => {
    const email = getStorage('email')

    if (email) {
      return res(
        ctx.status(200),
        ctx.json({
          email,
        }),
      )
    }

    return res(ctx.status(401))
  }),
]
