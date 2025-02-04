import {openModal, closeModal} from './modal';
import {postData} from '../services/services';

function forms(formsSelector, modalTimerId) {
    // Forms

    // Важно: !!!
    // Когда мы используем связку XMLHttpRequest + formData
    // тогда !! нам не нужно указывать заголовок.
    // Заголовок в данном случае устанавливается автоматически
    
    const forms = document.querySelectorAll(formsSelector);

    const message = {
                loading: 'img/form/spinner.svg',
                sucsess: "Sucsess. Thank you, let's keep in touch",
                failure: 'Error. Something went wrong'
            }

    forms.forEach(item => {
        bindPostData(item);
    });

    function bindPostData(form) {
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

        let statusMessage = document.createElement('img');
        // создаём блок выше
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
        `;
        
        // form.append(statusMessage)

        // добавляем блок с текстом "Loading" на страницу.
        // Следующая команда заменяет предыдущую. Она вставляет
        // statusMessage после формы 
        // для корректного позиционирования на странице

        form.insertAdjacentElement('afterend', statusMessage);


        // const request = new XMLHttpRequest(); 
        // request.open('POST', 'server.php');
        // XMLHttpReuest Не используем с промисами.

        // request.setRequestHeader('Content-type', 'application/json');
        // ** это лишнее  !!!
        
        const formData = new FormData(form);
        // Важно что бы в верстке были прописаны уникальные 
        // name="" атрибуты. Иначе FormData не сможет найти
        // этот input и не сможет взять из него value для
        // того что бы сформировать правильно объект.
        
        const json = JSON.stringify(Object.fromEntries(formData.entries()));

        postData('http://localhost:3000/requests', json)
        .then(data => {
            console.log(data);
            showThanksModal(message.sucsess);                
            statusMessage.remove();
                            // Удаляем блок с сообщением
                            // состояния через две секунды после получения
                            // ответа от сервера.
        }).catch(() => {
            showThanksModal(message.failure);
        }).finally(() => {
            form.reset(); // Сбрасываем содержимое 
                        // формы. Альтернативно можно 
                        // вручную очистить 
                        // содержимое input'ов которое 
                        // находится в этой форме. 
                        // Т.е перебрать 
                        // инпуты и очистить их .value
            });
        }) 
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal('.modal', modalTimerId);
        
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        
        // До этого этапа мы создавали блок thanksModal 
        // в джаваСкрипте а в следующей строке 
        // мы его добавляем в верстку
        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal')
        }, 4000); // Удаляем блок и возвращаем старый блок,
        // и потом закрываем этот блок 
    }
}

// module.exports = forms;

export default forms; // new standard