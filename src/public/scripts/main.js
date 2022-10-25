const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  let body = Object.fromEntries(data.entries());

  axios({
    url: '/predict',
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    data: body,
  })
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'تم استلام توقعك',
        showConfirmButton: false,
        timer: 2000,
      });
      form.reset();
    })
    .catch((error) => {
      const data = error.response.data.errors;
      const mobileNumberVaild =
        error.response.data.keyValue?.mobileNumber == body.mobileNumber;
      let errors = '';
      for (err in data) {
        errors += `<p>${data[err].message}</p>`;
      }

      Swal.fire({
        icon: 'error',
        title: 'خطأ في البيانات',
        html: mobileNumberVaild ? 'الموبايل موجود بالفعل' : errors,
      });
    });
});
