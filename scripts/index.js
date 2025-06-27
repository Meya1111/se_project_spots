import {initialCards} from './cards.js';

const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = document.forms["edit-profile-form"];
const editProfileNameInput = editProfileForm.elements["edit-profile-input"];
const editProfileDescriptionInput = editProfileModal.querySelector( "#edit-profile-description");

function openModal(modal){
 modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostForm = newPostModal.querySelector(".modal__form");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");

const captionInputEl = document.querySelector("#card-description-input");
const linkInputEl = document.querySelector("#card-link-input");
const cardSubmitBtn = newPostModal.querySelector(".modal__button");
const cardTemplate = document.querySelector("#card-template");

const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(".modal__close_type_preview");
const previewImageEl = previewModal.querySelector(".modal__image");

previewModalCloseBtn.addEventListener("click", () => {
closeModal(previewModal);
});

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");
function handleButtonClick() {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  openModal(editProfileModal);
}
editProfileBtn.addEventListener("click", handleButtonClick);

editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

newPostBtn.addEventListener("click", function () {
 openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

function handledEditProfileSubmit(evt) {
  evt.preventDefault();
  
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

    const caption = document.querySelector(".modal__caption");
    caption.textContent = data.name;
  
    openModal(previewModal);
  });

  return cardElement;
}

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

import { enableValidation } from './validation.js';
const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error"
};

enableValidation(settings);

