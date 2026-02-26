const buttonElem = document.querySelector(".clickMe") as HTMLButtonElement;
const bodyElem: HTMLElement = document.body;
let isWhite: boolean = false;


buttonElem.addEventListener("click", (): void => {
    
    console.log("I am clicked");
    

    if (isWhite) {
        bodyElem.style.backgroundColor = "";
    } else {
        bodyElem.style.backgroundColor = "#CEDEBD";
    }

    isWhite = !isWhite;

});

console.log("Hello, I am working");

