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

function toggleButtonState(inputList, buttonElement) {
    const isFormValid = inputList.every((input) => input.validity.valid)
    if (isFormValid) { 
 buttonElement.removeAttribute("disabled");
    } else {
      buttonElement.setAttribute("disabled", true);  
    } 
}

const setEventListeners = (formEl) => {
    const inputList = Array.from(formEl.querySelectorAll('.modal__input'));
    const buttonElement = formEl.querySelector('.modal__submit-btn');

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
    checkInputValidity(formEl, inputElement);
    });
    });
};

const enableValidation = () => {
    const formList = document.querySelectorAll('.modal__form');
    formList.forEach((formEl) => {
    setEventListeners(formEl);
    });
};

enableValidation();