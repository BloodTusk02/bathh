let Scrollbar = window.Scrollbar;

const options = {
    'damping': 0.04,
    'renderByPixels': true,
};

Scrollbar.init(document.querySelector('#my-scrollbar'), options);

const navBar = document.querySelector(".navbar");
const allLi = document.querySelectorAll("li");

allLi.forEach((li, index) => {
    li.addEventListener("click" , e => {
        e.preventDefault();
        navBar.querySelector(".active").classList.remove("active");
        li.classList.add("active");
    });
});

// scrollbar.addListener(({ offset }) => {  
//     fixed.style.top = offset.y + 'px';
//     fixed.style.left = offset.x + 'px';
//   });

let fixedElem = document.querySelector('#fixed');

let scrollbar = Scrollbar.init(
    document.querySelector('#scroll')
  );
  
  scrollbar.addListener(function(status) {
     let offset = status.offset;
    
    fixed.style.top = offset.y + 'px';
    fixed.style.left = offset.x + 'px';
  });