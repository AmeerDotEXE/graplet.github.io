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

javascript.javascriptGenerator.forBlock['console_log'] = function(block, generator) {
  const LOG = generator.valueToCode(block, 'LOG', javascript.Order.NONE);
  return `console.log(${LOG});\n`};
  
// ACTIONS
  
javascript.javascriptGenerator.forBlock['bot_login'] = function(block, generator) {
  var token = generator.valueToCode(block, 'TOKEN_INPUT', javascript.Order.NONE);
  var code = `client.login(${token});\n`;
  return code;
};

javascript.javascriptGenerator.forBlock['add_reaction'] = function(block, generator) {
  var dropdown_action = block.getFieldValue('ACTION');
  var value_reaction = generator.valueToCode(block, 'REACTION', javascript.Order.ATOMIC);
  var value_message = generator.valueToCode(block, 'MESSAGE', javascript.Order.ATOMIC);

  var code = 'null\n';

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

javascript.javascriptGenerator.forBlock['user_action'] = function(block, generator) {
  var dropdown_action = block.getFieldValue('ACTION');
  // TODO: Assemble javascript into code variable.
  var code = '...\n';
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

javascript.javascriptGenerator.forBlock['once'] = function(block, generator) {
  const value_event = generator.valueToCode(block, 'EVENT', javascript.Order.NONE);
  const innerCode = generator.statementToCode(block, 'DO');
  var code = `client.once(${value_event}, async() => {\n${innerCode}\n});\n`;
  return code;
};

javascript.javascriptGenerator.forBlock['when'] = function(block, generator) {
  const value_event = generator.valueToCode(block, 'EVENT', javascript.Order.NONE);
  const innerCode = generator.statementToCode(block, 'DO');
  var code = `client.on(${value_event}, async(output) => {\n${innerCode}\n});\n`;
  return code;
};

// EVENT BOOLS

javascript.javascriptGenerator.forBlock['botready'] = function(block, generator) {
  var code = 'Discord.Events.ClientReady';
  return [code, javascript.Order.NONE];
};

javascript.javascriptGenerator.forBlock['channel_event'] = eventConverter("Channel");
javascript.javascriptGenerator.forBlock['emoji_event'] = eventConverter("Emoji");
javascript.javascriptGenerator.forBlock['message_event'] = eventConverter("Message");
javascript.javascriptGenerator.forBlock['message_reaction_event'] = eventConverter("MessageReaction");
javascript.javascriptGenerator.forBlock['guild_event'] = eventConverter("Guild");
javascript.javascriptGenerator.forBlock['guild_emoji_event'] = eventConverter("GuildEmoji");
javascript.javascriptGenerator.forBlock['guild_sticker_event'] = eventConverter("GuildSticker");
javascript.javascriptGenerator.forBlock['guild_member_event'] = eventConverter("GuildMember");
javascript.javascriptGenerator.forBlock['guild_role_event'] = eventConverter("GuildRole");
javascript.javascriptGenerator.forBlock['guild_scheduled_event_event'] = eventConverter("GuildScheduledEvent");


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





function eventConverter(eventPrefix) {
  return function(block, generator) {
    var dropdown_name = block.getFieldValue('EVENT') || block.getFieldValue('NAME');
    var eventName = eventPrefix + toPascalCase(dropdown_name);
    var code = 'Discord.Events.'+eventName;
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

function undoCases(text) {
  if (typeof text !== "string") return text;
  if (text.includes(" ")) return text;
  if (text.includes("_")) return text.replaceAll(/_/g, " ");
  if (text.includes("-")) return text.replaceAll(/-/g, " ");
  const regexCapitalized = /([a-z])([A-Z])/g;
  if (regexCapitalized.test(text)) return text.replace(regexCapitalized, "$1 $2");
  return text;
}