window.onload = function () {
    var buttons = document.querySelectorAll('.button'),
        tip = document.querySelector('.tip'),
        em = tip.firstElementChild;

    buttons.forEach(function (button, index) {
        button.addEventListener('mouseenter', function (event) {
            em.innerHTML = button.getAttribute('data');

            var pos = button.offsetLeft,
                tipWidth = parseInt(getComputedStyle(tip, null).width) + 28,
                buttonWidth = parseInt(getComputedStyle(button, null).width),
                dis = (tipWidth - buttonWidth) / 2,
                left = pos - dis;

            tip.style.opacity = 1;
            tip.style.left = left + 'px';
            tip.style.top = '145px';
        }, false);

        button.addEventListener('mouseleave', function (event) {
            tip.style.opacity = 0;
            tip.style.top = '100px';
        }, false);
    });
};
