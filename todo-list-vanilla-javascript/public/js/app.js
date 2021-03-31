const deleteButtom = document.getElementsByClassName('delete-buttom');
const checkbox = document.getElementsByClassName('checkbox');

for (i = 0; i < deleteButtom.length; i++) {
  deleteButtom[i].addEventListener('click', (e) => {
    const url = 'deleteTodo/' + e.target.parentElement.id;
    fetch(url, {
      method: 'DELETE'
    }).then(data => {
      window.location.href = "/"
    })
      .catch(err => console.log(err));
  });
}

for (i = 0; i < checkbox.length; i++) {
  checkbox[i].addEventListener('click', (e) => {
    const url = 'changeStatus/' + e.target.parentElement.id;

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: e.target.checked }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
}