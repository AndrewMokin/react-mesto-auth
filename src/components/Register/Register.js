import React, {useState} from 'react'
import StartPage from '../StartPage/StartPage'

function Register({onLogin}) {
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
     authentication='Регистрация'
     onSubmit={handleSubmit}
     onChangeEmail={handleEmailChange}
     onChangePassword={handlePasswordChange}
     button="Зарегистрироваться"
     >
       <div className="register">
       <h2 className="register__little-title">Уже зарегистрированы?</h2>
       <button className="register__little-button">Войти</button>
       </div>
    </StartPage>
  )

}

export default Register
