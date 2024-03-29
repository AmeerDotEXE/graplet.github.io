const embedCheckboxes = ['DESCRIPTION','TITLE','COLOUR','AUTHOR','FOOTER'];

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

embed_builder_method =   {
  saveExtraState: function() {
    return {
      'embedOptions': this.embedOptions,
    };
  },
  
  loadExtraState: function(state) {
    this.embedOptions = state['embedOptions'];
    this.updateShape();
  },
  decompose: function(workspace) {
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
    console.log(this.embedOptions)
    for (let i = 0; i < embedCheckboxes.length; i++) {
      this.removeInput(embedCheckboxes[i],true);
    }
    for (let i = 0; i < this.embedOptions.length; i++){
      option = this.embedOptions[i];
      parent = this.appendValueInput(option)
        .appendField(capitalizeFirstLetter(`${option.toLowerCase()}:`))
      if (Workspace && !parent.connection.targetConnection && !parent.sourceBlock.isInFlyout){
        var InputBlock = Workspace.newBlock('input')
          InputBlock.setShadow(true)
          InputBlock.initSvg()
          InputBlock.render();
        parent.connection.connect(InputBlock.outputConnection)
      }
    }
  }
}