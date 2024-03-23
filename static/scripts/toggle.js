window.onload = function(){
openDatabase()
  .then(db => {
    console.log("Database opened successfully on load theme.", db);
    const settingsStore = db
    .transaction(["settings"], "readwrite")
    .objectStore("settings");
    const request = settingsStore.get('theme');
    request.onerror = (event) => {
      console.error("There was an error retrieving data:",event);
    };
    request.onsuccess = (event) => {
      theme = event.target.result;
      if (theme == 'light'){
        ToggleMode()
      }
      
  };
  })
  .catch(error => {
    console.error("Error opening database:", error);
})};



function ToggleMode() {
    const currentColor = getComputedStyle(document.documentElement).getPropertyValue('--val');
    const newColor = currentColor === '0' ? '255' : '0';
    const theme = currentColor === '0' ? 'light' : 'dark';
    const LightObjects = document.getElementsByClassName("light-only");
    const DarkObjects = document.getElementsByClassName("dark-only");

    document.documentElement.style.setProperty('--val', newColor);

    Array.from(LightObjects).forEach(element => {
        element.style.display = newColor === '0' ? 'none' : 'block';
    });

    Array.from(DarkObjects).forEach(element => {
        element.style.display = newColor === '0' ? 'block' : 'none';
    });
    openDatabase()
    .then(db => {
      console.log("Database opened successfully on toggle mode:", db);
      const settingsStore = db
      .transaction(["settings"], "readwrite")
      .objectStore("settings");
      const request = settingsStore.get('theme');
      request.onerror = (event) => {
        alert("There was an error retrieving Data.");
        console.error(event);
      };
      request.onsuccess = (event) => {
            const settingUpdate = settingsStore.put(theme,'theme')
            settingUpdate.onerror = (event) => {
                alert("There was an error updating Database.");
                console.error(event);
            }
            settingUpdate.onsuccess = (event) => {
                console.info('Theme changed sucessfully; saved to Database.',db)
            } 
        };
    })
    .catch(error => {
      console.error("Error opening database:", error);
  });
}

