const deleteButtom = document.getElementsByClassName('delete-buttom');

for (i = 0; i < deleteButtom.length; i++) {
  deleteButtom[i].addEventListener('click', (e) => {
    const url = 'deleteTodo/' + e.target.id;

    fetch(url, {
      method: 'DELETE'
    }).then(data => {
      window.location.href = "/"
    })
      .catch(err => console.log(err));

  });
}