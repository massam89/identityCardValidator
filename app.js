  const identityNum = document.getElementById('identity-num');
  const validText = document.getElementById('valid-text');
  const check = document.getElementById('submit');

  check.addEventListener('click',checkValidation);

  function checkValidation(e){
    e.preventDefault(); 
    const number = identityNum.value;

    if(!checkLength(number)){
      alert('Input must be 10 digits!');
    }else{
      let sum = 0;
      let x;
      const y = number[9];
      let pointer = 10;
      
      for(let i = 0 ; i < number.length - 1 ; i++){
        sum += number[i] * pointer;
        pointer--;
      }
      x = sum % 11;
      
     if (x == 0 && y == 0){
       validText.style.backgroundColor = 'green';
       validText.textContent = 'Valid';
       validText.style.visibility = 'visible';
     }else if(x == 1 && y == 1){
      validText.style.backgroundColor = 'green';
       validText.textContent = 'Valid';
       avalidText.style.visibility = 'visible';
     }else if (x > 1 && y == 11 - x){
      validText.style.backgroundColor = 'green';
      validText.textContent = 'Valid';
      validText.style.visibility = 'visible';
     }else{
      validText.style.backgroundColor = 'red';
      validText.textContent = 'Invalid';
      validText.style.visibility = 'visible';
     }
    }
  }

    //Input must be 16 characters
    function checkLength(number) {
      if (number.length !== 10){
        return false;
      } else {
        return true;
      }
    }
