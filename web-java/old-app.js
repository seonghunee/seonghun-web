// document.body.children[1].children[0].href = "https://google.com"

let anchorElement = document.getElementById("link-a");
anchorElement.href = "https://google.com";

// anchorElement = document.querySelector("a");
// anchorElement.href = "https://naver.com";

let newElement = document.createElement('a');
newElement.href = "https://google.com";
newElement.textContent = "link?";

let point = document.querySelector('p');

point.append(newElement);

let deleteElement = document.querySelector('h1');
deleteElement.remove();

point.parentElement.append(point);