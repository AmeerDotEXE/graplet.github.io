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
  PayloadBlocks = {"blocks":{"languageVersion":0,"blocks":[{"type":"client_login","id":"znP|/(LiaAZY:`kJ){|/","x":-1070,"y":-170,"inputs":{"LOGIN_INPUT":{"block":{"type":"variables_get","id":"/A-Z*DfYw^b.D2nanFnt","fields":{"VAR":{"id":"?Jr[#_LebMSiQb?l67Te"}}}},"TOKEN_INPUT":{"shadow":{"type":"token_input","id":"MuIXy`f6901mOyF@PehH","fields":{"TOKEN":"Your token here"}}}}},{"type":"once","id":"3!Han~H{5xmaD+)N^sM|","x":-1030,"y":-350,"inputs":{"EVENT":{"block":{"type":"clientready","id":"K8[g-L/KE*X$g-3d,ZfJ"}},"CLIENT":{"block":{"type":"variables_get","id":"R.[]gGmk6xVr0+mKUqiw","fields":{"VAR":{"id":"?Jr[#_LebMSiQb?l67Te"}}}},"DO":{"block":{"type":"console_log","id":"N=*D/jc,$@aCJCNIexo5","inputs":{"LOG":{"shadow":{"type":"input","id":"x7uQI*FnB99~i~eR,fJH","fields":{"TEXT":"we have logged in!"}}}}}}}},{"type":"variables_set","id":"Msty%zgPTM8HKx]CWx8~","x":-970,"y":-430,"fields":{"VAR":{"id":"?Jr[#_LebMSiQb?l67Te"}},"inputs":{"VALUE":{"shadow":{"type":"input","id":"(kGvdg8ho9I}K96Jv2Hz","fields":{"TEXT":""}},"block":{"type":"client","id":"W|6Jc^d+eQ8@3wCSKOrw"}}}}]},"variables":[{"name":"client","id":"?Jr[#_LebMSiQb?l67Te"}]};
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
    document.getElementById('dependecy-text').innerHTML = 'Ensure you have <a href="https://nodejs.org/en">Node.js</a> installed.';
    document.getElementById('dependecy-run').innerHTML = '<li>type <code>npm install discord.js</code> to install the necessary packages</li>\n<li>Finally, run the bot using <code>node bot.js</code></li>';
    const code = javascript.javascriptGenerator.workspaceToCode(Workspace);
    output.textContent =  `const { Client, Events, GatewayIntentBits } = require('discord.js');\n${code}`;
  } else if (lang == 'py'){
    document.getElementById('dependecy-text').innerHTML = 'Ensure you have <a href="https://python.org/downloads">Python</a> installed.';
    document.getElementById('dependecy-run').innerHTML = '<li>type <code>pip install discord.py</code> to install the necessary modules</li>\n<li>Finally, run the bot using <code>python bot.py</code></li>';
    const code = python.pythonGenerator.workspaceToCode(Workspace);
    output.textContent = `import discord\n${code}`
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