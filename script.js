let count = 0,
    interval;

function logoAnimation() {
    const lvl = document.querySelector('.header__timer-extra');
    count++;
    lvl.textContent = count;

    if (count == 50) {
        clearInterval(interval);
        interval = setInterval(() => logoAnimation(), 100);
    }
    if (count == 100) {
        clearInterval(interval);
    }
}

interval = setInterval(() => logoAnimation(), 40);




const product = {
    plainBurger: {
        name: 'Гамбургер простой',
        price: 10000,
        kcall: 500,
        amount: 0,
        get Summ() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.amount * this.kcall;
        }
    },
    freshBurger: {
        name: 'Гамбургер FRESH',
        price: 20500,
        kcall: 1000,
        amount: 0,
        get Summ() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.amount * this.kcall;
        }
    },
    freshCombo: {
        name: 'FRESH COMBO',
        price: 31900,
        kcall: 1500,
        amount: 0,
        get Summ() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.amount * this.kcall;
        }
    }
}

const extraProduct = {
    doubleMayonnaise: {
        kcall: 100,
        price: 2000,
        name: 'Двойной майонез'
    },
    lettuce: {
        kcall: 10,
        price: 500,
        name: 'Салатный лист'
    },
    cheese: {
        kcall: 50,
        price: 1000,
        name: 'Сыр'
    }
}

const btnPlusOrMinus = document.querySelectorAll('.main__product-btn'),
    checkExtraProduct = document.querySelectorAll('.main__product-checkbox');
// console.log(btnPlusOrMinus);

for (let i = 0; i < btnPlusOrMinus.length; i++) {
    btnPlusOrMinus[i].addEventListener('click', function () {
        plusOrMinus(this);
    })
    // console.log(btnPlusOrMinus[i]);
}

function plusOrMinus(element) {
    // console.log(element);
    // .closest() - метод возвращает ближайший родительский элемент. Если совпадений нету null
    // .getAttribute() - возвращает значение указанного атрибута
    const parent = element.closest('.main__product'),
        parentId = parent.getAttribute('id'),
        amount = parent.querySelector('.main__product-num'),
        price = parent.querySelector('.main__product-price span'),
        kcall = parent.querySelector('.main__product-kcall span'),
        elementSymbol = element.getAttribute('data-symbol');


    if (elementSymbol == '+' && product[parentId].amount < 10) {
        product[parentId].amount++;
    }
    else if (elementSymbol == '-' && product[parentId].amount > 0) {
        product[parentId].amount--;
    }

    amount.innerHTML = product[parentId].amount;
    price.innerHTML = product[parentId].Summ;
    kcall.innerHTML = product[parentId].Kcall;

}


// ------------------------ Доп ПРОДУКЦИЯ ---------------------------

function addExtraProduct(element) {
    // console.log(element);
    const parent = element.closest('.main__product'),
        parentId = parent.getAttribute('id'),
        price = parent.querySelector('.main__product-price span'),
        kcall = parent.querySelector('.main__product-kcall span'),
        elementExtra = element.getAttribute('data-extra');
    product[parentId][elementExtra] = element.checked;
    //   console.log(product[parentId]);

    if (product[parentId][elementExtra] === true) {
        product[parentId].price += extraProduct[elementExtra].price;
        product[parentId].kcall += extraProduct[elementExtra].kcall;
    } else {
        product[parentId].price -= extraProduct[elementExtra].price;
        product[parentId].kcall -= extraProduct[elementExtra].kcall;
    }
    price.innerHTML = product[parentId].Summ;
    kcall.innerHTML = product[parentId].Kcall;
}

for (let i = 0; i < checkExtraProduct.length; i++) {
    checkExtraProduct[i].addEventListener('click', function () {
        addExtraProduct(this);
    })
}



let arrayProdcuct = [],
    totalName = '',
    totalPrice = 0,
    totalKcall = 0;

const addCart = document.querySelector('.addCart'),
    receipt = document.querySelector('.receipt'),
    receiptWindow = receipt.querySelector('.receipt__window'),
    receiptOut = receiptWindow.querySelector('.receipt__window-out'),
    receiptBtn = receiptWindow.querySelector('.receipt__window-btn');


addCart.addEventListener('click', function () {
    for (const key in product) {
        const productObj = product[key];
        if (productObj.amount > 0) {
            arrayProdcuct.push(productObj);
            // console.log(arrayProdcuct);
            for (const newKey in productObj) {
                if (productObj[newKey] === true) {
                    productObj.name += '\n' + extraProduct[newKey].name;
                }
            }
        }
        productObj.price = productObj.Summ;
        productObj.kcall = productObj.Kcall;
    }

    for (let i = 0; i < arrayProdcuct.length; i++) {
        const obj = arrayProdcuct[i];
        totalPrice += obj.price;
        totalKcall += obj.kcall;
        totalName += '\n' + obj.name + '\n';
    }
    receiptOut.innerHTML = `Вы заказали: \n ${totalName} \n Калорийность: ${totalKcall} \n Стоимость заказа: ${totalPrice} сум`;
    receipt.style.display = 'flex';
    setTimeout(function () {
        receipt.style.opacity = '1';
        receiptWindow.style.top = '25%';
    }, 100)
})

receiptBtn.addEventListener('click', function () {
    location.reload();
})