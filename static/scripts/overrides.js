Blockly.Blocks['variables_set'] = {
  init: function() {
    this.jsonInit({
      type: "variables_set",
      message0: "%{BKY_VARIABLES_SET}",
      args0: [{
          type: "field_variable",
          name: "VAR",
          variable: "%{BKY_VARIABLES_DEFAULT_NAME}"
      }, {
          type: "input_value",
          name: "VALUE"
      }],
      previousStatement: null,
      nextStatement: null,
      style: "variable_blocks",
      tooltip: "%{BKY_VARIABLES_SET_TOOLTIP}",
      helpUrl: "%{BKY_VARIABLES_SET_HELPURL}",
      extensions: ["contextMenu_variableSetterGetter"]
  })
  parentBlock = this.getInput('VALUE')
  if (this.rendered && Workspace && !parentBlock.connection.targetConnection && !parentBlock.sourceBlock.isInFlyout){
    var InputBlock = Workspace.newBlock('input')
      InputBlock.setShadow(true)
      InputBlock.initSvg()
      InputBlock.render();
    parentBlock.connection.connect(InputBlock.outputConnection)
  }
  }
};


Blockly.Blocks['text_join'] = {
  init: function() {
    this.jsonInit({type: "text_join",message0: "",output: "String",style: "text_blocks",helpUrl: "%{BKY_TEXT_JOIN_HELPURL}",tooltip: "%{BKY_TEXT_JOIN_TOOLTIP}",mutator: "text_join_mutator"})
  },
  onchange: function(){
    for (let i = 0; i < this.inputList.length; i++){
      parentBlock = this.getInput(`ADD${i}`)
      if (parentBlock && this.rendered && Workspace && !parentBlock.connection.targetConnection && !parentBlock.sourceBlock.isInFlyout){
        if (!Workspace.isDragging()){
          var InputBlock = Workspace.newBlock('input')
          InputBlock.setShadow(true)
          InputBlock.initSvg()
          InputBlock.render();
          parentBlock.connection.connect(InputBlock.outputConnection)
        }
      }
    }
  }
};
