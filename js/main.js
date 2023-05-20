if (!localStorage.getItem('goods')) {
  localStorage.setItem('goods', JSON.stringify([]))
}

const addGoodButton = document.querySelector('.add_new')

const BSModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
  keyboard: false,
})

let options = {
  valueNames: ['name', 'price'],
}
let userList

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
      id: Date.now().toString(),
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
        `<tr class='align-middle'>
    <td>${i + 1}</td>
    <td class='name'>${good.name}</td>
    <td class='price'>${good.price}</td>
    <td>${good.count}</td>
    <td>
    <button class='good_delete btn btn-danger' data-delete='${
      good.id
    }'>&#10006;</button>
    </td>
    <td>
    <button class="good_delete btn btn-primary" data-goods='${
      good.id
    }'>&#10149;</button>
    </td>
    </tr>
            `
      )
      if (good.count > 0) {
        good.priceWithDiscount =
          good.count * good.price -
          good.count * good.price * good.discount * 0.01
        resultPrice += good.priceWithDiscount

        const cart = document.querySelector('.cart')
        cart.insertAdjacentHTML(
          'beforeend',
          `<tr class='align-middle'>
    <td>${i + 1}</td>
    <td class='price_name'>${good.name}</td>
    <td class='price_one'>${good.price}</td>
    <td class='price_count'>${good.count}</td>
    <td class='price_discount'><input data-goodid='${
      good.id
    }' type='text' value='${good.discount}' min='0' max='100'/></td>
    <td>${good.priceWithDiscount}</td>
    <td>
    <button class='good_delete btn btn-danger' data-delete='${
      good.id
    }'>&#10006;</button>
    </td>

    </tr>`
        )
      }
    })

    userList = new List('goods', options)
  } else {
    table1.hidden = true
    table2.hidden = true
  }
  document.querySelector('.price_result').innerHTML = resultPrice + ' &#8381;'
}

document.querySelector('.list').addEventListener('click', function (event) {
  if (event.target.dataset.delete) {
    Swal.fire({
      text: 'Удалить товар?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Удалить',
      cancelButtonText: 'Отмена',
    }).then((result) => {
      if (result.isConfirmed) {
        const goods = JSON.parse(localStorage.getItem('goods'))
        const updateGoods = goods.filter(
          (good) => event.target.dataset.delete !== good.id
        )
        localStorage.setItem('goods', JSON.stringify(updateGoods))
        updateGoodsList()
        Swal.fire('Товар удален!', 'success')
      }
    })
  }
})
