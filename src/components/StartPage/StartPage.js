function StartPage({ onSubmit, authentication, onChangeEmail, onChangePassword, button, children }) {
 return (
  <form className="start-page" onSubmit={onSubmit}>
    <h2 className="start-page__title">{authentication}</h2>
    <input
      className="start-page__input"
      placeholder="email"
      onChange={onChangeEmail}
      required
      type='email'
    />
    <input
      className="start-page__input"
      placeholder="Password"
      onChange={onChangePassword}
      required
      type='password'
    />
    <button className="start-page__button">{button}</button>
    {children}
  </form>
 )
 }

 export default StartPage
