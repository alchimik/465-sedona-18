(function () {
  var CLOSED = 'site-nav--closed';

  var navMain = document.querySelector('.site-nav ');
  var navToggle = document.querySelector('.site-nav__toggler');

  navMain.classList.remove('site-nav--nojs');
  navMain.classList.add(CLOSED);

  navToggle.addEventListener('click', function() {
    navMain.classList.toggle(CLOSED);
  });
})();
