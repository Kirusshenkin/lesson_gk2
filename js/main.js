const renderGoodsItem = (title, price, img = '') => {
    return `<div class="goods-item">
        <img src="${img}" alt="image">
        <div class="desc">
            <h3>${title}</h3>
            <p>${price}</p>
            <button>Добавить</button>
        </div>
    </div>`
};
const goods = [
    {title: "Машина", price: 150, img: 'https://via.placeholder.com/250'}, 
    {title: "Машина-красная", price: 175, img: 'https://via.placeholder.com/250'},
    {title: "Машина-синия", price: 180, img: 'https://via.placeholder.com/250'},
    {title: "Машина-зелёная", price: 185, img: 'https://via.placeholder.com/250'},
    {title: "Машина-чёрная", price: 190, img: 'https://via.placeholder.com/250'},
];

const renderGoodsList = (list, container) => {
    const goodsList = list.map(good => renderGoodsItem(good.title, good.price, good.img))
    document.querySelector(container).innerHTML = goodsList.join('');
};
//1. Добавьте пустые классы для корзины товаров и элемента корзины товаров. Продумайте, какие методы понадобятся для работы с этими сущностями.
class GoodsList {
    constructor() {
        this.goods = [];
    }
//2. Добавьте для GoodsList метод, определяющий суммарную стоимость всех товаров.
total() {
    let totalPrice = 0;
    this.goods.forEach(item=> totalPrice + item.price);
    return totalPrice;
    }
}
renderGoodsList(goods, '.goods-list');