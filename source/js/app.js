function init_menu () {
  var CLOSED = 'site-nav--closed';

  var navMain = document.querySelector('.site-nav ');
  var navToggle = document.querySelector('.site-nav__toggler');

  navMain.classList.remove('site-nav--nojs');
  navMain.classList.add(CLOSED);

  setTimeout(function () {
    // тут у нас маленький костыль
    // site-nav--animated включает анимацию у меню
    // не можем ставить site-nav--animated по умолчанию,
    //    т.к. появляется анимация закрытия меню при открытии страницы с js
    // нцжно поставить класс site-nav--animated после того как будет установлен
    //    и применить стиль класса site-nav--closed, поэтому использован setTimeout
    navMain.classList.add('site-nav--animated');
  });

  navToggle.addEventListener('click', function () {
    navMain.classList.toggle(CLOSED);
  });
}

function init_modal () {
  var modal_success = document.querySelector('.js-modal-success');
  var modal_error = document.querySelector('.js-modal-error');
  var body = document.querySelector('body');

  document.querySelector('.feedback-form__submit-button').addEventListener('click', function () {
    var modal = Math.random() > 0.5 ? modal_success : modal_error;

    modal.classList.add('modal--open');
    body.classList.add('modal-is-open');
  });

  document.querySelectorAll('.js-modal-close').forEach(function (elem) {
    elem.addEventListener('click', function () {
      this.closest('.modal').classList.remove('modal--open');
      body.classList.remove('modal-is-open');
    });
  });
}

(function () {
  init_menu();
  init_modal();
})();
