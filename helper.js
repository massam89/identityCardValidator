//Input must be 16 characters
export const checkLength = (number) => (number.length !== 10 ? false : true);

export const checkCardValidator = (number) => {
  let sum = 0;
  let x;
  const y = +number[9];
  let pointer = 10;

  for (let i = 0; i < number.length - 1; i++) {
    sum += number[i] * pointer;
    pointer--;
  }

  x = sum % 11;

  if ((x === 0 && y === 0) || (x === 1 && y === 1) || (x > 1 && y === 11 - x)) {
    return true
  } else {
    return false;
  }
};

export const showValidation = (status, element) => {
    element.style.visibility = 'visible';
    if(status === 'valid'){
        element.style.backgroundColor = 'green';
        element.textContent = 'Valid';
    }
    if(status === 'invalid'){
        element.style.backgroundColor = 'red';
        element.textContent = 'Invalid';    
    }
}
