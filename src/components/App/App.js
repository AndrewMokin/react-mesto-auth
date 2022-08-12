import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import "../../index.css";
import Header from "../Header/Header";
import ImagePopup from "../ImagePopup/ImagePopup";
import Api from "../../utils/Api";
import EditProfilePopup from "../EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "../EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "../AddPlacePopup/AddPlacePopup";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Login from "../Login/Login";
import Register from "../Register/Register";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import MainFooter from "../MainFooter/MainFooter";
import { register, authorization, validationToken } from "../../utils/Auth";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const api = new Api({
  address: "https://mesto.nomoreparties.co/v1/cohort-38",
  token: "5915b378-e30a-47e1-90fe-a5a0aac62f5e",
});

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isInfoTooltipSucces,setIsInfoTooltipSucces] = useState(false)
  const [userEmailInHeader,setUserEmailInHeader] = useState('')
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setLoggedIn] = useState(false);
  const history=useHistory()

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function getCards() {
    api
      .getCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(item) {
    api
      .addCard(item)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getUserInfo() {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(item) {
    api
      .setUserInfo(item)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(item) {
    api
      .changeAvatar(item)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (isLoggedIn) {
      getCards();
      getUserInfo();
    }
  },[isLoggedIn]);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  const handleClickAvatar = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setIsInfoTooltipPopupOpen(false)
    setSelectedCard(null);
  }

  useEffect(() => {
    if (
      isEditProfilePopupOpen ||
      isEditAvatarPopupOpen ||
      isAddPlacePopupOpen ||
      isInfoTooltipPopupOpen ||
      selectedCard
    ) {
      function handleEsc(e) {
        if (e.key === "Escape") {
          closeAllPopups();
        }
      }
      document.addEventListener("keydown", handleEsc);
      return () => {
        document.removeEventListener("keydown", handleEsc);
      };
    }
  }, [
    isEditAvatarPopupOpen,
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    isInfoTooltipPopupOpen,
    selectedCard,
  ]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card)
      .then(() => {
        setCards((items) => items.filter((c) => c._id !== card._id && c));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function onLogin (password, email) {
    authorization (password, email)
      .then((res) => {
        if(res) {
          setLoggedIn(true);
          setUserEmailInHeader(email);
          history.push('/');
          localStorage.setItem('jwt', res.token);
        }
      })
      .catch(() => {
        setIsInfoTooltipSucces(false)
        setIsInfoTooltipPopupOpen(true)
      });
  }

  function onRegister(email, password) {
    register(password, email)
      .then((res) => {
        setIsInfoTooltipPopupOpen(true)
        if(res) {
          setIsInfoTooltipSucces(true)
          history.push('/sign-in');
        }
      })
      .catch(() => {
        setIsInfoTooltipSucces(false)
        setIsInfoTooltipPopupOpen(true)
      });
  }

  function tokenCheck() {
    const token = localStorage.getItem('jwt');
    if(token) {
      validationToken(token)
      .then((res) => {
        if(res) {
          setUserEmailInHeader(res.data.email)
        };
        setLoggedIn(true);
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  useEffect(() => {
    tokenCheck();
  },[]);

  function onLogoutProfile() {
    localStorage.removeItem('jwt');
    history.push('/sign-in');
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div>
        <div className="page">
          <Header
            userEmailInHeader={userEmailInHeader}
            onLogoutProfile={onLogoutProfile}
          />
          <Switch>
            <ProtectedRoute
              cards={cards}
              onCardClick={handleCardClick}
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleClickAvatar}
              onAddPlace={handleAddPlaceClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              component={MainFooter}
              isLoggedIn={isLoggedIn}
              exact path="/"
            />
            <Route path="/sign-in" >
              <Login
                onLogin={onLogin}
              />
            </Route>
            <Route path="/sign-up">
              <Register
                onRegister={onRegister}
              />
            </Route>
            <Route>
              {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
        </div>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          check={isInfoTooltipSucces}
          onClose={closeAllPopups}
          checkOk="Вы успешно зарегистрировались!"
          checkFailed="Что-то пошло не так! Попробуйте еще раз"
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
