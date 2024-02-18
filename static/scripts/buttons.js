function download() {
    const state = Blockly.serialization.workspaces.save(Workspace);
    const jsonString = JSON.stringify(state, null, 2);
    const projectNameInput = document.getElementById("projectName");
    const projectName = projectNameInput.textContent;
    const fileName = projectName + ".json";
    const blob = new Blob([jsonString], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(a.href);
}
function upload() {
    const fileInput = document.getElementById("fileInput");
    fileInput.value = null;
    fileInput.click();
}

function handleFileInput() {
    const fileInput = document.getElementById("fileInput");
    const projectNameInput = document.getElementById("projectName");

    Blockly.getMainWorkspace().clear();

    if (fileInput.files.length > 0) {
        const selectedFile = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function (event) {
            const fileContents = event.target.result;

            try {
                const data = JSON.parse(fileContents);
                if (data.blocks) {
                    Blockly.serialization.workspaces.load(data, Workspace);
                    console.log("Loaded JSON data:", data);

                    const fileNameWithoutExtension = selectedFile.name.replace(/\.[^/.]+$/, "");
                    projectNameInput.value = fileNameWithoutExtension;
                } else {
                    console.log("Invalid project data.");
                }
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        };

        reader.readAsText(selectedFile);
    } else {
        console.error("No file selected");
    }
}
document.getElementById("fileInput").addEventListener("change", handleFileInput);

function save() {
    alert('in progress.')
    // do indexedDB here AUTO SAVE AFTER 2 MINS
}


function DownloadJS() {
    var JSContent = document.getElementById('generated-code').value;
    var blob = new Blob([JSContent], { type: 'text/javascript' });
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'bot.js';
    link.click();
}

function CopyRawJS() {
    var JSContent = document.getElementById('generated-code').value;
    copyElement = document.getElementById('copy-element');
    navigator.clipboard.writeText(JSContent)
        .then(() => {
            console.log('Copied to clipboard!');
            copyElement.textContent = 'Copied!'
            setTimeout(() => {
                copyElement.textContent = 'Copy raw ';
            }, 1000);
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
            copyElement.textContent = 'Failed to copy.'
            setTimeout(() => {
                copyElement.textContent = 'Copy raw '; 
            }, 1000); 
        });
}