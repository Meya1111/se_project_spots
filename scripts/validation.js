export const settings = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__submit-btn",
    inactiveButtonClass: "modal__submit-btn_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error"
  }

const showInputError = (formEl, inputEl, errorMsg, config) => {
    const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
    errorMsgEl.textContent = errorMsg;
    inputEl.classList.add(config.inputErrorClass);
};

const hideInputError = (formEl, inputEl, config) => {
    const errorMsgEl = formEl.querySelector (`#${inputEl.id}-error`);
    errorMsgEl.textContent = "";
    inputEl.classList.remove(config.inputErrorClass);
};

const checkInputValidity = (formEl, inputEl, config) => {
    if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage, config);
    } else {
      hideInputError(formEl,inputEl, config);  
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((input) => {
    return !input.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonEl, config) => {
if (hasInvalidInput(inputList)) {
    disableButton(buttonEl, config);
   } else { 
    buttonEl.disabled = false;
    buttonEl.classList.remove(config.inactiveButtonClass);
   }
};

const disableButton = (buttonEL, config) => {
buttonEl.disabled = true;
buttonEl.classList.add(config.inactiveButtonClass);
};
 
const setEventListeners = (formEl, config) => {
    const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
    const buttonElement = formEl.querySelector(config.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, config);

    inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
    checkInputValidity(formEl, inputElement, config);
    toggleButtonState(inputList, buttonElement, config);
    });
    });
};

const enableValidation = (config) => {
    const formList = document.querySelectorAll(config.formSelector);
    formList.forEach((formEl) => {
    setEventListeners(formEl, config);
    });
};

const resetValidation = (formEl, config) => {
    const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));

    inputList.forEach((inputEL) => {
    const errorEL = formEl.querySelector(`#${inputEL.id}-error`);
    errorEL.textContent ="",
    inputEL.classList.remove(config.inputErrorClass);
    errorEL.classList.remove(config.errorClass);
    });

    const buttonEL = formEl.querySelector(config.submitButtonSelector);
    toggleButtonState(inputList, buttonEL, config);
};

export { enableValidation, resetValidation, disableButton };


