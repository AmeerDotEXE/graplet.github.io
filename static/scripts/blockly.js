Blockly.Msg.ACTION_HUE = 230;
Blockly.Msg.EVENT_HUE = 20;
Blockly.Msg.INSTANCE_HUE = 290;
Blockly.utils.colour.setHsvSaturation(0.55); 
Blockly.utils.colour.setHsvValue(0.78);  


const graplet_theme = Blockly.Theme.defineTheme('graplet', {
  'base': Blockly.Themes.Zelos,
  'startHats': true
});

Blockly.Extensions.register('dynamic_property_of',
  function() {
    children = this.getChildren()
    this.getInput('VALUE_CHILD')
      .appendField(new Blockly.FieldDropdown(
        function() {
          var options = [['...', 'NONE']];
          if (children[0] != undefined){
            console.log(children[0].type);
          }
          return options;
        }), 'VALUE');
  });
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
    startScale: 1.0,
    maxScale: 3,
    minScale: 0.3,
    scaleSpeed: 1.2,
    pinch: true
  },
  trashcan: true 
});
console.info('Blockly injected.');


var startBlocks = {"blocks":{"languageVersion":0,"blocks":[{"type":"client_login","id":"W]+YQB9c8EXGo{55avcc","x":-250,"y":-50,"inputs":{"LOGIN_INPUT":{"block":{"type":"variables_get","id":"M*w6UlN]/ttQE]y}qnJS","fields":{"VAR":{"id":"([95,9S@^5D.rAd}^;Eq"}}}},"TOKEN_INPUT":{"shadow":{"type":"text","id":"|@6%N7yiXT]2~x/#NZxw","fields":{"TEXT":"Your token here"}}}}},{"type":"project_run","id":"ho[i1|7%4!).j8MJMGql","x":-250,"y":-290,"next":{"block":{"type":"variables_set","id":"r4G!Rnm53_Cg#EraEOQi","fields":{"VAR":{"id":"([95,9S@^5D.rAd}^;Eq"}},"inputs":{"VALUE":{"block":{"type":"client","id":"Qlz;Va*T?S.3jfxc5p[|"}}}}}},{"type":"once","id":",C|sS|}n`-at928~}:#B","x":-250,"y":-150,"inputs":{"EVENT":{"block":{"type":"clientready","id":"E)))C#-c5*-)J%d[lK8@"}}}}]},"variables":[{"name":"client","id":"([95,9S@^5D.rAd}^;Eq"}]};
Blockly.serialization.workspaces.load(startBlocks, Workspace);


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

function updateCode(event) {
  if (Workspace.isDragging()) return; // Don't update while changes are happening.
  if (!supportedEvents.has(event.type)) return;

  const code = javascript.javascriptGenerator.workspaceToCode(Workspace);
  document.getElementById('generated-code').textContent =  `const { Client, Events, GatewayIntentBits } = require('discord.js');\n${code}`;
}
Workspace.addChangeListener(updateCode);

