const DBName = "GrapletDB";
const DBVersion = 1;

function openDatabase() {
  return new Promise((resolve, reject) => {
    const connection = indexedDB.open(DBName, DBVersion);

    connection.onerror = function(event) {
      reject("Database error: " + event.target.errorCode);
    };

    connection.onsuccess = function(event) {
      resolve(event.target.result);
    };

    connection.onupgradeneeded = function(event) {
      const db = event.target.result;
      const ProjectStore = db.createObjectStore("projects", {keyPath: 'id', autoIncrement: true });
      const SettingsStore = db.createObjectStore("settings");
      ProjectStore.createIndex("name", "name", { unique: true });
      SettingsStore.createIndex("cache","cache")
      SettingsStore.createIndex("theme","theme")
    };
  });
}

