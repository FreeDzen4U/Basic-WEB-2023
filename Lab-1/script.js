const menu = document.querySelector('.menu-btn'),
    menu1 = document.querySelector('.menu-1'),
    menu2 = document.querySelector('.menu-2'),
    menu3 = document.querySelector('.menu-3'),
    menu4 = document.querySelector('.menu-4');

const btn1 = document.querySelector('.btn-1'),
      btn2 = document.querySelector('.btn-2'),
      btn3 = document.querySelector('.btn-3');

var isOpen = false;

menu.addEventListener ('click', () => {
    menu1.classList.toggle('menu-1-show');
    menu2.classList.toggle('menu-2-show');
    menu3.classList.toggle('menu-3-show');
    menu4.classList.toggle('menu-4-show');
    btn2.classList.toggle('btn-2-fade');

    const tl = gsap.timeline();
    const tlbtn3 = gsap.timeline();

    if (!isOpen) {
        tl.to('.btn-1', {
            y: isOpen? 0 : 9,
        })
            .to('.btn-1', {
            rotate: isOpen? 0 : 45,
        })

        tlbtn3.to('.btn-3', {
            y: isOpen? 0 : -9,
        })
            .to('.btn-3', {
            rotate: isOpen? 0 : -45
        })
    } else {
        tl.to('.btn-1', {
            rotate: isOpen? 0 : 45,
        })
            .to('.btn-1', {
            y: isOpen? 0 : 9,
        })

        tlbtn3.to('.btn-3', {
            rotate: isOpen? 0 : -45,
        })
            .to('.btn-3', {
            y: isOpen? 0 : -9,
        })
    }

    isOpen = !isOpen
})