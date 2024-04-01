javascript.javascriptGenerator.forBlock['input'] = function(block, generator) {
  input = block.getFieldValue('TEXT')
  if (input == parseInt(input)){
    var code = `${input}`;
  }else{
    var code = `"${input}"`;
  }
  
  return [code, javascript.Order.NONE];
};

javascript.javascriptGenerator.forBlock['colour_hsv_sliders'] = function (block,generator) {
  const code = generator.quote_(block.getFieldValue('COLOUR'));
  return [code, javascript.Order.ATOMIC];
};

javascript.javascriptGenerator.forBlock['terminal_log'] = function(block, generator) {
  const LOG = generator.valueToCode(block, 'LOG', javascript.Order.NONE);
  return `console.log(${LOG});\n`};
  
// ACTIONS
  
javascript.javascriptGenerator.forBlock['bot_login'] = function(block, generator) {
  var token = generator.valueToCode(block, 'TOKEN_INPUT', javascript.Order.NONE);
  var code = `client.login(${token});\n`;
  return code;
};

javascript.javascriptGenerator.forBlock['reaction_action'] = function(block, generator) {
  var dropdown_action = block.getFieldValue('TYPE');
  var value_message = generator.valueToCode(block, 'MESSAGE', javascript.Order.NONE);

  var code = 'null\n';
  if (dropdown_action == "REMOVE_ALL") {
    code = `await ${value_message}.reactions.removeAll();\n`;
    return code;
  }

  var value_reaction = generator.valueToCode(block, 'REACTION', javascript.Order.NONE);
  if (dropdown_action == "ADD") {
    code = `await ${value_message}.react(${value_reaction});\n`;
  } else if (dropdown_action == "REMOVE") {
    code = `await ${value_message}.reactions.resolve(${value_reaction}).users.remove(client.user.id);\n`;
  }

  return code;
};

javascript.javascriptGenerator.forBlock['response_reply'] = function(block, generator) {
  var field_status = block.getFieldValue('STATUS');
  var value_message = generator.valueToCode(block, 'MESSAGE', javascript.Order.ATOMIC);
  var value_content = generator.valueToCode(block, 'CONTENT', javascript.Order.ATOMIC);

  var code = `await ${value_message}.reply(${value_content});\n`;

  return code;
};

javascript.javascriptGenerator.forBlock['bulk_delete'] = function(block, generator) {
  var value_channel = generator.valueToCode(block, 'CHANNEL', javascript.Order.ATOMIC);
  var value_amount = generator.valueToCode(block, 'AMOUNT', javascript.Order.ATOMIC);

  var code = `await ${value_channel}.bulkDelete(${value_amount});\n`;
  return code;
};

javascript.javascriptGenerator.forBlock['channel_action'] = function(block, generator) {
  var dropdown_action = block.getFieldValue('TYPE');
  var code = 'null\n';

  if (dropdown_action == "DELETE") {
    var action_channel = generator.valueToCode(block, 'DELETE', javascript.Order.NONE);
    code = `await ${action_channel}.delete();\n`;
  } else if (dropdown_action == "EDIT") {
    var action_channel = generator.valueToCode(block, 'EDIT', javascript.Order.NONE);
    var action_name = generator.valueToCode(block, 'NAME', javascript.Order.NONE);
    code = `await ${action_role}.setName(${action_name});\n`;
  } else if (dropdown_action == "CREATE") {
    var channel_type = 'null';
    var action_channel_type = block.getFieldValue('CHANNELTYPE');
    var action_guild = generator.valueToCode(block, 'GUILD', javascript.Order.NONE);
    var action_name = generator.valueToCode(block, 'NAME', javascript.Order.NONE);

    if (action_channel_type == 'STAGE') action_channel_type = "STAGE_VOICE";
    channel_type = "Discord.ChannelType.Guild"+toPascalCase(action_channel_type);

    code = `await ${action_guild}.channels.create({ name: ${action_name}, type: ${channel_type} });\n`;
  }

  return code;
};

javascript.javascriptGenerator.forBlock['message_action'] = function(block, generator) {
  var dropdown_action = block.getFieldValue('TYPE');
  var code = 'null\n';

  if (dropdown_action == "DELETE") {
    var action_message = generator.valueToCode(block, 'DELETE', javascript.Order.NONE);
    code = `await ${action_message}.delete();\n`;
  } else if (dropdown_action == "EDIT") {
    var action_message = generator.valueToCode(block, 'EDIT', javascript.Order.NONE);
    var action_content = generator.valueToCode(block, 'CONTENT', javascript.Order.NONE);
    code = `await ${action_message}.edit(${action_content});\n`;
  } else if (dropdown_action == "SEND") {
    var action_channel = generator.valueToCode(block, 'SEND', javascript.Order.NONE);
    var action_content = generator.valueToCode(block, 'CONTENT', javascript.Order.NONE);
    code = `await ${action_channel}.send(${action_content});\n`;
  }

  return code;
};

javascript.javascriptGenerator.forBlock['role_action'] = function(block, generator) {
  var dropdown_action = block.getFieldValue('TYPE');
  var code = 'null\n';

  if (dropdown_action == "DELETE") {
    var action_role = generator.valueToCode(block, 'DELETE', javascript.Order.NONE);
    code = `await ${action_role}.delete();\n`;
  } else if (dropdown_action == "EDIT") {
    var action_role = generator.valueToCode(block, 'EDIT', javascript.Order.NONE);
    var action_name = generator.valueToCode(block, 'NAME', javascript.Order.NONE);
    code = `await ${action_role}.edit({ name: ${action_name} });\n`;
  } else if (dropdown_action == "CREATE") {
    var action_guild = generator.valueToCode(block, 'CREATE', javascript.Order.NONE);
    var action_name = generator.valueToCode(block, 'NAME', javascript.Order.NONE);
    var action_color = generator.valueToCode(block, 'COLOUR', javascript.Order.NONE);
    code = `await ${action_guild}.roles.create({ name: ${action_name}, color: ${action_color} });\n`;
  }

  return code;
};

javascript.javascriptGenerator.forBlock['change_guild_name'] = function(block, generator) {
  var value_guild = generator.valueToCode(block, 'GUILD', javascript.Order.NONE);
  var value_name = generator.valueToCode(block, 'NAME', javascript.Order.NONE);

  var code = `await ${value_guild}.setName(${value_name});\n`;
  return code;
};

javascript.javascriptGenerator.forBlock['get_by_id'] = function(block, generator) {
  var dropdown_instances = block.getFieldValue('INSTANCES');
  var id_input = generator.valueToCode(block, 'ID_INPUT', javascript.Order.NONE);

  var code = 'null';

  //TYPE ${dropdown_instances}
  //GUILD,CHANNEL,USER,EMOJI,MEMBER,ROLE
  if (['MEMBER', 'ROLE', 'MESSAGE'].includes(dropdown_instances)) {
    method = generator.valueToCode(block, 'METHOD', javascript.Order.NONE);
    code = `(await ${method}.${dropdown_instances.toLowerCase()}s.fetch("${id_input}"))`;
  } else if (dropdown_instances == "EMOJI") {
    code = `client.${dropdown_instances.toLowerCase()}s.resolve("${id_input}")`;
  } else {
    //guilds, channels, users
    code = `(await client.${dropdown_instances.toLowerCase()}s.fetch("${id_input}"))`;
  }

  return [code, javascript.Order.NONE];
};


// EVENTS

const eventListenerBlocks = function(block, generator) {
  const value_event = generator.valueToCode(block, 'EVENT', javascript.Order.NONE);
  const innerCode = generator.statementToCode(block, 'DO');
  const eventBlock = block.getInputTargetBlock("EVENT");
  let argsString = eventBlock?.genEventRags.map(x => "event_"+to_snake_case(x[0])).join(", ") || "";

  block.eventArgsList = eventBlock?.genEventRags || [];
  if (block.lastEventArgs == null) {
    block.lastEventArgs = [];
    block.connectedEventArgs = [];
  }

  //handle new block creation
  block.lastEventArgs.forEach((x,i) => {
    let argBlock = block.getInputTargetBlock("ARG"+(i+1));
    if (argBlock != null) return;
    
    var InputBlock = Workspace.newBlock('event_arg_placeholder');
    InputBlock.setFieldValue(x[0], "PLACEHOLDER");
    InputBlock.eventArgOutput = x;
    InputBlock.setOutput(x[1]);
    InputBlock.initSvg();
    InputBlock.render();
    let inputField = block.getInput('ARG'+(i+1));
    inputField.connection.connect(InputBlock.outputConnection);
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
      InputBlock.setOutput(element[1]);
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

  var eventType = block.type;
  if (eventType == "when") eventType = "on";
  var code = `client.${eventType}(${value_event}, async(${argsString}) => {\n${innerCode}\n});\n`;
  return code;
};
javascript.javascriptGenerator.forBlock['once'] = eventListenerBlocks;
javascript.javascriptGenerator.forBlock['when'] = eventListenerBlocks;
javascript.javascriptGenerator.forBlock['event_arg_placeholder'] = function(block, generator) {
  var code = `event_${to_snake_case(block.eventArgOutput[0])}`;
  return [code, javascript.Order.NONE];
};

// EVENT BOOLS

javascript.javascriptGenerator.forBlock['botready'] = function(block, generator) {
  var code = 'Discord.Events.ClientReady';
  block.genEventRags = [];
  return [code, javascript.Order.NONE];
};

javascript.javascriptGenerator.forBlock['channel_event'] = jsEventConverter("Channel");
javascript.javascriptGenerator.forBlock['guild_emoji_event'] = jsEventConverter("GuildEmoji");
javascript.javascriptGenerator.forBlock['message_event'] = jsEventConverter("Message", {
  CREATE: [["Message", "Message"]],
  UPDATE: [["Old Message", "Message"], ["New Message", "Message"]],
  DELETE: [["Message", "Message"]],
});
javascript.javascriptGenerator.forBlock['message_reaction_event'] = jsEventConverter("MessageReaction");
javascript.javascriptGenerator.forBlock['guild_event'] = jsEventConverter("Guild");
javascript.javascriptGenerator.forBlock['guild_sticker_event'] = jsEventConverter("GuildSticker");
javascript.javascriptGenerator.forBlock['guild_member_event'] = jsEventConverter("GuildMember");
javascript.javascriptGenerator.forBlock['guild_member_moderate_event'] = jsEventConverter("GuildBan", {}, {"BAN":"ADD","UNBAN":"REMOVE"});
javascript.javascriptGenerator.forBlock['guild_role_event'] = jsEventConverter("GuildRole");
javascript.javascriptGenerator.forBlock['guild_scheduled_event_event'] = jsEventConverter("GuildScheduledEvent");
javascript.javascriptGenerator.forBlock['bot_guild_event'] = jsEventConverter("Guild", {
  CREATE: [["server", "Guild"]],
  DELETE: [["server", "Guild"]],
}, {"JOIN":"CREATE","REMOVE":"DELETE"});

// INSTANCES

javascript.javascriptGenerator.forBlock['property_of'] = function(block, generator) {
  const PARENT = generator.valueToCode(block, 'VALUE_PARENT', javascript.Order.ATOMIC);
  const CHILD = null;
  if (PARENT != null) {
    if (CHILD != null){
      return `${PARENT}${CHILD}`
    }else{
      return `${PARENT}`
    }
  }else{
    return null
}};

javascript.javascriptGenerator.forBlock['field_date'] = function(block, generator) {
  var time = block.getFieldValue('FIELDNAME');
  var code = time;
  return [code, javascript.Order.NONE];
};


javascript.javascriptGenerator.forBlock['embed_builder'] = function(block, generator) {
  // TODO: add mutators & Code
  var code = '\n';
  return [code, javascript.Order.NONE];
};

javascript.javascriptGenerator.forBlock['token_input'] = function(block, generator) {
  var token = block.getFieldValue('TOKEN');
  return [`"${token}"`,javascript.Order.NONE];
};





function jsEventConverter (eventPrefix, args = {}, replaceValues) {
  return function(block, generator) {
    var dropdown_name = block.getFieldValue('EVENT');
    if (replaceValues) dropdown_name = replaceValues[dropdown_name] || dropdown_name;
    var eventName = eventPrefix + toPascalCase(dropdown_name);
    var code = 'Discord.Events.'+eventName;
    block.genEventRags = args[dropdown_name] || [];
    return [code, javascript.Order.NONE];
  };
}

function toPascalCase(text) {
  const originalText = text;
  let unmodifiedText = undoCases(originalText);
  let modifiedText = unmodifiedText;

  modifiedText = unmodifiedText.split(" ")
  .map(txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
  .join("");

  return modifiedText;
}