if (typeof window !== "undefined") {
    const button = document.querySelector(".button");
    const circle = document.querySelector(".circle");
    const applyAll = document.querySelector(".checkbox");
    
    applyAll.addEventListener("change", () => {
        if (applyAll.checked == true) {
            // console.log("checked");
            applyAll.checked = true;
            localStorage.setItem("all", true);
        } else {
            // console.log("unchecked");
            applyAll.checked = false;
            localStorage.setItem("all", false);
        }
        
    });
    

    (async function () {
        const tabID = await getCurrentTabID();
        const url = await getCurrentTabURL();
        const isYouTube = checkYouTubeUrl(url);
        
        let prevState = localStorage.getItem("buttonOn");

        if (localStorage.getItem("all") == "true") {
            applyAll.checked = true;
            prevState = localStorage.getItem("buttonOn");
        } else {
            applyAll.checked = false;
            prevState = localStorage.getItem(`${tabID}`);
        }
        if (prevState === "true") {
            circle.style.animation = "moveCircleRight forwards";
            button.style.animation = "backgroundPurple forwards";


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
            circle.style.animation = "moveCircleLeft forwards";
            button.style.animation = "backgroundBlue forwards";
            
            if (isYouTube) {
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
    })();



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

    
    
    button.addEventListener("click", async () => {
        const tabID = await getCurrentTabID();
        const url = await getCurrentTabURL();
        const isYouTube = checkYouTubeUrl(url);
        // console.log(url);
        // console.log(isYouTube);
        let buttonOn = null;
        if (!applyAll) {
            buttonOn = localStorage.getItem(`${tabID}`);
        } else {
            buttonOn = localStorage.getItem("buttonOn");
        }
        // let buttonOn = localStorage.getItem("buttonOn");
        
        if (buttonOn === "false") {
            buttonOn = true;
            localStorage.setItem("buttonOn", true);
            localStorage.setItem(`${tabID}`, true);

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
            localStorage.setItem("buttonOn", false);
            localStorage.setItem(`${tabID}`, false);
            circle.style.animation = "moveCircleLeft 0.5s forwards";
            button.style.animation = "backgroundBlue 0.5s forwards";
            
            if (isYouTube) {
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