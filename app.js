  import { checkLength, checkCardValidator, showValidation } from "./helper.js";
  const identityNum = document.getElementById('identity-num');
  const validText = document.getElementById('valid-text');
  const check = document.getElementById('submit');

  check.addEventListener('click',(e) => {
    e.preventDefault(); 
    const number = identityNum.value;
    if(!checkLength(number)){
      alert('Input must be 10 digits!');
    }else{
      checkCardValidator(number) ? showValidation('valid', validText) : showValidation('invalid', validText)
    }
  });