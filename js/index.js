window.addEventListener('load', function () {
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        // 再次添加定时器
        timer = setInterval(function () {
            // 手动调用点击事件
            arrow_r.click();
        }, 3000);
    })

    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    var focusWidth = focus.offsetWidth;
    for (var i = 0; i < ul.children.length; i++){
        var li = document.createElement('li');
        //自定义属性记录索引号
        li.setAttribute('data-index', i);
        ol.appendChild(li);
        li.addEventListener('click', function () {
            for (var i = 0; i < ol.children.length; i++){
                ol.children[i].className = '';
            }
            this.className = 'current';
            //点击小圆圈移动图片
            var index = this.getAttribute('data-index');
            num = index;
            circle = index;
            animate(ul, - index * focusWidth);
            // console.log(focusWidth);
            // console.log(index);
        })
    }
    ol.children[0].className = 'current';
    // 克隆第一张图片放在最后做无缝滚动
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 点击按钮移动图片
    var num = 0;
    var circle = 0;
    // 节流阀，控制点击播放速度
    var flag = true;
    arrow_r.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function () {
                // 打开节流阀
                flag = true;
            });
            circle++;
            circle = circle == 4 ? 0 : circle;
            // 调整小圆圈的位置
            circleChage();
        }
    })
    arrow_l.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length-1;
                ul.style.left = -num*focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });
            circle = circle == 0 ? ul.children.length-1 : circle;
            circle--;
            // 调整小圆圈的位置
            circleChage();
        }
    })
    function circleChage() {
        for (var i = 0;i<ol.children.length; i++){
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }

    // 自动播放功能
    var timer = setInterval(function () {
        // 手动调用点击事件
        arrow_r.click();
    }, 3000);
})