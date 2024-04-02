const embedCheckboxes = ['DESCRIPTION','TITLE','COLOUR','AUTHOR','FOOTER'];
const embedFooterboxes = ['FOOTER_TEXT','FOOTER_ICON_URL']
const embedAuthorboxes = ['AUTHOR_NAME','AUTHOR_URL','AUTHOR_ICON_URL']

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

embed_builder_method =   {
  saveExtraState: function() {
    return {
      'embedOptions': this.embedOptions,
      'footerOptions': this.footerOptions,
      'authorOptions': this.authorOptions
    };
  },
  
  loadExtraState: function(state) {
    this.embedOptions = state['embedOptions'];
    this.footerOptions = state['footerOptions'];
    this.authorOptions = state['authorOptions'];
    this.updateShape();
  },
  decompose: function(workspace) {
    console.log('naga')
    var topBlock = workspace.newBlock('instances_options_embed_mutator');
    for (let i= 0; i < this.embedOptions.length; i++){
      topBlock.setFieldValue(true,this.embedOptions[i])
    }
    topBlock.initSvg();
    return topBlock;
  },
  
  compose: function(topBlock) {
    this.embedOptions = []
    for (let i = 0; i < embedCheckboxes.length; i++) {
      if (topBlock.getFieldValue(embedCheckboxes[i]) == 'TRUE'){
        this.embedOptions.push(embedCheckboxes[i])
      }
    }
    this.updateShape();
  },
  updateShape: function() {
    console.log(this)
    for (let i = 0; i < embedCheckboxes.length; i++) {
      this.removeInput(embedCheckboxes[i],true);
    }
    for (let i = 0; i < this.embedOptions.length; i++){
      option = this.embedOptions[i];
      if (option == 'FOOTER'){
        console.log(this.footerOptions)
      }else if (option == 'AUTHOR'){
        console.log(this.footerOptions)
      }else{
        parent = this.appendValueInput(option)
          .appendField(capitalizeFirstLetter(`${option.toLowerCase()}:`))
        if (Workspace && !parent.connection.targetConnection && !parent.sourceBlock.isInFlyout){
          if (option == 'COLOUR'){
            var InputBlock = Workspace.newBlock('colour_hsv_sliders')
          }else{
            var InputBlock = Workspace.newBlock('input')
          }
            InputBlock.setShadow(true)
            InputBlock.initSvg()
            InputBlock.render();
          parent.connection.connect(InputBlock.outputConnection)
        }
      }
    }
  }
}

function handleDispose(block,eventBlock){
  block.eventArgsList = eventBlock?.genEventRags || [];
  if (block.lastEventArgs == null) {
    block.lastEventArgs = [];
    block.connectedEventArgs = [];
  }
  
  //handle new block creation
  block.lastEventArgs.forEach((x,i) => {
    let argBlock = block.getInputTargetBlock("ARG"+(i+1));
    if (argBlock != null) {
      if (!block.connectedEventArgs.includes(argBlock)) {
        block.getInput("ARG"+(i+1)).connection.disconnect();
      }
      return;
    }
    
    var InputBlock = Workspace.newBlock('event_arg_placeholder');
    InputBlock.setFieldValue(x[0], "PLACEHOLDER");
    InputBlock.eventArgOutput = x;
    InputBlock.setOutput(true,x[1]);
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
      InputBlock.setOutput(true,element[1]);
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
}