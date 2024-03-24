var ProjectIDRoot = window.location.hash.substring(1);

if (ProjectIDRoot){
  openDatabase()
    .then(db => {
      console.log("Database opened successfully on ID Check:", db);
      const transaction = db.transaction(["projects"]);
      const objectStore = transaction.objectStore("projects");
      const request = objectStore.get(parseInt(ProjectIDRoot));
      request.onerror = (event) => {
        alert("There was an error retrieving Data.");
        console.error(event);
      };
      request.onsuccess = (event) => {
        if (event.target.result == null){
          window.location.href = 'projects.html';
        }
        };
    })
    .catch(error => {
      console.error("Error opening database:", error);
  });
}

function download() {
  const state = Blockly.serialization.workspaces.save(Workspace);
  const jsonString = JSON.stringify(state, null, 2);
  const projectName = document.getElementById("projectName").value;
  const fileName = projectName + ".json";
  const blob = new Blob([jsonString], {
    type: "application/json"
  });
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

    reader.onload = function(event) {
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
  var ProjectID = window.location.hash.substring(1);
  console.log('ProjectID Before: ' + ProjectID)
  openDatabase()
    .then(db => {
      if (ProjectID != ProjectIDRoot) {
        alert('The current ProjectID hash doesnt correspond the root ID.');
        return;
      } else if (ProjectID == "") {
        console.log("Database opened successfully on Save:", db);
        // DB Action

        const transaction = db.transaction(["projects"], "readwrite");
        transaction.oncomplete = (event) => {
          console.log("All done!");
        };

        transaction.onerror = (event) => {
          if (event.target.error.name == 'ConstraintError') {
            alert(`A project named ${projectName} already exists.`);
          }
          console.error(event)
        };
        const projectName = document.getElementById('projectName').value;
        if (projectName == 'Untitled') {
          alert("The project can't be named Untitled");
          return;
        }
        if (projectName.replace(/\s/g, '') == '') {
          alert("The project name can't be blank.");
          return;
        }
        const project = {
          name: projectName,
          blocks: JSON.stringify(Blockly.serialization.workspaces.save(Workspace), null, 2)
        };

        const objectStore = transaction.objectStore("projects");
        const request = objectStore.add(project);
        request.onsuccess = (event) => {
          HasChanges = false;
          ProjectID = ProjectIDRoot = event.target.result;
          window.location.hash = '#' + ProjectID;
          console.log('ProjecID after: ' + ProjectID)
          const defaultSvg = document.getElementById('save-default');
          const successSvg = document.getElementById('save-success');
          const labelSave = document.getElementById('save-label');
          labelSave.textContent = 'Created!';
          successSvg.style.display = 'flex';
          defaultSvg.style.display = 'none';
          setTimeout(() => {
            successSvg.style.display = 'none';
            defaultSvg.style.display = 'flex';
            labelSave.textContent = 'Save locally';
          }, "2000");
        };

      } else {
        const objectStore = db
          .transaction(["projects"], "readwrite")
          .objectStore("projects");
        const request = objectStore.get(parseInt(ProjectIDRoot));
        request.onerror = (event) => {
          alert("There was an error retrieving the existing Database.");
          console.error(event)
        };
        request.onsuccess = (event) => {
          const data = event.target.result;
          const projectName = document.getElementById('projectName').value;
          if (projectName == 'Untitled') {
            alert("The project can't be named Untitled");
            return;
          }
          if (projectName.replace(/\s/g, '') == '') {
            alert("The project name can't be blank.");
            return;
          }
          data.blocks = JSON.stringify(Blockly.serialization.workspaces.save(Workspace), null, 2);
          data.name = projectName;
          
          const requestUpdate = objectStore.put(data);
          requestUpdate.onerror = (event) => {
            alert("There was an error updating Database.");
            console.error(event);
          };
          requestUpdate.onsuccess = (event) => {
            HasChanges = false;
            const defaultSvg = document.getElementById('save-default');
            const successSvg = document.getElementById('save-success');
            const labelSave = document.getElementById('save-label');
            labelSave.textContent = 'Saved!';
            successSvg.style.display = 'flex';
            defaultSvg.style.display = 'none';
            setTimeout(() => {
              successSvg.style.display = 'none';
              defaultSvg.style.display = 'flex';
              labelSave.textContent = 'Save locally';
            }, "2000");
          };
        };
      }
    })
    .catch(error => {
      console.error("Error opening database:", error);
    });
}




async function DownloadArchive() {
  const code = document.getElementById('generated-code').value;
  const projectName = document.getElementById("projectName").value;

  const zip = new JSZip();
  const e = document.getElementById('code-lang');
  var value = e.options[e.selectedIndex].value;
  zip.file(`bot.${value}`, code);
  const content = await zip.generateAsync({ type: "blob" });
  const zipBlob = new Blob([content]);
  const zipUrl = URL.createObjectURL(zipBlob);
  const link = document.createElement("a");
  link.href = zipUrl;
  link.download = `${projectName}.zip`;
  link.click();
}

function CopyRaw() {
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

function saveUrlImg(imgUrl) {
  var ProjectID = window.location.hash.substring(1);

  if (ProjectID != ProjectIDRoot) {
    alert('The current ProjectID hash does not correspond to the root ID.');
    return;
  } else if (ProjectID === "") {
    alert('You must save the project first before updating the project image.');
    return;
  }

  if (/\.(jpeg|jpg|gif|png|bmp|svg)$/i.test(imgUrl)) {
    openDatabase()
      .then(db => {
        const objectStore = db.transaction(["projects"], "readwrite").objectStore("projects");
        const request = objectStore.get(parseInt(ProjectIDRoot));

        request.onerror = (event) => {
          alert("There was an error retrieving the existing Database.");
          console.error(event);
        };

        request.onsuccess = (event) => {
          const data = event.target.result;
          data.image = imgUrl;

          const requestUpdate = objectStore.put(data);

          requestUpdate.onerror = (event) => {
            alert("There was an error updating Database.");
            console.error(event);
          };

          requestUpdate.onsuccess = (event) => {
            const projectIcon = document.getElementById('project-icon');
            projectIcon.src = imgUrl;
            const labelSave = document.getElementById('save-img');
            labelSave.textContent = 'Saved!';
            setTimeout(() => {
              labelSave.textContent = 'Save';
            }, 2000);
          };
        };
      })
      .catch(error => {
        console.error("Error opening database:", error);
      });
  } else {
    alert('Invalid image URL.\nThe URL must end with .jpeg, .jpg, .gif, .png, .bmp, or .svg.');
  }
}


function deleteProject(){
  var ProjectID = window.location.hash.substring(1);
  if (ProjectID != ProjectIDRoot) {
    alert('The current ProjectID hash does not correspond to the root ID.');
    return;
  } else if (ProjectID === "") {
    alert('No project has been created yet. Leaving will abandon your unsaved project.');
    return;
  }
  var confirmation = window.confirm('You are about to delete a project. This action is irreversible.');
  if (confirmation){
    openDatabase()
    .then(db => {
      const objectStore = db.transaction(["projects"], "readwrite").objectStore("projects");
      const request = objectStore.delete(parseInt(ProjectIDRoot));
      request.onsuccess = (event) =>{
        window.location.href = 'projects.html'; 
      }
      request.onerror = (event) => {
        alert("There was an error deleting the project.");
        console.error(event);
      };
    })
    .catch(error => {
      console.error("Error opening database:", error);
    });
  }
}