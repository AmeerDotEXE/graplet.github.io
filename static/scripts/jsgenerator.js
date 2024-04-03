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
  var value_message = generator.valueToCode(block, 'MESSAGE', javascript.Order.NONE);
  var value_content = generator.valueToCode(block, 'CONTENT', javascript.Order.NONE);

  var code = `await ${value_message}.reply(${value_content});\n`;

  return code;
};

javascript.javascriptGenerator.forBlock['bulk_delete'] = function(block, generator) {
  var value_channel = generator.valueToCode(block, 'CHANNEL', javascript.Order.NONE);
  var value_amount = generator.valueToCode(block, 'AMOUNT', javascript.Order.NONE);

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
javascript.javascriptGenerator.forBlock['message_event'] = jsEventConverter("Message");
javascript.javascriptGenerator.forBlock['message_reaction_event'] = jsEventConverter("MessageReaction");
javascript.javascriptGenerator.forBlock['guild_event'] = jsEventConverter("Guild");
javascript.javascriptGenerator.forBlock['guild_sticker_event'] = jsEventConverter("GuildSticker");
javascript.javascriptGenerator.forBlock['guild_member_event'] = jsEventConverter("GuildMember");
javascript.javascriptGenerator.forBlock['guild_member_moderate_event'] = jsEventConverter("GuildBan", {}, {"BAN":"ADD","UNBAN":"REMOVE"});
javascript.javascriptGenerator.forBlock['guild_role_event'] = jsEventConverter("GuildRole");
javascript.javascriptGenerator.forBlock['guild_scheduled_event_event'] = jsEventConverter("GuildScheduledEvent");
javascript.javascriptGenerator.forBlock['bot_guild_event'] = jsEventConverter("Guild", {"JOIN":"CREATE","REMOVE":"DELETE"});

// INSTANCES

let jsTypeProperties = {
  Message: function(parentValue, dropdown_value, block, generator) {
    var code = "null";

    switch (dropdown_value) {
      case "CONTENT":
        code = `${parentValue}.content`;
        break;
      case "CHANNEL":
        code = `${parentValue}.channel`;
        break;
      case "SERVER":
        code = `${parentValue}.guild`;
        break;
      case "USER":
        code = `${parentValue}.author`;
        break;
      case "ID":
        code = `${parentValue}.id`;
        break;
    }

    return code;
  },
  Guild: function(parentValue, dropdown_value, block, generator) {
    var code = "null";

    switch (dropdown_value) {
      case "ID":
        code = `${parentValue}.id`;
        break;
    }

    return code;
  },
  Channel: function(parentValue, dropdown_value, block, generator) {
    var code = "null";

    switch (dropdown_value) {
      case "NAME":
        code = `${parentValue}.name`;
        break;
      case "SERVER":
        code = `${parentValue}.guild`;
        break;
      case "ID":
        code = `${parentValue}.id`;
        break;
    }

    return code;
  },
  Guild: function(parentValue, dropdown_value, block, generator) {
    var code = "null";

    switch (dropdown_value) {
      case "NAME":
        code = `${parentValue}.name`;
        break;
      case "ID":
        code = `${parentValue}.id`;
        break;
    }

    return code;
  },
};

javascript.javascriptGenerator.forBlock['property_of'] = function(block, generator) {
  const PARENT = generator.valueToCode(block, 'VALUE_PARENT', javascript.Order.NONE);
  const CHILD = block.getFieldValue('VALUE');
  if (CHILD == "NONE") return ["null", javascript.Order.NONE];

  const ParentType = block.getInput("VALUE_PARENT").connection.targetConnection?.getCheck()?.[0];
  if (ParentType != null) {
    let code = jsTypeProperties[ParentType]?.(PARENT, CHILD, block, generator);
      if (code) return [code, javascript.Order.NONE];
    }

  return ["null", javascript.Order.NONE];
};

javascript.javascriptGenerator.forBlock['field_date'] = function(block, generator) {
  var time = block.getFieldValue('FIELDNAME');
  var code = time;
  return [code, javascript.Order.NONE];
};


javascript.javascriptGenerator.forBlock['embed_builder'] = function(block, generator) {
  description = generator.valueToCode(block, 'DESCRIPTION', javascript.Order.NONE);
  title = generator.valueToCode(block, 'TITLE', javascript.Order.NONE);
  colour = generator.valueToCode(block, 'COLOUR', javascript.Order.NONE);

  author_name = generator.valueToCode(block, 'AUTHOR_NAME', javascript.Order.NONE);
  author_icon_url = generator.valueToCode(block, 'AUTHOR_ICON_URL', javascript.Order.NONE);
  author_url = generator.valueToCode(block, 'AUTHOR_URL', javascript.Order.NONE);
  
  footer_text = generator.valueToCode(block, 'FOOTER_TEXT', javascript.Order.NONE);
  footer_icon_url = generator.valueToCode(block, 'FOOTER_ICON_URL', javascript.Order.NONE);

  embed = 'new EmbedBuilder()'
  if(description){
    embed = embed.concat(`.setDescription(${description})`)
  }
  if(title){
    embed = embed.concat(`.setTitle(${title})`)
  }
  if(colour){
    embed = embed.concat(`.setColor(${colour})`)
  }
  if(author_name){
    embed = embed.concat(`.setAuthor({name: ${author_name},`)
    if (author_icon_url){
      embed = embed.concat(`iconURL: ${author_icon_url},`)
    }
    if (author_url){
      embed= embed.concat(`url: ${author_url},`)
    }
    embed = embed.slice(0, -1);
    embed = embed.concat('});')
  }
  if(footer_text){
    embed = embed.concat(`.setFooter({text: ${footer_text},`)
    if (footer_icon_url){
      embed = embed.concat(`iconURL: ${footer_icon_url},`)
    }
    embed = `${embed.slice(0, -1)}});`;
  }
  return [embed, javascript.Order.NONE];
};

javascript.javascriptGenerator.forBlock['token_input'] = function(block, generator) {
  var token = block.getFieldValue('TOKEN');
  return [`"${token}"`,javascript.Order.NONE];
};





function jsEventConverter (eventPrefix, replaceValues) {
  return function(block, generator) {
    var dropdown_name = block.getFieldValue('EVENT');
    block.genEventRags = globalEventArguments[block.type]?.[dropdown_name] || [];
    if (replaceValues) dropdown_name = replaceValues[dropdown_name] || dropdown_name;
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