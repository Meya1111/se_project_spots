import "./index.css";
import {
  enableValidation,
  resetValidation,
  disableButton,
  settings,
} from "../scripts/validation.js";
import closeIconLight from "../images/Closeicon.svg";
import pencilIcon from "../images/pencil.svg";
import plusIcon from "../images/plus.svg";
import Api from "../scripts/Api.js";
import spotLogo from '../images/logo.svg';
import avatarImg from '../images/avatar.jpg';    
   

const btn = document.querySelector('.profile__avatar-btn');
if (btn && !btn.querySelector('.profile__pencil-icon')) {
  btn.insertAdjacentHTML('beforeend', '<img class="profile__pencil-icon" alt="">');
}
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "08c4fb0b-cb48-4031-b5a1-1ad178736ab8",
    "Content-Type": "application/json",
  },
});

const cardsContainer = document.querySelector(".cards__list");

const linkInput = document.querySelector("#card-link-input");
const descInput = document.querySelector("#card-description-input");

const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = document.forms["edit-profile-form"];
const editProfileNameInput = editProfileForm.elements["edit-profile-input"];
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#edit-profile-description"
);
const profileAvatarEl = document.querySelector(".profile__avatar");
const avatarOpenBtn = document.querySelector(".profile__avatar-btn");
const headerLogo = document.querySelector('.header__logo');
headerLogo.src = spotLogo;

const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostForm = newPostModal.querySelector(".modal__form");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");

const captionInputEl = document.querySelector("#card-description-input");
const linkInputEl = document.querySelector("#card-link-input");
const cardSubmitBtn = newPostModal.querySelector(".modal__submit-btn");
const cardList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template");

const pencilImg = document.createElement("img");
pencilImg.src = pencilIcon;
pencilImg.alt = "Edit Profile";
pencilImg.classList.add("btn-icon");
editProfileBtn.prepend(pencilImg);

const plusImg = document.createElement("img");
plusImg.src = plusIcon;
plusImg.alt = "New Post";
plusImg.classList.add("btn-icon");
newPostBtn.prepend(plusImg);

let selectedCard, selectedCardId;

const avatarModal = document.querySelector("#avatar-modal");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarSubmitBtn = avatarModal.querySelector(".modal__submit-btn");
const avatarModalCloseBtn = avatarModal.querySelector(".modal__close-btn");
const avatarInput = avatarModal.querySelector("#edit-avatar-input");

function urlLooksOK(v) {
  try { new URL(v); return true; } catch { return false; }
}

function setAvatarSaveState() {
  if (!avatarSubmitBtn || !avatarInput) return;
  avatarSubmitBtn.disabled = !urlLooksOK(avatarInput.value.trim());
}

const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector(".modal__delete-form");
const deleteConfirm = deleteForm.querySelector(
  ".modal__submit-btn__type_delete"
);
const deleteCancelBtn = deleteForm.querySelector(
  ".modal__submit-btn__type_cancel"
);
const deleteCloseBtn = deleteModal.querySelector(".modal__close_type_preview");

const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(
  ".modal__close_type_preview"
);
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

const setLoadingState = (element, message) => {
  element.textContent = message;
  element.disabled = true;
};

const disableLoadingState = (element, message) => {
  element.textContent = message;
  element.disabled = false;
};

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

function setButtonLoading(
  btn,
  isLoading,
  defaultText = "Save",
  loadingText = "Saving..."
) {
  btn.textContent = isLoading ? loadingText : defaultText;
  btn.disabled = isLoading;
}

function createCard(cardData) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  const cardLikeBtnEl = cardElement.querySelector(".card__like-btn");
  if (cardData.isLiked) {
    cardLikeBtnEl.classList.add("card__like-btn_active");
  }

  cardLikeBtnEl.addEventListener("click", (evt) => {
    const isLiked = cardLikeBtnEl.classList.contains("card__like-btn_active");

    api
      .changeLikeStatus(cardData._id, isLiked)
      .then((updatedCard) => {
        cardLikeBtnEl.classList.toggle("card__like-btn_active", updatedCard.isLiked);
      })
      .catch(console.error);
  });

  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-button");
  cardDeleteBtnEl.addEventListener("click", () => {
    handleDeleteCard(cardElement, cardData._id);
  });

  cardImage.addEventListener("click", () => {
    previewImageEl.src = cardData.link;
    previewImageEl.alt = cardData.name;
    caption.textContent = cardData.name;
    
    openModal(previewModal);
    });
  return cardElement;
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  setButtonLoading(deleteConfirm, true, "Delete", "Deleting...");
  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() =>
      setButtonLoading(deleteConfirm, false, "Delete", "Deleting...")
    );
}

function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(deleteModal);
}

deleteForm.addEventListener("submit", handleDeleteSubmit);

deleteCancelBtn.addEventListener("click", () => closeModal(deleteModal));

deleteCloseBtn.addEventListener("click", () => closeModal(deleteModal));

api.getAppInfo()
  .then(([cards, user]) => {
    cards.forEach((card) => {
      const cardElement = createCard(card);
      cardsContainer.append(cardElement);
    });

    profileNameEl.textContent = user.name;
    profileDescriptionEl.textContent = user.about;
    profileAvatarEl.src = user.avatar;
  })
  .catch((err) => {
    console.error("Error loading app info:", err);
  });

  function handleEditProfileSubmit(evt) {
    evt.preventDefault();
    const btn = evt.submitter;
    setButtonLoading(btn, true);
  
    api
      .editUserInfo({
        name: editProfileNameInput.value,
        about: editProfileDescriptionInput.value,
      })
      .then((data) => {
        profileNameEl.textContent = data.name;
        profileDescriptionEl.textContent = data.about;
        closeModal(editProfileModal);         
      })
      .catch((err) => {
        console.error("editUserInfo failed:", err);  
     
      })
      .finally(() => setButtonLoading(btn, false));
  }

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

function handleLike(evt, id) {
  const btn = evt.currentTarget;
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();

  const btn = evt.submitter || avatarForm.querySelector(".modal__submit-btn");
  setButtonLoading(btn, true, "Save", "Saving...");

  if (!avatarInput || !profileAvatarEl) { setButtonLoading(btn, false); return; }

  const url = avatarInput.value.trim();
  if (!urlLooksOK(url)) { setButtonLoading(btn, false); return; }

  api.updateAvatar(url)
    .then((data) => {
      profileAvatarEl.src = data.avatar;
      avatarForm.reset();
      setAvatarSaveState(false);
      closeModal(avatarModal);
    })
    .catch((err) => {
      console.error("updateAvatar failed:", err);
    })
    .finally(() => setButtonLoading(btn, false, "Save", "Saving..."));
}

const cardsList = document.querySelector(".cards__list");

avatarForm.addEventListener("submit", handleAvatarSubmit);

avatarOpenBtn.addEventListener("click", () => {
  openModal(avatarModal);
});

function handleNewPostSubmit(evt) {
  evt.preventDefault();
  const postSubmitBtn = newPostForm.querySelector(".modal__submit-btn");
  setButtonLoading(postSubmitBtn, true, "Save", "Saving...")

  const name = captionInputEl.value;
  const link = linkInputEl.value;

  api
    .addCard({ name, link })
    .then((newCard) => {
      const cardEl = createCard(newCard);
      cardsList.prepend(cardEl);

      newPostForm.reset();
      closeModal(newPostModal);
      disableButton(cardSubmitBtn, settings);
    })
    .catch((err) => {
      console.log("Error creating card:", err);
    })
.finally(() => {
  setButtonLoading(postSubmitBtn,false, "Save", "Saving...");
});
}
newPostForm.addEventListener("submit", handleNewPostSubmit);

enableValidation(settings);

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target === modal) {
      closeModal(modal);
    }
  });
});

if (avatarForm) {
  avatarForm.addEventListener("submit", handleAvatarSubmit);
}

if (avatarOpenBtn && avatarModal) {
  avatarOpenBtn.addEventListener("click", () => openModal(avatarModal));
}

if (avatarModalCloseBtn) {
  avatarModalCloseBtn.addEventListener("click", () => closeModal(avatarModal));
}

if (avatarInput) {
  setAvatarSaveState(); 
  avatarInput.addEventListener("input", setAvatarSaveState);
}

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_is-opened");
    closeModal(openedModal);
  }
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscape);
}


