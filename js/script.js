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

let baseOffset = scrollbar.offset.y;
let prevActiveIndex = Math.floor(scrollbar.offset.y  / window.screen.width);
const menuItems = document.querySelector("#fixed > ul:nth-child(1)").children;

//Events
document.addEventListener("pageChanged", (e) => {
    menuItems[e.detail.prevPage].classList.remove('active');
    menuItems[e.detail.currPage].classList.add('active');
});


//Вроде как это будет срабатывать при любом изменении состояния скроллбара
scrollbar.addListener(function(status) {
    //console.log(status.offset); //Вывод координат
    let offset = status.offset;
    fixed.style.top = offset.x + 'px';
    fixed.style.left = offset.y + 'px';

    //Смена страниц
    //const prevItem = document.querySelector(".active");
    currActiveIndex =  Math.floor(offset.y  / window.screen.width);
    if(prevActiveIndex != currActiveIndex){
        const eventDetalis = { 
            detail:{
                prevPage: prevActiveIndex,
                currPage: currActiveIndex
            }
        };
        prevActiveIndex = currActiveIndex;

        const pageChangedEvent = new CustomEvent("pageChanged", eventDetalis);
        
        document.dispatchEvent(pageChangedEvent)
    }
});
