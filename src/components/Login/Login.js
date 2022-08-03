import React, {useState} from 'react'
import StartPage from '../StartPage/StartPage'

function Login({onLogin}) {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  function handleEmailChange(e) {
    setEmail(e.target.value)
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    onLogin(email,password)
  }

  return (
    <StartPage
     authentication='Вход'
     onSubmit={handleSubmit}
     onChangeEmail={handleEmailChange}
     onChangePassword={handlePasswordChange}
     button="Войти"
    />
  )

}

export default Login
