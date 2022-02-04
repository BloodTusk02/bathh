let Scrollbar = window.Scrollbar;

const options = {
    'damping': 0.04,
    'renderByPixels': true,
};

//Инициализируем окно. Созданный объект заносим в "scrollbar". 
//Дальнейшее взаимодействие производить надо через этот объект
const scrollbar = Scrollbar.init(document.querySelector('#my-scrollbar'), options);

const navBar = document.querySelector(".navbar");
const allLi = document.querySelectorAll("li");

allLi.forEach((li, index) => {
    li.addEventListener("click" , e => {
        e.preventDefault();
        navBar.querySelector(".active").classList.remove("active");
        li.classList.add("active");
    });
});



let fixedLeft = fixed.offsetLeft;
let fixedTop = fixed.offsetTop; 

console.log(fixedLeft, fixedTop);

//Вроде как это будет срабатывать при любом изменении состояния скроллбара
scrollbar.addListener(function(status) {
    //console.log(status.offset); //Вывод координат
    let offset = status.offset;
    fixed.style.top = (offset.x + fixedTop).toString() + 'px';
    fixed.style.left = (offset.y + fixedLeft).toString() + 'px';
});