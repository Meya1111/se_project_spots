import { initialCards, createCard } from './cards.js';
import { enableValidation, resetValidation, disableButton, settings } from './validation.js';
import Api from '../src/scripts/Api.js';

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "08c4fb0b-cb48-4031-b5a1-1ad178736ab8",
    "Content-Type": "application/json"
  },
});

// Destructure the second item in the callback of the .then() 

const cardsContainer = document.querySelector('.cards__list');

api
.getInitialCards()
.then((cards) => {
  cards.forEach((item) => {
    const cardEl = createCard(item);
    cardsContainer.append(cardEl);
  });
})
.catch((err) => {
console.error(err);
});

api.getUserInfo()
.then((data) => {
  profileNameEl.textContent = data.name;
  profileDescriptionEl.textContent = data.about;
  profileAvatarEl.src = data.avatar;
})
.catch((err) => {
console.error(err);
});

// TODO - FINISH AVATAR SUBMISSION HANDLER
function handleAvatarSubmit(evt) {
  // prevent behavior
  api
  .editAvatarInfo(avatarInput.value)
  .then((data) => {
  // TODO - make this work
  })
  .catch(console.error);
}

const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = document.forms["edit-profile-form"];
const editProfileNameInput = editProfileForm.elements["edit-profile-input"];
const editProfileDescriptionInput = editProfileModal.querySelector( "#edit-profile-description");
const profileAvatarEl = document.querySelector(".profile__avatar");
const avatarModalBtn = document.querySelector(".profile__avatar-btn")

const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostForm = newPostModal.querySelector(".modal__form");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");

const captionInputEl = document.querySelector("#card-description-input");
const linkInputEl = document.querySelector("#card-link-input");
const cardSubmitBtn = newPostModal.querySelector(".modal__button");
const cardTemplate = document.querySelector("#card-template");

const avatarModal = document.querySelector("#avatar-modal");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarSubmitBtn = avatarModal.querySelector(".modal__button");
const avatarModalCloseBtn = avatarModal.querySelector(".modal__close");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");

const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(".modal__close_type_preview");
const previewImageEl = previewModal.querySelector(".modal__image");
const caption = previewModal.querySelector(".modal__caption");

previewModalCloseBtn.addEventListener("click", () => {
closeModal(previewModal);
});

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");
function handleButtonClick() {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;

  resetValidation(editProfileForm, settings);

  openModal(editProfileModal);
}
editProfileBtn.addEventListener("click", handleButtonClick);

editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

newPostBtn.addEventListener("click", function () {
 resetValidation(newPostForm, settings);
 openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

function handledEditProfileSubmit(evt) {
  evt.preventDefault();
  api 
 .editUserInfo({ name: editProfileNameInput.value, about: editProfileDescriptionInput.value })
 .then((data) => {
 profileNameEl.textContent = data.name;
 profileDescriptionEl.textContent = data.about;
 editProfileModal.classList.remove("modal_is-opened");   
 })
 .catch(console.error);
  
  profileNameEl.textContent = editProfileNameInput.value;
  profileDescriptionEl.textContent = editProfileDescriptionInput.value;
  editProfileModal.classList.remove("modal_is-opened");
}

editProfileForm.addEventListener("submit", handledEditProfileSubmit);

 const cardsList = document.querySelector(".cards__list")

function getCardElement(data) {
  let cardElement = cardTemplate.content.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  
 const cardTitleEl = cardElement.querySelector(".card__title");
  cardTitleEl.textContent = data.name;

  const cardLikeBtnEl = cardElement.querySelector(".card__like-btn");

  cardLikeBtnEl.addEventListener("click", () => {
   cardLikeBtnEl.classList.toggle("card__like-btn_active"); 
  });

  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-button");
  cardDeleteBtnEl.addEventListener("click", () => {
  let cardElement = cardDeleteBtnEl.closest("li");
   cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    previewImageEl.src = data.link;
    previewImageEl.alt = data.name;

    caption.textContent = data.name;
  
    openModal(previewModal);
  });

  return cardElement;
}

avatarForm.addEventListener("submit", handleAvatarSubmit);

avatarModalBtn.addEventListener("click", () => {
openModal(avatarModal);
});

api.getInitialCards().then((cards) =>{
  cards.forEach((item) => {
    const cardEl = getCardElement(item);
    cardsList.append(cardEl);
   });
  });

function handleNewPostSubmit(evt) { 
  evt.preventDefault();
  
  const cardElement = getCardElement({
    name: captionInputEl.value,
    link: linkInputEl.value,
  });

  cardsList.prepend(cardElement);

  closeModal(newPostModal);
  newPostForm.reset();
  disableButton(cardSubmitBtn);
}

newPostForm.addEventListener("submit", handleNewPostSubmit);

initialCards.forEach(function (item){
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
});

enableValidation(settings);

document.querySelectorAll('.modal').forEach((modal) => {
modal.addEventListener('click', (evt) => {
  if (evt.target === modal) {
    closeModal(modal);
  }
 });
});

function handleEscape(evt) {
  if (evt.key === 'Escape') {
const openedModal = document.querySelector('.modal_is-opened');
  closeModal(openedModal);
  }
 }

 function openModal(modal) {
  modal.classList.add('modal_is-opened');
  document.addEventListener('keydown',handleEscape);
 }

 function closeModal(modal) {
  modal.classList.remove('modal_is-opened');
  document.removeEventListener('keydown', handleEscape);
 }

 export { getCardElement };