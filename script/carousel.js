const URL = "./projects/projects.json";

let content = [];


let index=0;
let totalItems= content.length;

function main() {
    SetupButtons()
    fetchProjects()
}

function fetchProjects() {
    fetch(URL)
    .then(response => response.json())
    .then(data => updateProjects(data))
    .catch(error => console.log(error))
}

function updateProjects(projects) {
    content = projects;
    totalItems = projects.length;
    generateCarousel();
    render();
    setProjectButton()
}


function render() {
    let items = document.getElementsByClassName("carousel-item");

    let width = items[0].offsetWidth;
    for (let i = 0; i < items.length; i++){
        let item = items[i];

        item.style.left = (width * i) + "px";
    }
}

function SetupButtons() {
    let left = document.getElementsByClassName("scroll-left")[0]
    let right = document.getElementsByClassName("scroll-right")[0]

    left.addEventListener("click",scrollLeft)
    right.addEventListener("click",scrollRight)
    console.log("hello")
}

function generateCarouselComponent(carI) {
    let item= document.createElement("div");

    item.id = "car-" + carI;
    item.classList.add("carousel-item");

    return item;
}

function generateImage(imageURL){
    let image = document.createElement("img")

    image.src = imageURL;

    return image;

}

function generateCarousel(){
    let carousel = document.getElementById("carousel-body")

    for (let i=0; i<content.length; i++) {
        let project = content[i];
        let element = generateCarouselComponent(i)
        let image = generateImage(project.image)

        element.appendChild(image);
    }
}

function scrollLeft() {
    index -= 1
    if (index < 0){
        index = totalItems + index;
    }
    let element = document.getElementById("car-" + index)
    element.scrollIntoView();

    setProjectButton();
}

function scrollRight() {
    index += 1
    if (index >= totalItems){
        index = totalItems - index;
    }
    let element = document.getElementById("car-" + index)
    element.scrollIntoView();

    setProjectButton();
}

window.addEventListener("load",main)



function setProjectButton(){
    let link = document.getElementById("project_link")
    let button = document.getElementById("project_button")

    let project = content[index];

    link.href = project.link;
    button.innerHTML = project.title;
}