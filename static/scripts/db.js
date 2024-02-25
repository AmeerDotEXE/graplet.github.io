const DBName = "projectsDB";
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
      const objectStore = db.createObjectStore("projects", { autoIncrement: true });
      objectStore.createIndex("name", "name", { unique: true });
    };
  });
}

