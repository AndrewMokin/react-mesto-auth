import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import StartPage from '../StartPage/StartPage'

function Register({onRegister}) {
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
    onRegister(email,password)
  }

  return (
    <StartPage
     authentication='Регистрация'
     onSubmit={handleSubmit}
     onChangeEmail={handleEmailChange}
     onChangePassword={handlePasswordChange}
     button="Зарегистрироваться"
     >
       <div className="register">
       <h2 className="register__little-title">Уже зарегистрированы?</h2>
       <Link to="sign-in" className="register__little-button">Войти</Link>
       </div>
    </StartPage>
  )

}

export default Register
