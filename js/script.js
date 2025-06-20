window.addEventListener('DOMContentLoaded', () => {

    // Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(event => {
            event.classList.add('hide');
            event.classList.remove('show', 'fade');
        });
        tabs.forEach((tab) => {
            tab.classList.remove('tabheader__item_active');
        });
    };

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    };

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    hideTabContent();
    showTabContent();

    // Timer

    const deadline = '2025-01-01';

    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());

        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
                hours = Math.floor((t / (1000 * 60 * 60) % 24)),
                minutes = Math.floor((t / 1000 / 60) % 60),
                seconds = Math.floor((t / 1000) % 60);
        }

        //                      одна минута это 1000 * 60
        //                      один час это 1000 * 60 * 60. Общее оставшееся время разделить на часы

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    };

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    };

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector);
        days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        };
    };

    setClock('.timer', deadline);


    // Modal 

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        closeTrigger = document.querySelector('[data-close]');

    modalTrigger.forEach((btn) => {
        btn.addEventListener('click', openModal)
    });


    closeTrigger.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal()
        }
    })

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
        clearInterval(modalTimerId);
    }

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    })

    // const modalTimerId = setTimeout(openModal, 7000)


    function showModalByScroll() {

        if (document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll)
        }
    };

    window.addEventListener('scroll', showModalByScroll)


    // Используем классы для карточек.

    // Шаблонизировать карточки. 
    // И создавать их передавая нужные аргументы

    // # 1. Создаём Шаблон(класс)


    class MenuCard {
        constructor(img, alt, title, descr, price, parentSelector, ...classes) {
            this.img = img;
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
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.img} alt=${this.alt}>
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

    new MenuCard(
        'img/tabs/vegy.jpg',
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        10,
        '.menu .container'
    ).render();

    new MenuCard(
        'img/tabs/elite.jpg',
        "elite",
        'Меню “Премиум”',
        'B меню "Премиум" мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        14,
        '.menu .container', 'menu__item'
    ).render();

    new MenuCard(
        'img/tabs/post.jpg',
        "post",
        'Меню "Постное"',
        'Меню "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        21,
        '.menu .container', 'menu__item', 'big'
    ).render();

    // Forms + AJAX

    // Важно: !!!
    // Когда мы используем связку XMLHttpRequest + formData
    // тогда !! нам не нужно указывать заголовок.
    // Заголовок в данном случае устанавливается автоматически

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'Loading',
        sucsess: 'Sucsess. Thank you, let"s keep in touch',
        failure: 'Something has gone wrong'
    }

    forms.forEach(item => {
        postData(item);
    })

    function postData(form) {
        form.addEventListener('submit', (e) => {
            // Событие submit срабатывает каждый раз
            //  когда мы пытаемся отправить форму 
            e.preventDefault(); // Команда отменяет 
            // стандартное поведение браузера 
            // Т.е. не перезагружает страницу
            // когда отправляешь форму

            // Очень частый приём это создание нового 
            // блока на странице куда мы выводим данные, 
            // картинку и тп. Чаще всего этот блок 
            // добавляется к форме. Пример ниже:

            const statusMessage = document.createElement('div');
            // создаём блок выше
            statusMessage.classList.add('status'); // добавляем класс
            statusMessage.textContent = message.loading; // Из объекта
            // берем необходимое сообщение
            // *скорее всего для тех пользователей 
            // с медленным интернетом

            form.append(statusMessage)
            // Выводим\добавляем 
            // блок верстки с текстом "Loading" в блок формы

            const request = new XMLHttpRequest();
            request.open('POST', 'https://my-worker.shvetsviktor89.workers.dev/');

            // request.setRequestHeader('Content-type', 'multipart/form-data');
            // ** это лишнее  !!!

            const formData = new FormData(form);
            // Важно что бы в верстке были прописаны уникальные 
            // name="" атрибуты. Иначе FormData не сможет найти
            // этот input и не сможет взять из него value для
            // того что бы сформировать правильно объект.

            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            } // Проверяем, что данные собираются корректно

            request.send(formData);

            request.addEventListener('load', () => {// Отслеживаем 
                // загрузку контента
                if (request.status === 200) {
                    console.log(request.response);
                    statusMessage.textContent = message.sucsess;
                } else {
                    statusMessage.textContent = message.failure;
                }
            });

        })
    }
});
