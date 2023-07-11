import { useState } from 'react'
import classes from './SignInScreen.module.scss'
import { Link, Navigate } from 'react-router-dom'
import { PATH } from 'utils'
import { useGetMe, useSignIn } from 'api'
import { Loading } from 'components'

export default function SignInScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { data: user, isLoading: userLoading, isFetched: userFetched } = useGetMe()
  const { mutate: signIn, isLoading: signInLoading, error: signInError } = useSignIn()

  if (userFetched && user?.email) {
    return <Navigate to={PATH.HOME} />
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleSubmitLogin = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    signIn({
      email,
      password,
    })
  }

  const errorText = signInError?.response?.statusText

  return (
    <div className={classes.ctn}>
      <Loading isLoading={userLoading} overlay />
      <form className={classes.signInModal} onSubmit={handleSubmitLogin}>
        <Link to={PATH.HOME} className={classes.imageCtn}>
          <img src='/icons/logo.png' alt='Logo' />
        </Link>
        <div className={classes.inputCtn}>
          <input
            type='email'
            required
            placeholder='Email'
            value={email}
            onChange={handleEmailChange}
          />
          <input
            type='password'
            placeholder='Password'
            required
            value={password}
            onChange={handlePasswordChange}
          />
          {errorText && <div className={classes.errorText}>{errorText}</div>}
        </div>
        <div className={classes.forgotPassword}>
          <a href='#'>Forgot Password?</a>
        </div>
        <div className={classes.signInBtn}>
          <button type='submit' className='button' disabled={signInLoading}>
            Sign In
          </button>
        </div>
      </form>
    </div>
  )
}
