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

python.pythonGenerator.forBlock['console_log'] = function(block, generator) {
  const LOG = generator.valueToCode(block, 'LOG', python.Order.NONE);
  return `print(${LOG})`};
  
// ACTIONS
  
python.pythonGenerator.forBlock['client_login'] = function(block, generator) {
  var value_login_input = generator.valueToCode(block, 'LOGIN_INPUT', python.Order.ATOMIC);
  var value_token_input = generator.valueToCode(block, 'TOKEN_INPUT', python.Order.NONE);
  var code = `${value_login_input}.run(${value_token_input})`;
  return code;
};

python.pythonGenerator.forBlock['add_reaction'] = function(block, generator) {
  var dropdown_action = block.getFieldValue('ACTION');
  var value_reaction = generator.valueToCode(block, 'REACTION', python.Order.ATOMIC);
  var value_message = generator.valueToCode(block, 'MESSAGE', python.Order.ATOMIC);
  // TODO: Assemble javascript into code variable.
  var code = '...\n';
  return code;
};

python.pythonGenerator.forBlock['response_reply'] = function(block, generator) {
  var field_status = block.getFieldValue('STATUS');
  var value_message = generator.valueToCode(block, 'MESSAGE', python.Order.ATOMIC);
  var value_content = generator.valueToCode(block, 'CONTENT', python.Order.ATOMIC);
  // TODO: Assemble javascript into code variable.
  var code = '...\n';
  return code;
};

python.pythonGenerator.forBlock['bulk_delete'] = function(block, generator) {
  var value_channel = generator.valueToCode(block, 'CHANNEL', python.Order.ATOMIC);
  var value_amount = generator.valueToCode(block, 'AMOUNT', python.Order.ATOMIC);
  // TODO: Assemble javascript into code variable.
  var code = '...\n';
  return code;
};

python.pythonGenerator.forBlock['channel_action'] = function(block, generator) {
  var dropdown_action = block.getFieldValue('ACTION');
  // TODO: Assemble javascript into code variable.
  var code = '...\n';
  return code;
};

python.pythonGenerator.forBlock['message_action'] = function(block, generator) {
  var dropdown_action = block.getFieldValue('ACTION');
  // TODO: Assemble javascript into code variable.
  var code = '...\n';
  return code;
};

python.pythonGenerator.forBlock['role_action'] = function(block, generator) {
  var dropdown_action = block.getFieldValue('ACTION');
  // TODO: Assemble javascript into code variable.
  var code = '...\n';
  return code;
};

python.pythonGenerator.forBlock['user_action'] = function(block, generator) {
  var dropdown_action = block.getFieldValue('ACTION');
  // TODO: Assemble javascript into code variable.
  var code = '...\n';
  return code;
};

python.pythonGenerator.forBlock['change_guild_name'] = function(block, generator) {
  var dropdown_action = block.getFieldValue('ACTION');
  // TODO: Assemble javascript into code variable.
  var code = '...\n';
  return code;
};

python.pythonGenerator.forBlock['get_by_id'] = function(block, generator) {
  var dropdown_instances = block.getFieldValue('INSTANCES');
  // TODO: Assemble javascript into code variable.
  var code = '...\n';
  return code;
};


// EVENTS

python.pythonGenerator.forBlock['once'] = function(block, generator) {
  const client = generator.valueToCode(block, 'CLIENT', python.Order.ATOMIC);
  const value_event = generator.valueToCode(block, 'EVENT', python.Order.NONE);
  const innerCode = generator.statementToCode(block, 'DO');
  var code = `@${client}.event\nasync def ${value_event}\n${innerCode}\n`;
  return code;
};

python.pythonGenerator.forBlock['when'] = function(block, generator) {
  const client = generator.valueToCode(block, 'CLIENT', python.Order.ATOMIC);
  const value_event = generator.valueToCode(block, 'EVENT', python.Order.NONE);
  const innerCode = generator.statementToCode(block, 'DO');
  var code = `@${client}.event\nasync def ${value_event}\n${innerCode}\n`;
  return code;
};

// EVENT BOOLS

python.pythonGenerator.forBlock['channel_event'] = function(block, generator) {
  var dropdown_name = block.getFieldValue('EVENT');
  console.log(dropdown_name)
  
  // TODO: get all possible dropdowns
  var code = '...';
  // TODO: Change Order.NONE to the correct strength.
  return [code, python.Order.NONE];
};

python.pythonGenerator.forBlock['emoji_event'] = function(block, generator) {
  var dropdown_name = block.getFieldValue('NAME');
  // TODO: Assemble javascript into code variable.
  var code = '...';
  // TODO: Change Order.NONE to the correct strength.
  return [code, python.Order.NONE];
};

python.pythonGenerator.forBlock['clientready'] = function(block, generator) {
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

python.pythonGenerator.forBlock['client'] = function(block, generator) {
  // TODO: add mutators
  var code = 'discord.Client(intents=discord.Intents.all())';
  return [code, python.Order.NONE];
};

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

