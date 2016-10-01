function $(id) {
    return typeof id === 'string' ? document.getElementById(id) : null;
}

window.onload = function () {
    var titles = $('notice-tit').getElementsByTagName('li'),
        divs = $('notice-con').getElementsByTagName('div'),
        i, j, len, length;

    if (titles.length != divs.length) {
        return
    }

    for (i = 0, length = titles.length; i < length; i++) {
        titles[i].id = i;
        titles[i].onmouseover = function () {
            for (j = 0, len = titles.length; j < len; j++) {
                titles[j].className = '';
                divs[j].style.display = 'none';
            }
            this.className = 'select';
            divs[this.id].style.display = 'block';
        };
    }
};