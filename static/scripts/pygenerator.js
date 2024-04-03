python.pythonGenerator.forBlock['input'] = function(block, generator) {
  input = block.getFieldValue('TEXT')
  if (input == parseInt(input)){
    var code = `${input}`;
  }else{
    var code = `"${input}"`;
  }
  
  return [code, python.Order.NONE];
};

python.pythonGenerator.forBlock['colour_hsv_sliders'] = function (block,generator) {
  const code = generator.quote_(block.getFieldValue('COLOUR'));
  return [code, python.Order.ATOMIC];
};

python.pythonGenerator.forBlock['terminal_log'] = function(block, generator) {
  const LOG = generator.valueToCode(block, 'LOG', python.Order.ATOMIC);
  return `print${LOG}\n`
};
  
// ACTIONS
  
python.pythonGenerator.forBlock['bot_login'] = function(block, generator) {
  var token = generator.valueToCode(block, 'TOKEN_INPUT', python.Order.ATOMIC);
  var code = `client.run${token}`;
  return code;
};

python.pythonGenerator.forBlock['reaction_action'] = function(block, generator) {
  var action = block.getFieldValue('TYPE');
  var reaction = generator.valueToCode(block, 'REACTION', python.Order.ATOMIC);
  var message = generator.valueToCode(block, 'MESSAGE', python.Order.NONE);
  switch(action){
    case 'ADD':
      code = `await ${message}.add_reaction${reaction}\n`;
      break;
    case 'REMOVE':
      code = `await ${message}.clear_reaction${reaction}\n`;
      break;
    case 'REMOVE_ALL':
      code = `await ${message}.clear_reactions()\n`;
  }
  return code;
};

python.pythonGenerator.forBlock['response_reply'] = function(block, generator) {
   // TODO: change text to respond / reply based if Interaction.
  var status = block.getFieldValue('STATUS');
  var message = generator.valueToCode(block, 'MESSAGE', python.Order.NONE);
  var content = generator.valueToCode(block, 'CONTENT', python.Order.ATOMIC);
  var code = `await ${message}.reply${content}\n`;
  return code;
};

python.pythonGenerator.forBlock['bulk_delete'] = function(block, generator) {
  var channel = generator.valueToCode(block, 'CHANNEL', python.Order.NONE);
  var amount = generator.valueToCode(block, 'AMOUNT', python.Order.ATOMIC);
  var code = `await ${channel}.purge(limit=${amount})\n`;
  return code;
};

python.pythonGenerator.forBlock['channel_action'] = function(block, generator) {
  var action = block.getFieldValue('TYPE');
  var type = block.getFieldValue('CHANNELTYPE')
  var name = generator.valueToCode(block, 'NAME', python.Order.NONE);
  var guild = generator.valueToCode(block, 'GUILD', python.Order.NONE);
  var edit_channel = generator.valueToCode(block, 'EDIT', python.Order.NONE);
  var delete_channel = generator.valueToCode(block, 'DELETE', python.Order.NONE);
  switch(action){
    case 'CREATE':
      code = `await ${guild}.create_${type.toLowerCase()}_channel(name=${name})`
      if (type == 'ANNOUNCEMENT'){
        code = `await ${guild}.create_text_channel(name=${name},news=True)`
      }
      break;
    case 'EDIT':
      code = `await ${edit_channel}.edit(name=${name})`
      break;
    case 'DELETE':
      code = `await ${delete_channel}.delete()`
  }
  return code+"\n";
};

python.pythonGenerator.forBlock['message_action'] = function(block, generator) {
  var action = block.getFieldValue('TYPE');
  var channel = generator.valueToCode(block, 'SEND', python.Order.NONE);
  var edit_msg = generator.valueToCode(block, 'EDIT', python.Order.NONE);
  var delete_msg = generator.valueToCode(block, 'DELETE', python.Order.NONE);
  var message = generator.valueToCode(block, 'CONTENT', python.Order.ATOMIC);
  switch(action){
    case 'SEND':
      code = `await ${channel}.send${message}\n`
      break;
    case 'EDIT':
      code = `await ${edit_msg}.edit${message}\n`
      break;
    case 'DELETE':
      code = `await ${delete_msg}.delete()\n`
  }
  return code;
};

python.pythonGenerator.forBlock['role_action'] = function(block, generator) {
  var action = block.getFieldValue('TYPE');
  var guild = generator.valueToCode(block, 'CREATE', python.Order.NONE);
  var name = generator.valueToCode(block, 'NAME', python.Order.NONE);
  var role = generator.valueToCode(block, 'EDIT', python.Order.NONE) || generator.valueToCode(block, 'DELETE', python.Order.NONE);
  var colour = generator.valueToCode(block, 'COLOUR', python.Order.NONE)
  switch(action){
    case 'CREATE':
      code = `await ${guild}.create_role(name=${name},colour=${colour})`;
      break;
    case 'EDIT':
      code = `await ${role}.edit(name=${name},colour=${colour})`
      break;
    case 'DELETE':
      code = `await ${role}.delete()`
  }

  return code+"\n";
};

python.pythonGenerator.forBlock['change_guild_name'] = function(block, generator) {
  var new_name = generator.valueToCode(block, 'NAME', python.Order.ATOMIC);
  var guild = generator.valueToCode(block, 'GUILD', python.Order.NONE);
  var code = `await ${guild}.edit${new_name}\n`;
  return code;
};

python.pythonGenerator.forBlock['get_by_id'] = function(block, generator) {
  var instance = block.getFieldValue('INSTANCES');
  var id_input = generator.valueToCode(block, 'ID_INPUT', python.Order.NONE);
  if (['MEMBER', 'ROLE','MESSAGE'].includes(instance)) {
    method = generator.valueToCode(block, 'METHOD', python.Order.NONE);
    var code = `${method}.get_${instance.toLowerCase()}(${id_input})`;
  }else{
    var code = `client.get_${instance.toLowerCase()}(${id_input})`;
  }
  return [code, python.Order.NONE];
};


// EVENTS

let pyCustomEventListener = {
  booster_event: function(eventType, eventArgs) {
    //code
    return {
      eventType: "member_update",
      eventArgs: "event_OldMember, event_member",
      initialCode: /*py*/`
        event_Reboosted = event_member.premium_since != None and (event_member.premium_since != event_OldMember.premium_since)
        if event_Reboosted is not True:
          # check for booster role
          event_HadRole = next((x for x in event_OldMember.roles if x.is_premium_subscriber()), None)
          event_HasRole = next((x for x in event_member.roles if x.is_premium_subscriber()), None)

          if not (event_HadRole == None and event_HasRole != None): return
      `,
    };
  },
};

const pyeventListener = function(block,generator){
  let value_event = generator.valueToCode(block, 'EVENT', python.Order.NONE);
  const innerCode = generator.statementToCode(block, 'DO');
  const eventBlock = block.getInputTargetBlock("EVENT");
  let argsString = eventBlock?.genEventRags.map(x => "event_"+to_snake_case(x[0])).join(", ") || "";
  let initialCode = "";

  let customEvent = pyCustomEventListener[eventBlock?.type]?.(value_event,  eventBlock?.genEventRags);
  if (customEvent != null) {
    value_event = 'on_'+customEvent.eventType || value_event;
    argsString = customEvent.eventArgs;
    let initialCodeLines = customEvent.initialCode
      .split("\n")
      .filter((x,i,list) => !((i == 0 || i + 1 == list.length) && x.trim() == ""));
    let startSpaces = (initialCodeLines[0].length - initialCodeLines[0].trimStart().length);
    initialCode = initialCodeLines
      .map(x => "  "+x.slice(startSpaces))
      .join("\n")+"\n\n";
  }

  var code = `@client.event\nasync def ${value_event}(${argsString}):\n${initialCode}${innerCode}\n`;
  return code;
};

python.pythonGenerator.forBlock['once'] = pyeventListener;
python.pythonGenerator.forBlock['when'] = pyeventListener;

python.pythonGenerator.forBlock['event_arg_placeholder'] = function(block, generator) {
  var code = `event_${to_snake_case(block.eventArgOutput[0])}`;
  return [code, python.Order.NONE];
};

// EVENT BOOLS

python.pythonGenerator.forBlock['botready'] = pyEventConverter('ready')
python.pythonGenerator.forBlock['channel_event'] = pyEventConverter('guild_channel')
python.pythonGenerator.forBlock['message_event'] = pyEventConverter('message',['',null,null])
python.pythonGenerator.forBlock['message_reaction_event'] = pyEventConverter('reaction',[null,null,'_clear'])
python.pythonGenerator.forBlock['bot_guild_event'] = pyEventConverter('guild')
python.pythonGenerator.forBlock['guild_event'] = pyEventConverter('guild')
python.pythonGenerator.forBlock['guild_emoji_event'] = pyEventConverter('guild_emojis',['_update',null,'_update'])
python.pythonGenerator.forBlock['guild_sticker_event'] = pyEventConverter('guild_stickers',['_update',null,'_update'])
python.pythonGenerator.forBlock['guild_member_event'] = pyEventConverter('member',['_join',null,null])
python.pythonGenerator.forBlock['guild_member_moderate_event'] = pyEventConverter('member')
python.pythonGenerator.forBlock['guild_role_event'] = pyEventConverter('guild_role')
python.pythonGenerator.forBlock['guild_scheduled_event_event'] = pyEventConverter('scheduled_event')
python.pythonGenerator.forBlock['booster_event'] = pyEventConverter("")



// INSTANCES

let pyTypeProperties = {
  Message: function(parentValue, dropdown_value) {
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
  Member: function(parentValue, dropdown_value) {
    var code = "null";

    switch (dropdown_value) {
      case "USER":
        code = `${parentValue}`;
        break;
      case "ID":
        code = `${parentValue}.id`;
        break;
    }

    return code;
  },
};

python.pythonGenerator.forBlock['property_of'] = function(block, generator) {
  const PARENT = generator.valueToCode(block, 'VALUE_PARENT', python.Order.NONE);
  const CHILD = block.getFieldValue('VALUE');
  if (CHILD == "NONE") return ["null", python.Order.NONE];

  const ParentType = block.getInput("VALUE_PARENT").connection.targetConnection?.getCheck()?.[0];
  if (ParentType != null) {
    let code = pyTypeProperties[ParentType]?.(PARENT, CHILD);
    if (code) return [code, python.Order.NONE];
    }

  return ["null", python.Order.NONE];
};

python.pythonGenerator.forBlock['field_date'] = function(block, generator) {
  var time = block.getFieldValue('FIELDNAME');
  var code = time;
  return [code, python.Order.NONE];
};


python.pythonGenerator.forBlock['embed_builder'] = function(block, generator) {
  description = generator.valueToCode(block, 'DESCRIPTION', python.Order.NONE);
  title = generator.valueToCode(block, 'TITLE', python.Order.NONE);
  colour = generator.valueToCode(block, 'COLOUR', python.Order.NONE);

  author_name = generator.valueToCode(block, 'AUTHOR_NAME', python.Order.NONE);
  author_url = generator.valueToCode(block, 'AUTHOR_URL', python.Order.NONE);
  author_icon_url = generator.valueToCode(block, 'AUTHOR_ICON_URL', python.Order.NONE);

  footer_text = generator.valueToCode(block, 'FOOTER_TEXT', python.Order.NONE);
  footer_icon_url = generator.valueToCode(block, 'FOOTER_ICON_URL', python.Order.NONE);

  embed = 'discord.Embed('
  if(description){
    embed = embed.concat(`description=${description},`)
  }
  if(title){
    embed = embed.concat(`title=${title},`)
  }
  if(colour){
    embed = embed.concat(`colour=${colour},`)
  }
  embed = `${embed.slice(0, -1)})`
  if(author_name){
    embed = embed.concat(`.setauthor(name=${author_name},`)
    if (author_url){
      embed = embed.concat(`url=${author_url},`)
    }
    if (author_icon_url){
      embed = embed.concat(`icon_url=${author_icon_url},`)
    }
    embed = `${embed.slice(0, -1)})`
  }
  if(footer_text){
    embed = embed.concat(`.setauthor(text=${footer_text},`)
    if (footer_icon_url){
      embed = embed.concat(`icon_url=${footer_icon_url},`)
    }
    embed = `${embed.slice(0, -1)})`
  }
  return [embed, python.Order.NONE];
};

python.pythonGenerator.forBlock['token_input'] = function(block, generator) {
  var token = block.getFieldValue('TOKEN');
  return [`"${token}"`, python.Order.NONE];
};

function pyEventConverter(eventPrefix,manualCycle) {
  return function(block, generator) {
    var eventSuffix = '';
    var name = block.getFieldValue('EVENT');
    if (name == null) {
      block.genEventRags = globalEventArguments[block.type] || [];
    }
    else {
      block.genEventRags = globalEventArguments[block.type]?.[name] || [];
      const field = block.getField('EVENT');
      const cycleIndex = parseInt(field.menuGenerator_.map(option => option[1]).indexOf(field.selectedOption[1]));
      if (manualCycle != undefined && manualCycle[cycleIndex] != null){
        eventSuffix = manualCycle[cycleIndex];
      }else{
        eventSuffix = '_' + name.toLowerCase();
      }
    }
    var code = 'on_' + eventPrefix + eventSuffix;
    return [code, python.Order.NONE];
  };
}