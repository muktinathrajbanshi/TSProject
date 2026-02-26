const buttonElem = document.querySelector(".clickMe") as HTMLButtonElement;
const bodyElem: HTMLElement = document.body;
const isWhite: boolean = false;


buttonElem.addEventListener("click", (): void => {
    if (isWhite) {
        bodyElem.style.backgroundColor = "";
    } else {
        bodyElem.style.backgroundColor = "#CEDEBD";
    }
})

console.log("Hello, I am working");

