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
  "type": "console_log",
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
  "message0": "once %1 on %2 %3",
  "args0": [
    {
      "type": "input_value",
      "name": "EVENT",
      "check": "Boolean"
    },
    {
      "type": "input_value",
      "name": "CLIENT",
      "check": "Client"
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
  "type": "when",
  "message0": "when %1 on %2 %3",
  "args0": [
    {
      "type": "input_value",
      "name": "EVENT",
      "check": "Boolean"
    },
    {
      "type": "input_value",
      "name": "CLIENT",
      "check": "Client"
    },
    {
      "type": "input_statement",
      "name": "DO"
    }
  ],
  "inputsInline": true,
  "colour": '%{BKY_EVENT_HUE}',
  "tooltip": "Executes every time the specified condition is true.",
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
  "type": "emoji_event",
  "message0": "emoji %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "NAME",
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
  "type": "clientready",
  "message0": "Client is ready",
  "output": "Boolean",
  "colour": '%{BKY_EVENT_HUE}',
  "tooltip": "Triggers when the Discord client is fully ready and connected to the server.",
  "helpUrl": ""
},
{
  "type": "client_login",
  "message0": "login %1 with token %2",
  "args0": [
    {
      "type": "input_value",
      "name": "LOGIN_INPUT",
      "check": "Client"
    },
    {
      "type": "input_value",
      "name": "TOKEN_INPUT",
      "check": "String"
    }
  ],
  "inputsInline": true,
  "colour": "%{BKY_ACTION_HUE}",
  "tooltip": "Login the specified Client with the provided token.",
  "helpUrl": ""
},{
  "type": "client",
  "message0": "create new Client ",
  "inputsInline": true,
  "output": "Client",
  "colour": "%{BKY_INSTANCE_HUE}",
  "tooltip": "Initiates a new instance of a Discord client.",
  "helpUrl": ""
},
{
  "type": "property_of",
  "message0": "property %1 of %2",
  "args0": [
    {
      "type": "input_dummy",
      "name": "VALUE_CHILD"
    },
    {
      "type": "input_value",
      "name": "VALUE_PARENT"
    }
  ],
  "extensions": ["dynamic_property_of"],
  "inputsInline": true,
  "output": null,
  "colour": '%{BKY_INSTANCE_HUE}',
  "tooltip": " Retrieves a specific property of an object or variable",
  "helpUrl": ""
},
{
  "type": "get_by_id",
  "message0": "get instance %1 %2 %3 %4",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "INSTANCES",
      "options": [
        [
          "guild",
          "GUILD"
        ],
        [
          "channel",
          "CHANNEL"
        ],
        [
          "user",
          "USER"
        ],
        [
          "emoji",
          "EMOJI"
        ],
        [
          "invite",
          "INVITE"
        ]
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "BY",
      "text": "by ID"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "ID_INPUT",
      "check": "Number"
    }
  ],
  "inputsInline": true,
  "output": null,
  "colour": '%{BKY_ACTION_HUE}',
  "tooltip": "Retrieves an instance or object by its unique identifier (ID)",
  "helpUrl": ""
},
{
  "type": "send_message",
  "message0": "send message in channel %1 Text content: %2 Optional Embed(s): %3",
  "args0": [
    {
      "type": "input_value",
      "name": "CHANNEL",
      "check": "Channel"
    },
    {
      "type": "input_value",
      "name": "CONTENT",
      "check": "String"
    },
    {
      "type": "input_value",
      "name": "EMBEDS"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": '%{BKY_ACTION_HUE}',
  "tooltip": "Sends a message to a specified Channel of a Guild.",
  "helpUrl": ""
},
{
  "type": "embed_builder",
  "message0": "Embed Builder %1 Description %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "DESCRIPTION"
    }
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
      "checked": true
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
      "name": "COLOR",
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
])