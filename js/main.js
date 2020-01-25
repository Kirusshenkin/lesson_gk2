const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


let makeGetRequest = (API_URL, callback) => {
    return new Promise((resolve, reject ) => {
        xhr = new window.XMLHttpRequest()

        xhr.open('GET', API_URL, true);
        xhr.onreadystatechange  = () => {
            callback(xhr.responseText);
            resolve(callback);
            reject(console.log('error-404'));
        }
        xhr.open('GET', API_URL);
        xhr.send();
    });
}

class GoodsItem {
    constructor(id, title = 'Без навания', price = 0, img = 'https://via.placeholder.com/250') {
        this.id = id;
        this.title = title;
        this.price = price;
        this.img = img;
    }
    render() {
        return `<div class="goods-item" data-id="${this.id}">
            <img src="${this.img}" alt="image">
            <div class="desc">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="js-add-to-cart">Добавить</button>
            </div>
        </div>
        `;
    }
}

class GoodsList {
    constructor(container) {
        this.container = document.querySelector(container);
        this.goods = [];
    }
    initListeners() {}
    findGood(id) {
        return this.goods.find(good => good.id === id);
    }
    // addCart(price) {
    //     return this.goods.add(good => good.price === price);
    // }
    fetchGoods(callback) {
        makeGetRequest(`${API_URL}/catalogData.json`, (goods) => {
            this.goods = JSON.parse(goods);
            callback();
        });
    }
    totalSum() {
        let sum = 0;
        for (const good of this.goods) {
            if(good.price) {
                sum += good.price;
            }
        }
        return sum;
    }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.id_product, good.product_name, good.price, good.img);
            listHtml += goodItem.render();
        })
        this.container.innerHTML = listHtml;
        this.initListeners();
    }
}

class GoodsPage extends GoodsList {
    initListeners() {
        const buttons = [... this.container.querySelectorAll('.js-add-to-cart')];
        buttons.forEach(button => {
            button.addEventListener('click', (event) => {
                const goodId = event.target.parentElement.getAttribute('data-id');
                // const goodPrice = event.target.parentElement.add()
                this.addToCart(parseInt(goodId, 10));
            })
        })
    }
    fetchGoods(callback) {
        makeGetRequest(`${API_URL}/catalogData.json`, (goods) => {
            this.goods = JSON.parse(goods);
        callback();
        })
    }
    addToCart(goodId) {
        const good = this.findGood(goodId);
        console.log(good);
    }

}
class Cart extends GoodsList {
    removeFromCart(goodId) {

    }
    cleanCart() {

    }
    updateCartItem(id, goods) {
    }
}

class CartItem extends GoodsItem{
    constructor(...attrs) {
        super(attrs);
        this.count = 0;
    }
    incCount() {
        
    }
    decCount() {

    }
}

const list = new GoodsPage('.goods-list');
list.fetchGoods(() => {
    list.render();
});
console.log(list.totalSum());
