if (typeof window !== "undefined") {
    const button = document.querySelector(".button");
    const circle = document.querySelector(".circle");

    async function getCurrentTabID() {
        return new Promise((resolve) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            resolve(tabs[0].id);
        });
        });
    }

    async function getCurrentTabURL() {
        return new Promise((resolve) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            resolve(tabs[0].url);
        });
        });
    }

    function checkYouTubeUrl(url) {
        if (url != undefined || url != '') {
            var regExp = /^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.be)\/(.+)?$/;

            var match = url.match(regExp);
            // console.log(match);
            if (match && match[2].length == 15) {
                // Do anything for being valid
                return true;
            }
            else {
                // Do anything for not being valid
                return false;
            }
        }
    }
    

    let buttonOn = false;
    button.addEventListener("click", async () => {
        const tabID = await getCurrentTabID();
        const url = await getCurrentTabURL();
        const isYouTube = checkYouTubeUrl(url);
        // console.log(url);
        // console.log(isYouTube);
        if (!buttonOn) {

            buttonOn = true;
            circle.style.animation = "moveCircleRight 0.5s forwards";
            button.style.animation = "backgroundPurple 0.5s forwards";
            
            if (isYouTube) {
                chrome.scripting.executeScript({
                    target: {tabId: tabID, allFrames: true},
                    files: ["appOnY.js"]
                });
            } else {
                chrome.scripting.executeScript({
                    target: {tabId: tabID, allFrames: true},
                    files: ["appOn.js"]
                });
            }

        } else {
            buttonOn = false;
            circle.style.animation = "moveCircleLeft 0.5s forwards";
            button.style.animation = "backgroundBlue 0.5s forwards";
            
            if (isYouTube) {
                console.log("turning off dark mode")

                chrome.scripting.executeScript({
                    target: {tabId: tabID, allFrames: true},
                    files: ["appOffY.js"]
                });
            } else {
                chrome.scripting.executeScript({
                    target: {tabId: tabID, allFrames: true},
                    files: ["appOff.js"]
                });
            }
        }
    });
}