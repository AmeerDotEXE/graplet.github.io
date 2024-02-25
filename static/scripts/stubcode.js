javascript.javascriptGenerator.forBlock['text_input'] = function(block, generator) {
  var code = `"${block.getFieldValue('TEXT')}"`;
  return [code, javascript.Order.NONE];
};


javascript.javascriptGenerator.forBlock['console_log'] = function(block, generator) {
  const LOG = generator.valueToCode(block, 'LOG', javascript.Order.NONE);
  return `console.log(${LOG});`};
  
// ACTIONS
  
  javascript.javascriptGenerator.forBlock['client_login'] = function(block, generator) {
    var value_login_input = generator.valueToCode(block, 'LOGIN_INPUT', javascript.Order.ATOMIC);
    var value_token_input = generator.valueToCode(block, 'TOKEN_INPUT', javascript.Order.ATOMIC);
    // TODO: Assemble javascript into code variable.
    var code = '...\n';
    return code;
  };

// EVENTS

javascript.javascriptGenerator.forBlock['project_run'] = function(block, generator) {
  // TODO: Assemble javascript into code variable.
  var code = '...\n';
  return code;
};

javascript.javascriptGenerator.forBlock['once'] = function(block, generator) {
  var value_event = generator.valueToCode(block, 'EVENT', javascript.Order.ATOMIC);
  // TODO: Assemble javascript into code variable.
  var code = '...\n';
  return code;
};

javascript.javascriptGenerator.forBlock['when'] = function(block, generator) {
  var value_event = generator.valueToCode(block, 'EVENT', javascript.Order.ATOMIC);
  // TODO: Assemble javascript into code variable.
  var code = '...\n';
  return code;
};

// EVENT BOOLS

javascript.javascriptGenerator.forBlock['channel_event'] = function(block, generator) {
  var dropdown_name = block.getFieldValue('NAME');
  // TODO: Assemble javascript into code variable.
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
  // TODO: Assemble javascript into code variable.
  var code = '...';
  // TODO: Change Order.NONE to the correct strength.
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

javascript.javascriptGenerator.forBlock['events_of'] = function(block, generator) {
  var value_event = generator.valueToCode(block, 'EVENT', javascript.Order.ATOMIC);
  // TODO: Assemble javascript into code variable.
  var code = '...';
  // TODO: Change Order.NONE to the correct strength.
  return [code, javascript.Order.NONE];
};

javascript.javascriptGenerator.forBlock['client'] = function(block, generator) {
  // TODO: Assemble javascript into code variable.
  var code = '...';
  // TODO: Change Order.NONE to the correct strength.
  return [code, javascript.Order.NONE];
};