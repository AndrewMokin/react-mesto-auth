import unionOk from "../../images/union_ok.svg"
import unionFault from "../../images/union_fault.svg"

function InfoTooltip({ isOpen, onClose, check}) {
  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
        <div className="popup__overlay"></div>
        <div className="popup__content-profile">
          <img className="popup__tooltip-image" src={check ? unionOk : unionFault} alt="иконка авторизации"></img>
          <button
            type="button"
            onClick={onClose}
            className="popup__close"
          ></button>

          <h2 className="popup__tooltip-title">{check ? 'Вы успешно зарегистрировались!' : "Что-то пошло не так! Попробуйте еще раз"}</h2>
          </div>
      </div>
  )
}

export default InfoTooltip
