(function () {
    let html = document.querySelector("html")
    html.style.filter = "invert(0) hue-rotate(0deg)";
    let media = document.querySelectorAll("img, picture, video, content");

    media.forEach((mediaItem) => {
        mediaItem.style.filter = "invert(0) hue-rotate(0deg)";
    })
})();