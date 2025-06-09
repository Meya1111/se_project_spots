const initialCards = [
  {
   name: "Val Tharens",
   link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
   name: "Restaurant terrace",
   link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg"
  },
    {
   name: "An outdoor cafe",
   link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
 name: "A very long bridge, over the forest and through the trees",
 link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
},
{
 name: "Tunnel with morning light",
 link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
},
{
 name: "Mountain house",
 link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg"
}
];

const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput =
  editProfileModal.querySelector("#edit-profile-input");
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#edit-profile-description"
);

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

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");
function handleButtonClick() {
  editProfileModal.classList.add("modal_is-opened");
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  openModal(editProfileModal);
}
editProfileBtn.addEventListener("click", handleButtonClick);

editProfileCloseBtn.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
});

newPostBtn.addEventListener("click", function () {
  newPostModal.classList.add("modal_is-opened");
});

newPostCloseBtn.addEventListener("click", function () {
  newPostModal.classList.remove("modal_is-opened");
});

function handledEditProfileSubmit(evt) {
  evt.preventDefault();
  
  const CardElement = getCardElement({
    name: captionInputEl.value,
    link: linkInputEl.value,
  });
  CardsList.append(CardElement);

  addCardModal.classList.remove("modal_is-opened");


  profileNameEl.textContent = editProfileNameInput.value;
  profileDescriptionEl.textContent = editProfileDescriptionInput.value;
  editProfileModal.classList.remove("modal_is-opened");
}

editProfileForm.addEventListener("submit", handledEditProfileSubmit);

const newPostTitleInput = document.querySelector("#card-description-input");
const newPostLinkInput = document.querySelector("#card-link-input");

const cardTemplate = document
 .querySelector("#card-template")
 .content.querySelector(".card");
 const CardsList = document.querySelector(".cards__list")

function getCardElement(data) {
  const CardElement = cardTemplate.cloneNode(true);
  const CardTitleEl = CardElement.querySelector(".card__title");
  const CardImageEl = CardElement.querySelector(".card__Image");

  cardImageEl_src = data.link;
  cardImageEl_alt = data.name;
  cardImageEl_textcontent = data.name;

  const cardlinkBtnEl = CardElement.querySelector(".card__like-btn");
  console.log("cardlinkBtnEl:", cardlinkBtnEl);
  cardlinkBtnEl.addEventListener("click", () => {
    console.log("clicked");
   cardlinkBtnEl.classList.toggle("card__like-btn_active"); 
  });

  const cardDeleteBtnEl = CardElement.querySelector(".card__delete-button");
  cardDeleteBtnEl.addEventListener("Click", () => {
   CardElement.remove();
   CardElement = null;
  });

  return CardElement
}

function handleNewPostSubmit(evt) { 
  evt.preventDefault();
  console.log("Post title:", newPostTitleInput.value);
  console.log("Post link:", newPostLinkInput.value);

  newPostModal.classList.remove("modal_is-opened");
}

newPostForm.addEventListener("submit", handleNewPostSubmit);

initialCards.forEach(function (item) {
  console.log(item.name);
  console.log(item.link);
});

initialCards.forEach(function (item){
  const CardElement = getCardElement(item);
  CardsList.append(CardElement);
});
