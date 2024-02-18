Blockly.defineBlocksWithJsonArray([
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
  "type": "project_run",
  "message0": "%1 when this Project is run",
  "args0": [
    {
      "type": "field_image",
      "src": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' width='512' height='512' x='0' y='0' viewBox='0 0 163.861 163.861' style='enable-background:new 0 0 512 512' xml:space='preserve' class=''%3E%3Cg%3E%3Cpath d='M34.857 3.613C20.084-4.861 8.107 2.081 8.107 19.106v125.637c0 17.042 11.977 23.975 26.75 15.509L144.67 97.275c14.778-8.477 14.778-22.211 0-30.686L34.857 3.613z' fill='%23ffffff' opacity='1' data-original='%23000000' class=''%3E%3C/path%3E%3C/g%3E%3C/svg%3E",
      "width": 15,
      "height": 15,
      "alt": "*",
      "flipRtl": false
    }
  ],
  "inputsInline": true,
  "nextStatement": null,
  "colour": "%{BKY_EVENT_HUE}",
  "tooltip": "Activates when the project starts running or is executed.",
  "helpUrl": ""
},{
  "type": "once",
  "message0": "once %1",
  "args0": [
    {
      "type": "input_value",
      "name": "EVENT",
      "check": "Boolean"
    }
  ],
  "inputsInline": true,
  "nextStatement": null,
  "colour": "%{BKY_EVENT_HUE}",
  "tooltip": "Executes only once when the specified condition becomes true.",
  "helpUrl": ""
},
{
  "type": "channel_event",
  "message0": "channel %1",
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
  "type": "when",
  "message0": "when %1",
  "args0": [
    {
      "type": "input_value",
      "name": "EVENT",
      "check": "Boolean"
    }
  ],
  "inputsInline": true,
  "nextStatement": null,
  "colour": '%{BKY_EVENT_HUE}',
  "tooltip": "Executes every time the specified condition is true.",
  "helpUrl": ""
},{
  "type": "clientready",
  "message0": "Client is ready",
  "output": "Boolean",
  "colour": "%{BKY_EVENT_HUE}",
  "tooltip": "Triggers when the Discord client is fully ready and connected to the server.",
  "helpUrl": ""
},
{
  "type": "output_event",
  "message0": "ouputs of event  %1",
  "args0": [
    {
      "type": "input_value",
      "name": "EVENT",
      "check": "Boolean"
    }
  ],
  "inputsInline": true,
  "output": "Array",
  "colour": "%{BKY_INSTANCE_HUE}",
  "tooltip": "Retrieves a list of outputs associated with a Event boolean condition. For example, if the boolean condition is <Channel deleted?>, the output will be an array of output(s), such as [Channel]. This can then be utilized further, such as by extracting specific properties like the name of the channel.",
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
}
])