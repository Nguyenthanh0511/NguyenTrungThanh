const select = document.querySelector.bind(document)
class Shoes {
    //Tạo lớp shoes có các đối tượng name , quantity price image
    constructor(obj) {
        this.name = obj.name
        this.quantity = obj.quantity
        this.price = obj.price
        this.image = obj.image
    }
    getElement() {
        //Trả về class shopping-box
        return `<div class="shoppingcart-box">
        //có khôis scrollbar 
        <div class="scrollbar" id="style-3">
            <ul class="list clearfix force-overflow">
                <li class="item">
                    <div class="icon-product-delete delete-order" product-id="146" item-id="188" data-quantity="1"> <a class="demo-icon icon-trash-2" href="#"></a></div> <a href="${this.image}" class="preview-image"> <img class="preview" src="${this.image}" alt="Giày đá bóng Zocker ZTF 18VT Red-Black - Zocker ZTF 18VT Red-Black (Cao su - Da tổng hợp - Hồng Kông)">
                    </a>
                    <div class="description"> <a href="#">
                            ${this.name} </a> <strong class="price">
                            <span class="number-item">${this.quantity}</span> x
                            ${this.price},000₫ </strong></div>
                </li>
            </ul>
        </div>
        
        <div class="item-cart clearfix">
            <div class="pull-left"> <strong>Thành tiền:</strong></div>
            <div class="pull-right"> <strong class="price-well"> ${this.quantity * (this.price)},000₫ </strong>
            </div>
        </div>
        <div class="view-link clearfix"> <a href="oder.html" class="btn btn-primary pull-right">check</a></div>
        <div class="clearfix"></div>
        <div class="clearfix"></div>
        <div class="warp-loading-block hidden">
            <div class="warp-bg"></div>
            <div class="sk-cube-grid ajax-loading-icon">
                <div class="sk-cube sk-cube1"></div>
                <div class="sk-cube sk-cube2"></div>
                <div class="sk-cube sk-cube3"></div>
                <div class="sk-cube sk-cube4"></div>
                <div class="sk-cube sk-cube5"></div>
                <div class="sk-cube sk-cube6"></div>
                <div class="sk-cube sk-cube7"></div>
                <div class="sk-cube sk-cube8"></div>
                <div class="sk-cube sk-cube9"></div>
            </div>
        </div>
    </div>`
    }
}

let addListenerEvent = function (selector) {
    let listBTN
    if (selector) {
        listBTN = document.querySelectorAll(selector)
    }
    else {
        listBTN = document.querySelectorAll('.item-action.preview-mini-modal')
    }
    listBTN.forEach(item => {
        item.onclick = function (e) {
            alert("Thêm sản phẩm vào giỏ hàng thành công !")
            addProduct(e.target.closest('.item-product'))
            e.preventDefault()
        }
    })
}

let loadCartStorage = function () {
    if (localStorage.getItem("cart")) {
        let jsonData = JSON.parse(localStorage.getItem("cart"))
        return jsonData
    }
    else {
        localStorage.setItem("cart", JSON.stringify([]))
        return []
    }
}

let saveCartStorage = function (data) {
    if (data) {
        localStorage.setItem("cart", JSON.stringify(data))
    }
    else {
        localStorage.setItem("cart", JSON.stringify([]))
    }
}



let clearCartStorage = function () {
    saveCartStorage([])
    setCartStorage()
}


let setCartStorage = function () {

    const dropdownCart = select('.dropdown-menu.pull-right')

    //HTML CLEAR CART
    dropdownCart.innerHTML = '<button onclick="clearCartStorage()" class="clear-cart">Clear Cart</button>'
    //

    let cartUser = loadCartStorage()
    
    if (cartUser.length == 0) {
        dropdownCart.innerHTML = `<div class="shoppingcart-box">
            <div class="scrollbar" id="style-3">
                <ul class="list clearfix force-overflow">
                    <li class="item"> <small class="text-center">Không có sản phẩm nào trong
                            giỏ hàng</small></li>
                </ul>
            </div>
            <div class="clearfix"></div>
            <div class="warp-loading-block hidden">
                <div class="warp-bg"></div>
                <div class="sk-cube-grid ajax-loading-icon">
                    <div class="sk-cube sk-cube1"></div>
                    <div class="sk-cube sk-cube2"></div>
                    <div class="sk-cube sk-cube3"></div>
                    <div class="sk-cube sk-cube4"></div>
                    <div class="sk-cube sk-cube5"></div>
                    <div class="sk-cube sk-cube6"></div>
                    <div class="sk-cube sk-cube7"></div>
                    <div class="sk-cube sk-cube8"></div>
                    <div class="sk-cube sk-cube9"></div>
                </div>
            </div>
        </div>`
    }
    else {
        for (let i = 0; i < cartUser.length; i++) {
            dropdownCart.innerHTML += new Shoes(cartUser[i]).getElement()
        }
    }
    document.querySelector('.mini-cart-order .number').innerText = cartUser.length
}
// chỗ này lấy thông tin sản phẩm 
let addProduct = function (element) {
    const name = element.querySelector('h4.title-product > a').innerText
    const price = parseInt(element.querySelector('p.price-well').innerText.split(",")[0])
    const image = element.querySelector('img').src
    const quantity = 1
    let obj = {
        name, price, image, quantity
    }
    let shoes = new Shoes(obj)
    let cartUser = loadCartStorage()
    let isExist = false

    cartUser.forEach(item => {
        if (item.name === shoes.name) {
            isExist = true
            item.quantity += 1
        }
    })
    if (isExist === false) {
        cartUser.push(shoes)
    }
    saveCartStorage(cartUser)
    setCartStorage()
}


// Đoạn code chỉnh sửa lần 2 -----xử lý tính năng thêm sang oder.html
//     lỗi : khi không thêm đường link ode.html vẫn có thể chạy được bên oder.html . có thể phỏng đoán đây là việc ,tôi đã thêm đoạn code ở trước đó phần oder.html
//     Bây giờ tôi cần xử lý việc mua 1 sản phẩm từ nút chedck
//   Lấy thông tin giỏ hàng từ Local Storage
  let cartItems = JSON.parse(localStorage.getItem("cart"));

  // Kiểm tra nếu giỏ hàng không rỗng
  if (cartItems && cartItems.length > 0) {
      let shoppingCartBox = document.querySelector('.shoppingcart-box ul');
  
      // Xóa nội dung ban đầu (Không có sản phẩm nào trong giỏ hàng)
      shoppingCartBox.innerHTML = '';
  
      // Tạo các phần tử sản phẩm trong giỏ hàng
      cartItems.forEach(item => {
          let listItem = document.createElement('list');
          listItem.classList.add('item');
          listItem.innerHTML = `
              <div class="icon-product-delete delete-order" product-id="146" item-id="188" data-quantity="1">
                  <a class="demo-icon icon-trash-2" href="#"></a>
              </div>
              <a href="${item.image}" class="preview-image">
                  <img class="preview" src="${item.image}" alt="${item.name}">
              </a>
              <div class="description">
                  <a href="#">${item.name}</a>
                  <strong class="price">
                      <span class="number-item">${item.quantity}</span> x ${item.price},000₫
                  </strong>
              </div>
          `;
          shoppingCartBox.appendChild(listItem);
      });
  }


