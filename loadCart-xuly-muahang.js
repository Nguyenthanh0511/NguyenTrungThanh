const select = document.querySelector.bind(document);

class Shoes {
  constructor(obj) {
    this.name = obj.name;
    this.quantity = obj.quantity;
    this.price = obj.price;
    this.image = obj.image;
  }

  getElement() {
    return `
      <div class="shoppingcart-box">
        <div class="scrollbar" id="style-3">
          <ul class="list clearfix force-overflow">
            <li class="item">
              <div class="icon-product-delete delete-order" product-id="146" item-id="188" data-quantity="1">
                <a class="demo-icon icon-trash-2" href="#"></a>
              </div>
              <a href="${this.image}" class="preview-image">
                <img class="preview" src="${this.image}" alt="Giày đá bóng Zocker ZTF 18VT Red-Black - Zocker ZTF 18VT Red-Black (Cao su - Da tổng hợp - Hồng Kông)">
              </a>
              <div class="description">
                <a href="#">
                  ${this.name}
                </a>
                <strong class="price">
                  <span class="number-item">${this.quantity}</span> x
                  ${this.price},000₫
                </strong>
              </div>
            </li>
          </ul>
        </div>
        <div class="item-cart clearfix">
          <div class="pull-left">
            <strong>Thành tiền:</strong>
          </div>
          <div class="pull-right">
            <strong class="price-well">
              ${this.quantity * this.price},000₫
            </strong>
          </div>
        </div>
        <div class="view-link clearfix">
          <a href="oder.html" class="btn btn-primary pull-right"
            data-name="${this.name}"
            data-price="${this.price}"
            data-image="${this.image}"
            data-quantity="${this.quantity}">
            Check
          </a>
        </div>
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
      </div>`;
  }
}

let addListenerEvent = function (selector) {
  let listBTN;
  if (selector) {
    listBTN = document.querySelectorAll(selector);
  } else {
    listBTN = document.querySelectorAll('.item-action.preview-mini-modal');
  }
  listBTN.forEach(item => {
    item.onclick = function (e) {
      e.preventDefault();
      alert("Thêm sản phẩm vào giỏ hàng thành công !");
      addProduct(e.target.closest('.item-product'));
      redirectToOrderPage(e.target.closest('.item-product'));
    }
  });
};

function addProduct(item) {
  const name = item.getAttribute('data-name');
  const price = item.getAttribute('data-price');
  const image = item.getAttribute('data-image');
  const quantity = item.getAttribute('data-quantity');
  const product = new Shoes({ name, quantity, price, image });
  const shoppingCart = select('.shoppingcart-box');
  shoppingCart.innerHTML += product.getElement();
}

function redirectToOrderPage(item) {
  const name = item.getAttribute('data-name');
  const price = item.getAttribute('data-price');
  const image = item.getAttribute('data-image');
  const quantity = item.getAttribute('data-quantity');
  const url = `oder.html?name=${name}&price=${price}&image=${image}&quantity=${quantity}`;
  window.location.href = url;
}

// Gọi hàm addListenerEvent với selector là '.item-action.preview-mini-modal'
