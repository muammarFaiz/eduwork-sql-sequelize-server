const delform = document.getElementById('del');
const delform_input = document.getElementById('delinput');
const del_res = document.getElementById('del_res');
const searchform = document.getElementById('searchform');
const searchinput = document.getElementById('searchinput');
const search_res = document.getElementById('search_res');
const updateform = document.getElementById('updateform');
const updateinput_name = document.getElementById('updateinput_name');
const updateinput_price = document.getElementById('updateinput_price');

delform.addEventListener('submit', event => {
  event.preventDefault();
  fetch('/updatetable', {
    method: 'delete',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({name: delform_input.value})
  })
  .then(res => res.text(), err => {
    console.log('err: ');
    console.log(err);
  })
  .then(res => {
    console.log('success: ', res);
    del_res.innerHTML = 'success: ' + res;
  });
});

function search(thename) {
  const query = `?productname=${thename}`;
  fetch('/updateproduct' + query)
  .then(res => res.text(), err => console.log(err))
  .then(res => {
    console.log('request success');
    console.log(res);
    search_res.innerText = res;
  });
}

searchform.addEventListener('submit', event => {
  event.preventDefault();
  search(searchinput.value);
});

updateform.addEventListener('submit', event => {
  event.preventDefault();
  const query = `?name=${updateinput_name.value}&newprice=${updateinput_price.value}`;
  // fetch PATCH is case sensitive
  fetch('/updateproduct' + query, {method: 'PATCH'})
  .then(res => res.text(), err => console.log(err))
  .then(res => {
    console.log('success update');
    console.log(res);
    search(updateinput_name.value);
  });
});
