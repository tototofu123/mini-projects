function upDate(previewPic) {
    console.log("Event triggered: upDate");
    console.log("Alt text: " + previewPic.alt);
    console.log("Image source: " + previewPic.src);

    let displayDiv = document.getElementById("image");

    displayDiv.innerHTML = previewPic.alt;
    displayDiv.style.backgroundImage = "url('" + previewPic.src + "')";
}

function unDo() {
    let displayDiv = document.getElementById("image");

    displayDiv.style.backgroundImage = "url('')";
    displayDiv.textContent = "Hover over an image below to display here.";
}