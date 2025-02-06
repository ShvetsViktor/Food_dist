import { getResource } from "../services/services";

function cards() {
    class MenuCard {
        constructor(src, alt, title = "Без названия", descr = "Нет описания", price = "—", parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            if (!isNaN(this.price)) {
                this.price = this.price * this.transfer;
            }
        }

        render() {
            const element = document.createElement("div");

            if (this.classes.length === 0) {
                this.classes = "menu__item";
                element.classList.add(this.classes);
            } else {
                this.classes.forEach((className) => element.classList.add(className));
            }

            element.innerHTML = `
                <img src="${this.src}" alt="${this.alt}" style="width: 100%; height: 100%; object-fit: contain;">
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    getResource("https://json-server-rest-api.shvetsviktor89.workers.dev/images")
        .then(data => {
            data.forEach(({ url, altimg, title, descr, price }) => {
                new MenuCard(url, altimg, title, descr, price, ".menu .container").render();
            });
        })
        .catch(error => console.error("Ошибка загрузки изображений:", error));
}

export default cards;
