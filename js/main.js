if (!localStorage.getItem('goods')) {
  localStorage.setItem('goods', JSON.stringify([]))
}

const addGoodButton = document.querySelector('.add_new')

const BSModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
  keyboard: false,
})

let resultPrice = 0

addGoodButton.addEventListener('click', addGoodToList)

function addGoodToList() {
  const name = document.querySelector('#good_name').value
  const price = document.querySelector('#good_price').value
  const count = document.querySelector('#good_count').value

  if (name.trim() && price.trim() && count.trim()) {
    name.value = ''
    price.value = ''
    count.value = ''
    const goods = JSON.parse(localStorage.getItem('goods'))
    goods.push({
      id: Date.now(),
      name,
      price,
      count,
      countInCart: 0,
      dicount: 0,
      priceWithDiscount: 0,
    })
    localStorage.setItem('goods', JSON.stringify(goods))
    updateGoodsList()
    BSModal.hide()
  } else {
    Swal.fire('Заполните все поля')
  }
}

updateGoodsList()

function updateGoodsList() {
  const tbody = document.querySelector('.list')
  tbody.innerHTML = ''
  const cart = document.querySelector('.cart')
  cart.innerHTML = ''
  const goods = JSON.parse(localStorage.getItem('goods'))
  if (goods.length) {
    table1.hidden = false
    table2.hidden = false
    goods.forEach((good, i) => {
      tbody.insertAdjacentHTML(
        'beforeend',
        `
<tr class='align-middle'>
<td>${i + 1}</td>
<td>${good.name}</td>
<td>${good.price}</td>
<td>${good.count}</td>
<td>
<button class='good_delete btn-danger' data-delete='${
          good.id
        }'>&#10006;</button>
</td>
<td>
<button class="good_delete btn-danger" data-goods='${good.id}'>&#10149;</button>
</td>
</tr>
        `
      )
      if (good.count > 0) {
        good.priceWithDiscount =
          good.count * good.price -
          good.count * good.price * good.discount * 0.01
        resultPrice += good.priceWithDiscount
      }
    })
  }
}
