Blockly.Msg.ACTION_HUE = 230;
Blockly.Msg.EVENT_HUE = 20;
Blockly.Msg.INSTANCE_HUE = 290;
Blockly.utils.colour.setHsvSaturation(0.55); 
Blockly.utils.colour.setHsvValue(0.78);  
Blockly.FieldCheckbox.CHECK_CHAR = '✔'


let HasChanges = false;

const graplet_theme = Blockly.Theme.defineTheme('graplet', {
  'base': Blockly.Themes.Zelos,
  'startHats': true,
});

djsInstanceDict = {
  'Client' : ['Guilds','User','Channels','Shard'],

}

Blockly.Extensions.register('dynamic_property_of', function() {
  this.getInput('VALUE_CHILD').appendField(new Blockly.FieldDropdown(function() {
    var options = [['...', 'NONE']];
    var child = this.getChildren()[0];
    if (child && djsInstanceDict[child.outputConnection.check]) {
      options = options.concat(djsInstanceDict[child.outputConnection.check].map(function(property) {
        return [property,property.toUpperCase()];
      }));
    }
    return options;
  }.bind(this)), 'VALUE');
});


Blockly.Blocks['channel_action'] = channelActions
Blockly.Blocks['message_action'] = messageActions
Blockly.Blocks['role_action'] = roleActions
  
Blockly.Extensions.registerMutator(
  'embed_builder_mutator',embed_builder_method,undefined,[]);

var Workspace = Blockly.inject("blocklyDiv", { 
  renderer: "zelos",
  theme: graplet_theme,
  toolbox: toolbox,
  sounds: false,
  grid:{
    spacing: 20,
    length: 1,
    colour: '#ccc',
    snap: true
  },
  zoom: {
    controls: true,
    wheel: true,
    startScale: 0.85,
    maxScale: 3,
    minScale: 0.3,
    scaleSpeed: 1.2,
    pinch: true
  },
  trashcan: true 
});

console.info('Blockly injected.');

const options = {
  contextMenu: true,
  shortcut: true,
};

const copypaste = new CrossTabCopyPaste();
copypaste.init(options, () => {
  console.log('Copy paste plugin initiated.');
});

let PayloadBlocks;
if (ProjectIDRoot != '') {
  console.info("Loading ProjectID: " + ProjectIDRoot);
  openDatabase()
  .then(db => {
    console.log("Database opened successfully on Blockly:", db);
    // DB Action
    const transaction = db.transaction('projects')
      .objectStore('projects')
      .get(parseInt(ProjectIDRoot));
    transaction.onerror = (event) => {
      alert("There was an Error retrieving from IndexedDB");
      console.error(event);
      PayloadBlocks = {};
    };
    transaction.onsuccess = (event) => {
      const Project = event.target.result;
      PayloadBlocks = JSON.parse(Project.blocks);
      Blockly.serialization.workspaces.load(PayloadBlocks, Workspace);
      document.getElementById('projectName').value = Project.name;
      document.getElementById('img-input').value = Project.image;
      if (Project.image){
        document.getElementById('project-icon').src = Project.image;
      }
      // Add image load later ( still null for now )
      console.info("Loaded!");
    };
  })
  .catch(error => {
    console.error("Error opening database:", error);
  });


} else {
  console.info("New Project Initiated. Default Blocks loading.");
  PayloadBlocks = {"blocks":{"languageVersion":0,"blocks":[{"type":"client_login","id":".Q2+Vk+g`%qlZ5OEa;;_","x":-70,"y":430,"inputs":{"LOGIN_INPUT":{"block":{"type":"variables_get","id":"Wv`^}*/U7~yuYB;ajLzU","fields":{"VAR":{"id":"eQu:H?#u)Uu?a*E?7+??"}}}},"TOKEN_INPUT":{"shadow":{"type":"input","id":"F[rIyj-k[r*-7l#itoE]","fields":{"TEXT":"Your token here"}}}}},{"type":"once","id":"-b+q1;OCmJ]CAq,|0)p;","x":-70,"y":250,"inputs":{"CLIENT":{"block":{"type":"variables_get","id":"8An!FFT/5h/29,Z2|#^p","fields":{"VAR":{"id":"eQu:H?#u)Uu?a*E?7+??"}}}},"EVENT":{"block":{"type":"clientready","id":"ILv-1S+I9DF*)pD~?,Fg"}},"DO":{"block":{"type":"console_log","id":"*tzh|)MK9iGx09Rp$|_B","inputs":{"LOG":{"shadow":{"type":"input","id":"qy+}+eBfL9XZA!C|!-Eg","fields":{"TEXT":"client is ready!"}}}}}}}},{"type":"variables_set","id":"!ee1zJ|6-jLm;J_7mDQ+","x":-70,"y":150,"fields":{"VAR":{"id":"eQu:H?#u)Uu?a*E?7+??"}},"inputs":{"VALUE":{"block":{"type":"client","id":"tz55?Z6?_c`WP:mvN$ir"}}}}]},"variables":[{"name":"client","id":"eQu:H?#u)Uu?a*E?7+??"}]};
  Blockly.serialization.workspaces.load(PayloadBlocks, Workspace);
}



class CustomCategory extends Blockly.ToolboxCategory {
    constructor(categoryDef, toolbox, opt_parent) {
      super(categoryDef, toolbox, opt_parent);
    }
    addColourBorder_(colour){
        this.rowDiv_.style.backgroundColor = colour;
    }
  }

var BlocklyLabels = document.getElementsByClassName('blocklyTreeLabel');

Array.from(BlocklyLabels).forEach(function(element) {
  element.style.fontFamily = 'Fredoka', 'sans-serif';
});

Blockly.registry.register(
    Blockly.registry.Type.TOOLBOX_ITEM,
    Blockly.ToolboxCategory.registrationName,
    CustomCategory, true);



const supportedEvents = new Set([
  Blockly.Events.BLOCK_CHANGE,
  Blockly.Events.BLOCK_CREATE,
  Blockly.Events.BLOCK_DELETE,
  Blockly.Events.BLOCK_MOVE,
]);

function codeUpdateListener(event) {
  if (Workspace.isDragging()) return; // Don't update while changes are happening.
  if (!supportedEvents.has(event.type)) return;
  const e = document.getElementById('code-lang');
  var value = e.options[e.selectedIndex].value;
  HasChanges = true;
  updateCode(value);
 }


function updateCode(lang){
  HasChanges = true;
  const output = document.getElementById('generated-code')
  if (lang == 'js'){
    document.getElementById('dependecy-text').innerHTML = 'Install the JavaScript <a href="https://nodejs.org/en">Node.js</a> Runtime';
    const code = javascript.javascriptGenerator.workspaceToCode(Workspace);
    output.textContent =  `// Javascript\nconst { Client, Events, GatewayIntentBits } = require('discord.js');\n${code}`;
  } else if (lang == 'py'){
    document.getElementById('dependecy-text').innerHTML = 'Install the lastest version of <a href="https://python.org/downloads">Python</a>';
    const code = python.pythonGenerator.workspaceToCode(Workspace);
    output.textContent = `# Python\nimport discord\n${code}`
  }
} 

Workspace.addChangeListener(codeUpdateListener);

Workspace.addChangeListener(event => {
  if (event.type === Blockly.Events.FINISHED_LOADING) {
    console.log('Finished loading!')
    HasChanges = false;
  }
});


window.addEventListener("beforeunload", function(event) {
  if (HasChanges == true){
    var confirmation = window.confirm();
    if (!confirmation){
      event.preventDefault();
    }
  }
});

function SwitchLanguage(lang){
  updateCode(lang)
}