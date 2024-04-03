Blockly.defineBlocksWithJsonArray([
{
  type: 'field_date',
  message0: 'date: %1',
  args0: [
    {
      type: 'field_date',
      name: 'FIELDNAME',
      date: '2020-02-20',
    },
  ],
  "inputsInline": true,
  "colour": "%{BKY_INSTANCE_HUE}",
  "output" : "String"
},
{
  type: 'colour_hsv_sliders',
  message0: 'hsv %1',
  args0: [
    {
      type: 'field_colour_hsv_sliders',
      name: 'COLOUR',
      colour: '#ff0000',
    },
  ],
  output: 'Colour',
  style: 'colour_blocks',
},
{
  "type": "input",
  "message0": "%1",
  "args0": [
    {
      "type": "field_input",
      "name": "TEXT",
      "text": ""
    }
  ],
  "output": "String",
  "colour": 0,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "terminal_log",
  "message0": "log in console %1",
  "args0": [
    {
      "type": "input_value",
      "name": "LOG"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": '#ffbf2b',
  "tooltip": "Outputs a message or value to the console for debugging or informational purposes.",
  "helpUrl": ""
},  
{
  "type": "once",
  "message0": "once %1 %2",
  "args0": [
    {
      "type": "input_value",
      "name": "EVENT",
      "check": "Boolean"
    },
    {
      "type": "input_statement",
      "name": "DO"
    }
  ],
  "inputsInline": true,
  "colour": '%{BKY_EVENT_HUE}',
  "tooltip": "Executes only once when the specified condition becomes true.",
  "helpUrl": ""
},
{
  "type": "channel_event",
  "message0": "channel %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "EVENT",
      "options": [
        [
          "created",
          "CREATE"
        ],
        [
          "updated",
          "UPDATE"
        ],
        [
          "deleted",
          "DELETE"
        ],
        [
          "pins update",
          "PINS_UPDATE"
        ]
      ]
    }
  ],
  "inputsInline": true,
  "output": "Boolean",
  "colour": '%{BKY_EVENT_HUE}',
  "tooltip": "Represents a boolean value indicating whether an action related to channel creation, updating (editing), deletion, or pin updates has occurred.",
  "helpUrl": ""
},
{
  "type": "guild_emoji_event",
  "message0": "emoji %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "EVENT",
      "options": [
        [
          "created",
          "CREATE"
        ],
        [
          "updated",
          "UPDATE"
        ],
        [
          "deleted",
          "DELETE"
        ]
      ]
    }
  ],
  "inputsInline": true,
  "output": "Boolean",
  "colour": '%{BKY_EVENT_HUE}',
  "tooltip": "Represents a boolean value indicating whether an action related to emoji creation, update, or deletion has occurred.",
  "helpUrl": ""
},
{
  "type": "guild_event",
  "message0": "server %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "EVENT",
      "options": [
        [
          "updated",
          "UPDATE"
        ],
        [
          "available",
          "AVAILABLE"
        ],
        [
          "unavailable",
          "UNAVAILABLE"
        ]
      ]
    }
  ],
  "inputsInline": true,
  "output": "Boolean",
  "colour": '%{BKY_EVENT_HUE}',
  "tooltip": "Represents a boolean value indicating whether an action between bot and a server has occurred.",
  "helpUrl": ""
},
{
  "type": "bot_guild_event",
  "message0": "bot %1 server",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "EVENT",
      "options": [
        [
          "joins",
          "JOIN"
        ],
        [
          "leaves",
          "REMOVE"
        ],
      ]
    }
  ],
  "inputsInline": true,
  "output": "Boolean",
  "colour": '%{BKY_EVENT_HUE}',
  "tooltip": "Represents a boolean value indicating whether the bot gets added or removed from a server.",
  "helpUrl": ""
},
{
  "type": "guild_sticker_event",
  "message0": "sticker %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "EVENT",
      "options": [
        [
          "created",
          "CREATE"
        ],
        [
          "updated",
          "UPDATE"
        ],
        [
          "deleted",
          "DELETE"
        ]
      ]
    }
  ],
  "inputsInline": true,
  "output": "Boolean",
  "colour": '%{BKY_EVENT_HUE}',
  "tooltip": "Represents a boolean value indicating whether an action related to server emoji creation, update, or deletion has occurred.",
  "helpUrl": ""
},
{
  "type": "guild_member_moderate_event",
  "message0": "member %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "EVENT",
      "options": [
        [
          "banned",
          "BAN"
        ],
        [
          "unbanned",
          "UNBAN"
        ],
      ]
    }
  ],
  "inputsInline": true,
  "output": "Boolean",
  "colour": '%{BKY_EVENT_HUE}',
  "tooltip": "Represents a boolean value indicating whether a member was banned or unbanned.",
  "helpUrl": ""
},
{
  "type": "guild_member_event",
  "message0": "member %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "EVENT",
      "options": [
        [
          "joined",
          "ADD"
        ],
        [
          "updated",
          "UPDATE"
        ],
        [
          "left",
          "REMOVE"
        ],
        [
          "available",
          "AVAILABLE"
        ]
      ]
    }
  ],
  "inputsInline": true,
  "output": "Boolean",
  "colour": '%{BKY_EVENT_HUE}',
  "tooltip": "Represents a boolean value indicating whether an action related to server members has occurred.",
  "helpUrl": ""
},
{
  "type": "guild_role_event",
  "message0": "role %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "EVENT",
      "options": [
        [
          "created",
          "CREATE"
        ],
        [
          "updated",
          "UPDATE"
        ],
        [
          "deleted",
          "DELETE"
        ]
      ]
    }
  ],
  "inputsInline": true,
  "output": "Boolean",
  "colour": '%{BKY_EVENT_HUE}',
  "tooltip": "Represents a boolean value indicating whether an action related to server role creation, update, or deletion has occurred.",
  "helpUrl": ""
},
{
  "type": "guild_scheduled_event_event",
  "message0": "scheduled event %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "EVENT",
      "options": [
        [
          "created",
          "CREATE"
        ],
        [
          "updated",
          "UPDATE"
        ],
        [
          "deleted",
          "DELETE"
        ],
        [
          "member interested",
          "USER_ADD"
        ],
        [
          "member uninterested",
          "USER_REMOVE"
        ]
      ]
    }
  ],
  "inputsInline": true,
  "output": "Boolean",
  "colour": '%{BKY_EVENT_HUE}',
  "tooltip": "Represents a boolean value indicating whether an action related to server members has occurred.",
  "helpUrl": ""
},
{
  "type": "botready",
  "message0": "bot is ready",
  "output": "Boolean",
  "colour": '%{BKY_EVENT_HUE}',
  "tooltip": "Triggers when the Discord bot is fully ready and connected to the server.",
  "helpUrl": ""
},
{
  "type": "change_guild_name",
  "message0": "change name of guild %1 to %2",
  "args0": [
    {
      "type": "input_value",
      "name": "GUILD",
      "check": "Guild"
    },
    {
      "type": "input_value",
      "name": "NAME"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": '%{BKY_ACTION_HUE}',
  "tooltip": "Changes the name of a given Guild.",
  "helpUrl": ""
},
{
  "type": "embed_builder",
  "message0": "Embed Builder %1",
  "args0": [
    {
      "type": "input_dummy"
    },
  ],
  "mutator" : 'embed_builder_mutator',
  "inputsInline": false,
  "output": null,
  "colour": '%{BKY_INSTANCE_HUE}',
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "instances_options_embed_mutator",
  "message0": "Description: %1 %2 Title %3 %4 Color %5 %6 Author %7 %8 Footer %9",
  "args0": [
    {
      "type": "field_checkbox",
      "name": "DESCRIPTION",
      "checked": false
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_checkbox",
      "name": "TITLE",
      "checked": false
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_checkbox",
      "name": "COLOUR",
      "checked": false
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_checkbox",
      "name": "AUTHOR",
      "checked": false
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_checkbox",
      "name": "FOOTER",
      "checked": false
    }
  ],
  "colour": '%{BKY_INSTANCE_HUE}',
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "response_reply",
  "message0": "%1 %2 with %3",
  "args0": [
    {
      "type": "field_label_serializable",
      "name": "STATUS",
      "text": "reply to message"
    },
    {
      "type": "input_value",
      "name": "MESSAGE",
      "check": "Message"
    },
    {
      "type": "input_value",
      "name": "CONTENT"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": '%{BKY_ACTION_HUE}',
  "tooltip": "Replies to a message.",
  "helpUrl": ""
},
{
  "type": "bulk_delete",
  "message0": "in channel %1 purge %2 messages",
  "args0": [
    {
      "type": "input_value",
      "name": "CHANNEL",
      "check": "Channel"
    },
    {
      "type": "input_value",
      "name": "AMOUNT",
      "check": "Number"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": '%{BKY_ACTION_HUE}',
  "tooltip": "Deletes a given amount of messages in a Channel.",
  "helpUrl": ""
},
{
  "type": "message_event",
  "message0": "message %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "EVENT",
      "options": [
        [
          "sent",
          "CREATE"
        ],
        [
          "edited",
          "UPDATE"
        ],
        [
          "deleted",
          "DELETE"
        ]
      ]
    }
  ],
  "inputsInline": true,
  "output": "Boolean",
  "colour": '%{BKY_EVENT_HUE}',
  "tooltip": "Represents a boolean value indicating whether an action related to message creation, update, or deletion has occurred.",
  "helpUrl": ""
},
{
  "type": "message_reaction_event",
  "message0": "message reaction %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "EVENT",
      "options": [
        [
          "added",
          "ADD"
        ],
        [
          "removed",
          "REMOVE"
        ],
        [
          "removed all",
          "REMOVE_ALL"
        ]
      ]
    }
  ],
  "inputsInline": true,
  "output": "Boolean",
  "colour": '%{BKY_EVENT_HUE}',
  "tooltip": "Represents a boolean value indicating whether an action related to message reaction has occurred.",
  "helpUrl": ""
},
])


Blockly.Blocks['reaction_action'] = {
  validate: function(newValue) {
    this.getSourceBlock().updateConnections(newValue);
    return newValue;
  },
  init: function() {
    this.setInputsInline(true)
    this.setPreviousStatement(true)
    this.setNextStatement(true)
    this.setColour('%{BKY_ACTION_HUE}')
    var options = [["add","ADD"],["remove","REMOVE"],["remove all","REMOVE_ALL"]]; 
    this.appendValueInput('MESSAGE')
      .appendField('to message')
      .setCheck('Message')
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown(options,this.validate), 'TYPE')
    this.setTooltip('Removes or adds a reaction to a Message.')
    this.updateConnections('ADD')
  },
  updateConnections: function(newValue){
    this.removeInput('REACTION',true)
    this.removeInput('DUMMY',true)
    if (newValue == 'REMOVE_ALL'){
      this.appendDummyInput('DUMMY')
        .appendField('reactions')
      }else{
        parent = this.appendValueInput('REACTION')
          .setCheck('String')
          .appendField('reaction')
        if (this.rendered && Workspace && !parent.connection.targetConnection && !parent.sourceBlock.isInFlyout){
          var InputBlock = Workspace.newBlock('input')
            InputBlock.setShadow(true)
            InputBlock.initSvg()
            InputBlock.render();
          parent.connection.connect(InputBlock.outputConnection)
        }
    }
  },
}

const property_of_Dict = {
  'Message' : [['id','string'],['content','string'],['channel','Channel'],['server','Guild'],['user','User']],
  'Channel' : [['id','string'],['name','string'],['server','Guild']],
  'Guild' : [['id','string'],['name','string']],
  'User': [['id','string']],
}
Blockly.Blocks['property_of'] = {
  validate: function(newValue) {
    this.getSourceBlock().updateConnections(newValue);
    return newValue;
  },
  init: function() {
    this.setInputsInline(true)
    this.setColour('%{BKY_INSTANCE_HUE}')
    this.setOutput(true, null);
    this.setTooltip("Retrieves a specific property of an object or variable");

    this.dropdownDefaultOptions = [["...","NONE"]];
    this.appendDummyInput('VALUE_CHILD')
      .appendField('property')
      .appendField(new Blockly.FieldDropdown(this.dropdownDefaultOptions), 'VALUE');
    this.appendValueInput('VALUE_PARENT')
      .appendField('of');

    this.isFirstTimeLoading = true;
  },
  saveExtraState: function() {
    return {
      'propertyOptions': this.latestOptionsValues || null,
      'selectedOption': this.getField("VALUE").getValue(),
    };
  },
  loadExtraState: function(state) {
    let defaultOptions = this.dropdownDefaultOptions;
    this.latestOptionsValues = state['propertyOptions'] || defaultOptions;
    this.removeInput("VALUE_CHILD",true);

    const block = this;
    this.appendDummyInput('VALUE_CHILD')
      .appendField('property')
      .appendField(new Blockly.FieldDropdown(function() {
        var options = defaultOptions;
        if (block.isFirstTimeLoading) options = block.latestOptionsValues;

        var child = block.getInput("VALUE_PARENT").connection.targetConnection;
        if (child && property_of_Dict[child.getCheck()?.[0]]) {
          options = options.concat(property_of_Dict[child.getCheck()?.[0]].map(function(property) {
            return [property[0],property[0].toUpperCase().split(' ').join('_')];
          }));
        }

        block.latestOptionsValues = options;
        return options;
      }, this.validate), 'VALUE');
    this.moveInputBefore("VALUE_CHILD","VALUE_PARENT");

    this.isFirstTimeLoading = false;
    block.getField("VALUE").setValue(state['selectedOption']);
  },
  updateConnections: function(newValue){
    if (newValue == "NONE") {
      this.setOutput(true, null);
      return;
    }
    var parentConnection = this.getInput("VALUE_PARENT").connection.targetConnection;
    if (parentConnection == null) return;
    let selectedDictType = property_of_Dict[parentConnection.getCheck()?.[0]];
    if (selectedDictType == null) {
      this.getField("VALUE").setValue("NONE");
      return;
    }
    let selectedDictOption = selectedDictType.find(x => x[0].toUpperCase().split(' ').join('_') == newValue);

    this.setOutput(true,selectedDictOption[1]);
  },
}

Blockly.Blocks['token_input'] = {
  init: function() {
    var validator = function(newValue) {
      if (/^([MN][\w-]{23,25})\.([\w-]{6})\.([\w-]{27,39})$/gm.test(newValue)) {
        return newValue;
      } else{
        return null;
      }
    }
    field = new Blockly.FieldTextInput("Your token here")
    field.setValidator(validator);
    this.appendDummyInput()
        .appendField((field), "TOKEN");
    this.setOutput(true, "String");
  }
};


Blockly.Blocks['get_by_id'] = {
  validate: function(newValue) {
    this.getSourceBlock().updateConnections(newValue);
    return newValue;
  },
  init: function() {
    this.setInputsInline(true)
    this.setColour('%{BKY_ACTION_HUE}')
    this.setOutput(true, null);
    var options = [["guild","GUILD"],["channel","CHANNEL"],["user","USER"],["message","MESSAGE"],["emoji","EMOJI"],["member","MEMBER"],["role","ROLE"]]; 
    this.appendDummyInput()
      .appendField('get')
      .appendField(new Blockly.FieldDropdown(options,this.validate), 'INSTANCES')
    console.log(this)
    this.notFirstTimeLoading = false;
    this.updateConnections('GUILD')
  },
  updateConnections: function(newValue){
    if (this.notFirstTimeLoading == true) {
      this.setOutput(true,capitalizeFirstLetter(newValue.toLowerCase()));
    }
    this.notFirstTimeLoading = true;
    this.setOutput(true,capitalizeFirstLetter(newValue.toLowerCase()));
    this.removeInput('ID_INPUT',true)
    this.removeInput('METHOD',true)
    parent = this.appendValueInput('ID_INPUT')
      .appendField('by ID:')
    if (this.rendered && Workspace && !parent.connection.targetConnection && !parent.sourceBlock.isInFlyout){
      var InputBlock = Workspace.newBlock('math_number')
        InputBlock.setShadow(true)
        InputBlock.initSvg()
        InputBlock.render();
      parent.connection.connect(InputBlock.outputConnection)
    }
    if (['MEMBER', 'ROLE'].includes(newValue)) {
      this.appendValueInput('METHOD')
        .appendField(`of guild`)
        .setCheck('Guild')
    }
    if (newValue == 'MESSAGE') {
      this.appendValueInput('METHOD')
        .appendField(`of channel`)
        .setCheck('Channel')
    }
  },
  onchange : function(){
    // Check if child METHOD exists -> check if empty
    const valueInput = this.getInput('METHOD', true)
    if (valueInput){
      const connection = valueInput.connection.targetConnection
      if (connection){
        console.log(connection)
      }
    }
  }
}


let globalEventArguments = {
  message_event: {
    CREATE: [["Message", "Message"]],
    UPDATE: [["Old Message", "Message"], ["New Message", "Message"]],
    DELETE: [["Message", "Message"]],
  },
};
const ArgumentEventHandler = function(block) {
  const eventBlock = block.getInputTargetBlock("EVENT");

  block.eventArgsList = eventBlock?.genEventRags || [];
  if (block.lastEventArgs == null) {
    block.lastEventArgs = [];
    block.connectedEventArgs = [];
  }

  //handle new block creation
  block.lastEventArgs.forEach((x,i) => {
    let argBlock = block.getInputTargetBlock("ARG"+(i+1));
    if (argBlock != null) {
      if (!block.connectedEventArgs.includes(argBlock)) {
        if (this.isFirstTimeSetup) {
          argBlock.dispose(true);
        } else {
          block.getInput("ARG"+(i+1)).connection.disconnect();
        }
      }
      return;
    }
    
    var InputBlock = Workspace.newBlock('event_arg_placeholder');
    InputBlock.setFieldValue(x[0], "PLACEHOLDER");
    InputBlock.eventArgOutput = x;
    InputBlock.setOutput(true,x[1]);
    InputBlock.initSvg();
    InputBlock.render();
    let inputField = block.getInput('ARG'+(i+1));
    inputField?.connection.connect(InputBlock.outputConnection);
    block.connectedEventArgs.push(InputBlock);
  });

  //handle event change and remove references
  if (block.lastEventArgs !== block.eventArgsList) {

    //remove variable and its copies
    block.connectedEventArgs.forEach(x => x.dispose(true));
    block.connectedEventArgs = [];
    block.lastEventArgs.forEach((x,i) => {
      block.removeInput("ARG"+(i+1));
    });

    block.lastEventArgs = block.eventArgsList;
    for (let index = 0; index < block.eventArgsList.length; index++) {
      const element = block.eventArgsList[index];
      
      var InputBlock = Workspace.newBlock('event_arg_placeholder');
      InputBlock.setFieldValue(element[0], "PLACEHOLDER");
      InputBlock.eventArgOutput = element;
      InputBlock.setOutput(true,element[1]);
      InputBlock.initSvg();
      InputBlock.render();
      let inputField = block.appendValueInput('ARG'+(index+1));
      if (index == 0) {
        inputField.appendField('Outputs:');
      }
      inputField.connection.connect(InputBlock.outputConnection);
      block.connectedEventArgs.push(InputBlock);
      block.moveInputBefore('ARG'+(index+1), "DO");
    }
  }
  this.isFirstTimeSetup = false;
};
Blockly.Blocks['when'] = {
  init: function() {
    this.setInputsInline(true)
    this.setColour('%{BKY_EVENT_HUE}')
    this.setTooltip("Executes every time the specified condition is true.");

    this.appendValueInput('EVENT')
      .appendField('when')
      .setCheck("Boolean");
    this.appendStatementInput('DO');

    if (Workspace == null) return;
    const block = this;
    Workspace.addChangeListener((event) => {
      if (this.isFirstTimeSetup && event.type == "create") {
        this.updateEventArguments(block);
        return;
      }
      if (event.type !== "move" && event.type !== "change") return;
      if (event.reason && !(event.reason.includes("connect") || event.reason.includes("disconnect"))) return;
      //comment the line bellow to skip dropping
      if (event.reason && event.reason.includes("disconnect") && event.oldInputName.startsWith("ARG")) return;

      this.updateEventArguments(block);
    });

    this.isFirstTimeLoading = true;
    this.isFirstTimeSetup = true;
  },
  updateEventArguments: ArgumentEventHandler,
  saveExtraState: function() {
    return {
      'eventArgsList': this.eventArgsList || [],
    };
  },
  loadExtraState: function(state) {
    const block = this;
    block.eventArgsList = state.eventArgsList;

    if (!this.isFirstTimeLoading) return;
    this.isFirstTimeLoading = false;
    block.lastEventArgs = [];
    block.connectedEventArgs = [];

    if (block.lastEventArgs == block.eventArgsList) return;
    block.lastEventArgs = block.eventArgsList;
    for (let index = 0; index < block.eventArgsList.length; index++) {
      let inputField = block.appendValueInput('ARG'+(index+1));
      if (index == 0) { inputField.appendField('Outputs:'); }
      block.moveInputBefore('ARG'+(index+1), "DO");
    }
  },
}
Blockly.Blocks['once'] = {
  init: function() {
    this.setInputsInline(true)
    this.setColour('%{BKY_EVENT_HUE}')
    this.setTooltip("Executes every time the specified condition is true.");

    this.appendValueInput('EVENT')
      .appendField('once')
      .setCheck("Boolean");
    this.appendStatementInput('DO');

    if (Workspace == null) return;
    const block = this;
    Workspace.addChangeListener((event) => {
      if (this.isFirstTimeSetup && event.type == "create") {
        this.updateEventArguments(block);
        return;
      }
      if (event.type !== "move" && event.type !== "change") return;
      if (event.reason && !(event.reason.includes("connect") || event.reason.includes("disconnect"))) return;
      //comment the line bellow to skip dropping
      if (event.reason && event.reason.includes("disconnect") && event.oldInputName.startsWith("ARG")) return;

      this.updateEventArguments(block);
    });

    this.isFirstTimeLoading = true;
    this.isFirstTimeSetup = true;
  },
  updateEventArguments: ArgumentEventHandler,
  saveExtraState: function() {
    return {
      'eventArgsList': this.eventArgsList || [],
    };
  },
  loadExtraState: function(state) {
    const block = this;
    block.eventArgsList = state.eventArgsList;

    if (!this.isFirstTimeLoading) return;
    this.isFirstTimeLoading = false;
    block.lastEventArgs = [];
    block.connectedEventArgs = [];

    if (block.lastEventArgs == block.eventArgsList) return;
    block.lastEventArgs = block.eventArgsList;
    for (let index = 0; index < block.eventArgsList.length; index++) {
      let inputField = block.appendValueInput('ARG'+(index+1));
      if (index == 0) { inputField.appendField('Outputs:'); }
      block.moveInputBefore('ARG'+(index+1), "DO");
    }
  },
}



Blockly.Blocks['event_arg_placeholder'] = {
  init: function() {
    this.setOutput(true, null);
    this.setColour(230);

    this.appendDummyInput()
      .appendField('', 'PLACEHOLDER');
    
    if (Workspace == null) return;
    const parentFinder = () => {
      const rootBlock = this.getRootBlock();

      if (rootBlock.type == this.type) return;
      if (rootBlock.type !== "when" && rootBlock.type !== "once") return;

      Workspace.removeChangeListener(parentFinder);
      rootBlock.connectedEventArgs.push(this);
    };

    Workspace.addChangeListener(parentFinder);
  },
  saveExtraState: function() {
    return {
      'eventArgsList': this.eventArgOutput,
    };
  },
  loadExtraState: function(state) {
    const block = this;
    if (state.eventArgsList == null) {
      // console.log("no eventArgsList", block);
      block.dispose(true);
      return;
    }
    block.eventArgOutput = state.eventArgsList;
    block.setFieldValue(block.eventArgOutput[0], "PLACEHOLDER");
    block.setOutput(true, block.eventArgOutput[1]);
  },
}




Blockly.Blocks['bot_login'] = {
  init: function() {
    this.jsonInit({
      "type": "bot_login",
      "message0": "login with token",
      "inputsInline": true,
      "colour": "%{BKY_ACTION_HUE}",
      "tooltip": "Login the specified Client with the provided token.",
      "helpUrl": ""
    })
    parent = this.appendValueInput('TOKEN_INPUT');
    if (this.rendered && Workspace && !parent.connection.targetConnection && !parent.sourceBlock.isInFlyout){
      var InputBlock = Workspace.newBlock('token_input')
        InputBlock.setShadow(true)
        InputBlock.initSvg()
        InputBlock.render();
      parent.connection.connect(InputBlock.outputConnection)
    }
  }
}

function generateActionBlock(typeLabel,initOptions, updateConnectionsFunction) {
  return {
    validate: function(newValue) {
      this.getSourceBlock().updateConnections(newValue);
      return newValue;
    },
    init: function() {
      var options = initOptions;
      this.setColour('%{BKY_ACTION_HUE}');
      this.setNextStatement(true);
      this.setPreviousStatement(true);
      this.setInputsInline(true);
      this.appendDummyInput()
        .appendField(typeLabel)
        .appendField(new Blockly.FieldDropdown(options, this.validate), 'TYPE');
      this.updateConnections(initOptions[0][1]);
    },
    updateConnections: updateConnectionsFunction
  };
}

var channelActions = generateActionBlock('channel',[
  ['create', 'CREATE'],
  ['edit', 'EDIT'],
  ['delete', 'DELETE']
], function(newValue) {
  this.removeInput('CREATE', true);
  this.removeInput('EDIT', true);
  this.removeInput('DELETE', true);
  this.removeInput('NAME', true);
  this.removeInput('GUILD', true);
  if (newValue == 'CREATE') {
    this.appendDummyInput('CREATE')
      .appendField('type:')
      .appendField(new Blockly.FieldDropdown([['Text', 'TEXT'], ['Voice', 'VOICE'], ['Announcement', 'ANNOUNCEMENT'],['Stage', 'STAGE']]), 'CHANNELTYPE');
    this.appendValueInput('GUILD')
      .appendField('on guild:')
      .setCheck('Guild')
    parentBlock = this.appendValueInput('NAME')
      .appendField('name:')
    if (this.rendered && Workspace && !parentBlock.connection.targetConnection && !parentBlock.sourceBlock.isInFlyout){
      var InputBlock = Workspace.newBlock('input')
        InputBlock.setShadow(true)
        InputBlock.initSvg()
        InputBlock.render();
      parentBlock.connection.connect(InputBlock.outputConnection)
    }
  } else if (newValue == 'EDIT') {
    var InputBlock = Workspace.newBlock('input')
      InputBlock.setShadow(true)
      InputBlock.initSvg()
      InputBlock.render();  
    this.appendValueInput('EDIT')
      .appendField('channel:')
      .setCheck('Channel')
    this.appendValueInput('NAME')
      .appendField('new name:')
      .connection.connect(InputBlock.outputConnection)   
  } else if (newValue == 'DELETE') {
    this.appendValueInput('DELETE')
      .appendField('channel:')
      .setCheck('Channel')
  }
});

var messageActions = generateActionBlock('message',[
  ['send', 'SEND'],
  ['edit', 'EDIT'],
  ['delete', 'DELETE']
], function(newValue) {
  this.removeInput('SEND',true);
  this.removeInput('EDIT', true);
  this.removeInput('DELETE',true);
  this.removeInput('CONTENT',true);
  if (newValue == 'SEND') {
    this.appendValueInput('SEND')
      .appendField('in channel:')
      .setCheck('Channel')
    var parentBlock = this.appendValueInput('CONTENT')
      .appendField('content:')
      .setCheck('String')
    if (this.rendered && Workspace && !parentBlock.connection.targetConnection && !parentBlock.sourceBlock.isInFlyout){
      var InputBlock = Workspace.newBlock('input')
        InputBlock.setShadow(true)
        InputBlock.initSvg()
        InputBlock.render();
      parentBlock.connection.connect(InputBlock.outputConnection)
    }
  } else if (newValue == 'EDIT') {
    this.appendValueInput('EDIT')
      .appendField('message:')
      .setCheck('Message')
    var InputBlock = Workspace.newBlock('input')
      InputBlock.setShadow(true)
      InputBlock.initSvg()
      InputBlock.render();

    this.appendValueInput('CONTENT')
      .appendField('new content:')
      .connection.connect(InputBlock.outputConnection)        
  } else if (newValue == 'DELETE'){
    this.appendValueInput('DELETE')
    .appendField('message:')
    .setCheck('Message')
  }
});

var roleActions = generateActionBlock('role',[
  ['create', 'CREATE'],
  ['edit', 'EDIT'],
  ['delete', 'DELETE']
], function(newValue) {
  this.removeInput('CREATE',true);
  this.removeInput('EDIT', true);
  this.removeInput('DELETE',true);
  this.removeInput('NAME',true);
  this.removeInput('COLOUR',true)
  if (newValue == 'CREATE') {
    this.appendValueInput('CREATE')
      .appendField('in guild:')
      .setCheck('Guild')
    var parentBlock1 = this.appendValueInput('NAME')
      .appendField('name:')
      .setCheck('String')
    var parentBlock2 = this.appendValueInput('COLOUR')
      .appendField('color:')
      .setCheck('Colour')
    
    if (Workspace){
      if (this.rendered && !parentBlock1.connection.targetConnection && !parentBlock1.sourceBlock.isInFlyout){
        var InputBlock = Workspace.newBlock('input')
          InputBlock.setShadow(true)
          InputBlock.initSvg()
          InputBlock.render();
        parentBlock1.connection.connect(InputBlock.outputConnection)
      }
    }
  } else if (newValue == 'EDIT') {
    this.appendValueInput('EDIT')
      .appendField('role:')
      .setCheck('Role')
    var InputBlock = Workspace.newBlock('input')
      InputBlock.setShadow(true)
      InputBlock.initSvg()
      InputBlock.render();  

    this.appendValueInput('NAME')
      .appendField('new name:')
      .connection.connect(InputBlock.outputConnection)        
  } else if (newValue == 'DELETE'){
    this.appendValueInput('DELETE')
    .appendField('role:')
    .setCheck('Role')
  }
});
  


Blockly.Blocks['channel_action'] = channelActions
Blockly.Blocks['message_action'] = messageActions
Blockly.Blocks['role_action'] = roleActions





function to_snake_case(text) {
  const originalText = text;
  let unmodifiedText = undoCases(originalText);
  let modifiedText = unmodifiedText;

  modifiedText = unmodifiedText.toLowerCase().split(" ").join("_");

  return modifiedText;
}

function undoCases(text) {
  if (typeof text !== "string") return text;
  if (text.includes(" ")) return text;
  if (text.includes("_")) return text.replaceAll(/_/g, " ");
  if (text.includes("-")) return text.replaceAll(/-/g, " ");
  const regexCapitalized = /([a-z])([A-Z])/g;
  if (regexCapitalized.test(text)) return text.replace(regexCapitalized, "$1 $2");
  return text;
}