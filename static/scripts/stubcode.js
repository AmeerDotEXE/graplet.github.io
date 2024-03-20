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
  return `console.log(${LOG});`};
  
// ACTIONS
  
javascript.javascriptGenerator.forBlock['client_login'] = function(block, generator) {
  var value_login_input = generator.valueToCode(block, 'LOGIN_INPUT', javascript.Order.ATOMIC);
  var value_token_input = generator.valueToCode(block, 'TOKEN_INPUT', javascript.Order.NONE);
  var code = `${value_login_input}.login(${value_token_input});`;
  return code;
};

javascript.javascriptGenerator.forBlock['add_reaction'] = function(block, generator) {
  var dropdown_action = block.getFieldValue('ACTION');
  var value_reaction = generator.valueToCode(block, 'REACTION', javascript.Order.ATOMIC);
  var value_message = generator.valueToCode(block, 'MESSAGE', javascript.Order.ATOMIC);
  // TODO: Assemble javascript into code variable.
  var code = '...\n';
  return code;
};

javascript.javascriptGenerator.forBlock['response_reply'] = function(block, generator) {
  var field_status = block.getFieldValue('STATUS');
  var value_message = generator.valueToCode(block, 'MESSAGE', javascript.Order.ATOMIC);
  var value_content = generator.valueToCode(block, 'CONTENT', javascript.Order.ATOMIC);
  // TODO: Assemble javascript into code variable.
  var code = '...\n';
  return code;
};

javascript.javascriptGenerator.forBlock['bulk_delete'] = function(block, generator) {
  var value_channel = generator.valueToCode(block, 'CHANNEL', javascript.Order.ATOMIC);
  var value_amount = generator.valueToCode(block, 'AMOUNT', javascript.Order.ATOMIC);
  // TODO: Assemble javascript into code variable.
  var code = '...\n';
  return code;
};

javascript.javascriptGenerator.forBlock['channel_action'] = function(block, generator) {
  var dropdown_action = block.getFieldValue('ACTION');
  // TODO: Assemble javascript into code variable.
  var code = '...\n';
  return code;
};

javascript.javascriptGenerator.forBlock['message_action'] = function(block, generator) {
  var dropdown_action = block.getFieldValue('ACTION');
  // TODO: Assemble javascript into code variable.
  var code = '...\n';
  return code;
};

javascript.javascriptGenerator.forBlock['role_action'] = function(block, generator) {
  var dropdown_action = block.getFieldValue('ACTION');
  // TODO: Assemble javascript into code variable.
  var code = '...\n';
  return code;
};

javascript.javascriptGenerator.forBlock['user_action'] = function(block, generator) {
  var dropdown_action = block.getFieldValue('ACTION');
  // TODO: Assemble javascript into code variable.
  var code = '...\n';
  return code;
};

javascript.javascriptGenerator.forBlock['change_guild_name'] = function(block, generator) {
  var dropdown_action = block.getFieldValue('ACTION');
  // TODO: Assemble javascript into code variable.
  var code = '...\n';
  return code;
};

javascript.javascriptGenerator.forBlock['get_by_id'] = function(block, generator) {
  var dropdown_instances = block.getFieldValue('INSTANCES');
  // TODO: Assemble javascript into code variable.
  var code = '...\n';
  return code;
};


// EVENTS

javascript.javascriptGenerator.forBlock['once'] = function(block, generator) {
  const client = generator.valueToCode(block, 'CLIENT', javascript.Order.ATOMIC);
  const value_event = generator.valueToCode(block, 'EVENT', javascript.Order.NONE);
  const innerCode = generator.statementToCode(block, 'DO');
  var code = `${client}.once(${value_event}=>{\n${innerCode}\n});`;
  return code;
};

javascript.javascriptGenerator.forBlock['when'] = function(block, generator) {
  const client = generator.valueToCode(block, 'CLIENT', javascript.Order.ATOMIC);
  const value_event = generator.valueToCode(block, 'EVENT', javascript.Order.NONE);
  const innerCode = generator.statementToCode(block, 'DO');
  var code = `${client}.once(${value_event}=>{\n${innerCode}\n});`;
  return code;
};

// EVENT BOOLS

javascript.javascriptGenerator.forBlock['channel_event'] = function(block, generator) {
  var dropdown_name = block.getFieldValue('EVENT');
  console.log(dropdown_name)
  
  // TODO: get all possible dropdowns
  var code = '...';
  // TODO: Change Order.NONE to the correct strength.
  return [code, javascript.Order.NONE];
};

javascript.javascriptGenerator.forBlock['emoji_event'] = function(block, generator) {
  var dropdown_name = block.getFieldValue('NAME');
  // TODO: Assemble javascript into code variable.
  var code = '...';
  // TODO: Change Order.NONE to the correct strength.
  return [code, javascript.Order.NONE];
};

javascript.javascriptGenerator.forBlock['clientready'] = function(block, generator) {
  var code = 'Events.ClientReady';
  return [code, javascript.Order.NONE];
};


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

javascript.javascriptGenerator.forBlock['client'] = function(block, generator) {
  // TODO: add mutators
  var code = 'new Client';
  return [code, javascript.Order.NONE];
};

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

