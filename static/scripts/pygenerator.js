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
  var token = generator.valueToCode(block, 'TOKEN_INPUT', javascript.Order.ATOMIC);
  var code = `client.run${token}`;
  return code;
};

python.pythonGenerator.forBlock['reaction_action'] = function(block, generator) {
  var action = block.getFieldValue('TYPE');
  var reaction = generator.valueToCode(block, 'REACTION', python.Order.ATOMIC);
  var message = generator.valueToCode(block, 'MESSAGE', python.Order.ATOMIC);
  switch(action){
    case 'ADD':
      code = `await ${message}.add_reaction${reaction}`;
      break;
    case 'REMOVE':
      code = `await ${message}.clear_reaction${reaction}`;
      break;
    case 'REMOVE_ALL':
      code = `await ${message}.clear_reactions()`
  }
  return code;
};

python.pythonGenerator.forBlock['response_reply'] = function(block, generator) {
   // TODO: change text to respond / reply based if Interaction.
  var status = block.getFieldValue('STATUS');
  var message = generator.valueToCode(block, 'MESSAGE', python.Order.NONE);
  var content = generator.valueToCode(block, 'CONTENT', python.Order.ATOMIC);
  var code = `await ${message}.reply(${content})`;
  return code;
};

python.pythonGenerator.forBlock['bulk_delete'] = function(block, generator) {
  var channel = generator.valueToCode(block, 'CHANNEL', python.Order.NONE);
  var amount = generator.valueToCode(block, 'AMOUNT', python.Order.ATOMIC);
  var code = `await ${channel}.purge(limit=${amount})`;
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
  return code;
};

python.pythonGenerator.forBlock['message_action'] = function(block, generator) {
  var action = block.getFieldValue('TYPE');
  var channel = generator.valueToCode(block, 'SEND', python.Order.NONE);
  var edit_msg = generator.valueToCode(block, 'EDIT', python.Order.NONE);
  var delete_msg = generator.valueToCode(block, 'DELETE', python.Order.NONE);
  var message = generator.valueToCode(block, 'CONTENT', python.Order.ATOMIC);
  switch(action){
    case 'SEND':
      code = `await ${channel}.send${message}`
      break;
    case 'EDIT':
      code = `await ${edit_msg}.edit${message}`
      break;
    case 'DELETE':
      code = `await ${delete_msg}.delete()`
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

  return code;
};

python.pythonGenerator.forBlock['change_guild_name'] = function(block, generator) {
  var new_name = generator.valueToCode(block, 'NAME', python.Order.ATOMIC);
  var guild = generator.valueToCode(block, 'GUILD', python.Order.NONE);
  var code = `await ${guild}.edit${new_name}`;
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

function pyEventConverter(eventPrefix,manualCycle) {
  return function(block, generator) {
    const field = block.getField('EVENT')
    const cycleIndex = parseInt(field.menuGenerator_.map(option => option[1]).indexOf(field.selectedOption[1]));
    var name = block.getFieldValue('EVENT');
    if (manualCycle != undefined && manualCycle[cycleIndex] != null){
      var code = 'on_' + eventPrefix + manualCycle[cycleIndex] + '():'
    }else{
      var code = 'on_'+eventPrefix + '_' + name.toLowerCase() + '():';
    }
    return [code, python.Order.NONE];
  };
}

python.pythonGenerator.forBlock['once'] = function(block, generator) {
  const value_event = generator.valueToCode(block, 'EVENT', python.Order.NONE);
  const innerCode = generator.statementToCode(block, 'DO');
  var code = `@client.event\nasync def ${value_event}\n${innerCode}\n`;
  return code;
};

python.pythonGenerator.forBlock['when'] = function(block, generator) {
  const value_event = generator.valueToCode(block, 'EVENT', python.Order.NONE);
  const innerCode = generator.statementToCode(block, 'DO');
  var code = `@client.event\nasync def ${value_event}\n${innerCode}\n`;
  return code;
};

// EVENT BOOLS

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


python.pythonGenerator.forBlock['botready'] = function(block, generator) {
  var code = 'on_ready():';
  return [code, python.Order.NONE];
};

// INSTANCES

python.pythonGenerator.forBlock['property_of'] = function(block, generator) {
  const PARENT = generator.valueToCode(block, 'VALUE_PARENT', python.Order.ATOMIC);
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

python.pythonGenerator.forBlock['field_date'] = function(block, generator) {
  var time = block.getFieldValue('FIELDNAME');
  var code = time;
  return [code, python.Order.NONE];
};


python.pythonGenerator.forBlock['embed_builder'] = function(block, generator) {
  // TODO: add mutators & Code
  var code = '\n';
  return [code, python.Order.NONE];
};

python.pythonGenerator.forBlock['token_input'] = function(block, generator) {
  var token = block.getFieldValue('TOKEN');
  return [`"${token}"`, python.Order.NONE];
};