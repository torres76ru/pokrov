const request_button = document.getElementById('request_button')
const orderBtn = document.getElementById('orderBtn')
const modal_order_name = document.getElementById('modal-order-name')
const modal_order_phone = document.getElementById('modal-order-phone')
const modal_order_place = document.getElementById('modal-order-place')
const modal_order_comment = document.getElementById('modal-order-comment')
request_button.addEventListener('click',function(){
    console.log('request_button name :',modal_order_name.value)
    console.log('request_button phone :',modal_order_phone.value)
    console.log('request_button place :',modal_order_place.value)
    console.log('request_button comment :',modal_order_comment.value)
    const data ={
        "name":modal_order_name.value,
        "square_number":modal_order_place.value,
        "type":'ВыборУчастка',
        "mobile":modal_order_phone.value,
        "comment":modal_order_comment.value
      }
    const url = 'https://www.xn----dtbjsbiobbcfop0t.xn--p1ai/api/requests'
    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Успешный ответ:', data);
      })
      .catch(error => {
        console.error('Ошибка:', error);
      });
})
const yourname = document.getElementById('yourname')
const yourmobile = document.getElementById('modal-order-phone-sec')
orderBtn.addEventListener('click',function(){
    console.log('orderBtn was clicked')
  const data = {
    "name":yourname.value,
    "square_number":0,
    "type":'Консультация',
    "mobile":yourmobile.value,
    "comment":''
  }
  const url = 'https://www.xn----dtbjsbiobbcfop0t.xn--p1ai/api/requests'
  fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Успешный ответ:', data);
    })
    .catch(error => {
      console.error('Ошибка:', error);
    });
})