const settings = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__submit-btn",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error"
  }

const showInputError = (formEl, inputEl, errorMsg) => {
    const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
    errorMsgEl.textContent = errorMsg;
    inputEl.classList.add("modal__input_type_error");
};

const hideInputError = (formEl, inputEl) => {
    const errorMsgEl = formEl.querySelector (`#${inputEl.id}-error`);
    errorMsgEl.textContent = "";
    inputEl.classList.remove("modal__input_type_error");
};

const checkInputValidity = (formEl, inputEl) => {
    if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage);
    } else {
      hideInputError(formEl,inputEl);  
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((input) => {
    return !input.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonEl, config) => {
if (hasInvalidInput(inputList)) {
    buttonEl.disabled = true;
    buttonEl.classList.remove(config.inactiveButtonClass);
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

export { enableValidation };


