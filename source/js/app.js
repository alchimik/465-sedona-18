(function () {
  var CLOSED = 'site-nav--closed';

  var navMain = document.querySelector('.site-nav ');
  var navToggle = document.querySelector('.site-nav__toggler');

  navMain.classList.remove('site-nav--nojs');
  navMain.classList.add(CLOSED);

  setTimeout(function() {
    // тут у нас маленький костыль
    // site-nav--animated включает анимацию у меню
    // не можем ставить site-nav--animated по умолчанию,
    //    т.к. появляется анимация закрытия меню при открытии страницы с js
    // нцжно поставить класс site-nav--animated после того как будет установлен
    //    и применить стиль класса site-nav--closed, поэтому использован setTimeout
    navMain.classList.add('site-nav--animated');
  });

  navToggle.addEventListener('click', function() {
    navMain.classList.toggle(CLOSED);
  });
})();
