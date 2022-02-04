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
const menuItems = document.querySelector("#fixed > ul:nth-child(1)").children;

allLi.forEach((li, index) => {
    li.addEventListener("click" , e => {
        e.preventDefault();
        navBar.querySelector(".active").classList.remove("active");
        li.classList.add("active");
    });
});

//Events
document.addEventListener("pageChanged", (e) => {
    menuItems[e.detail.prevPage].classList.remove('active');
    menuItems[e.detail.currPage].classList.add('active');
});

if (document.documentElement.clientWidth > 600) {
    var baseOffsetLeft = fixed.offsetLeft;
    var baseOffsetTop = fixed.offsetTop;
    let prevActiveIndex = Math.floor(scrollbar.offset.y  / window.screen.width + 0.5);

    //Вроде как это будет срабатывать при любом изменении состояния скроллбара
    scrollbar.addListener(function(status) {
        let offset = status.offset;

        fixed.style.top = (offset.x + baseOffsetTop).toString() + 'px';
        fixed.style.left = (offset.y + baseOffsetLeft).toString() + 'px';

        //Смена страниц
        currActiveIndex =  Math.floor(offset.y  / window.screen.width + 0.5);
        if(prevActiveIndex != currActiveIndex) {
            const eventDetalis = { 
                detail:{
                    prevPage: prevActiveIndex,
                    currPage: currActiveIndex
                }
            };
            prevActiveIndex = currActiveIndex;

            const pageChangedEvent = new CustomEvent("pageChanged", eventDetalis);
            
            document.dispatchEvent(pageChangedEvent);
        }
    });
} else {
    let prevActiveIndex = Math.floor(scrollbar.offset.y  / window.screen.height + 0.5);

    scrollbar.addListener(function(status) {
        let offset = status.offset;

        //Смена страниц
        currActiveIndex =  Math.floor(offset.y  / window.screen.height + 0.5);
        if(prevActiveIndex != currActiveIndex){
            const eventDetalis = { 
                detail:{
                    prevPage: prevActiveIndex,
                    currPage: currActiveIndex
                }
            };
            prevActiveIndex = currActiveIndex;

            const pageChangedEvent = new CustomEvent("pageChanged", eventDetalis);
            
            document.dispatchEvent(pageChangedEvent);
        }
    });
}