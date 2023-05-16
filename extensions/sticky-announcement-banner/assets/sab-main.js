var el = document.getElementById('sab-container');
var banner = document.getElementById('sab-main-banner');

var elHeight = banner.offsetHeight;
elHeight += parseInt(window.getComputedStyle(banner).getPropertyValue('margin-top'));
elHeight += parseInt(window.getComputedStyle(banner).getPropertyValue('margin-bottom'));

el.style.height = elHeight + "px";
