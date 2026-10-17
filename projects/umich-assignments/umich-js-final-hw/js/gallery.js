function upDate(previewPic) {
    console.log("Event triggered: upDate");
    console.log("Alt text: " + previewPic.alt);
    console.log("Image source: " + previewPic.src);

    let displayDiv = document.getElementById("image");

    displayDiv.innerHTML = previewPic.alt;
    displayDiv.style.backgroundImage = "url('" + previewPic.src + "')";
}

function unDo() {
    console.log("Event triggered: unDo");
    let displayDiv = document.getElementById("image");

    displayDiv.style.backgroundImage = "url('')";
    displayDiv.textContent = "Hover over an image below to display here.";
}


function addTabFocus() {
    console.log("Initialization: Adding tabindex to images.");
    let previews = document.querySelectorAll(".preview");

    for (let i = 0; i < previews.length; i++) {
        previews[i].setAttribute("tabindex", "0");
        console.log("Added tabindex to image index: " + i);
    }
}