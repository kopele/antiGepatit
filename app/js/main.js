window.onload = function () {
    var lis = document.getElementById("carousel2")
    var li = lis.querySelectorAll("li");
    var img = lis.querySelectorAll("img");

    for (var i = 0; i < li.length; i++) {
        li[i].style.position = 'relative';
        img[i].setAttribute("class", "zoom");
        var span = document.createElement('span');
        span.style.cssText = 'position:absolute;left:0;top:0';
        span.innerHTML = i + 1;
        li[i].appendChild(span);
    };

    var width = 100;
    var count = 1;
    var carousel = document.getElementById('carousel2');
    var list = carousel.querySelector('ul');
    var listElems = carousel.querySelectorAll('li');
    var position = 0;
    carousel.querySelector('.prev').onclick = function () {
        position = Math.min(position + width * count, 0)
        list.style.marginLeft = position + 'px';
    };
    carousel.querySelector('.next').onclick = function () {
        position = Math.max(position - width * count, -width * (listElems.length - count));
        list.style.marginLeft = position + 'px';
    };
};