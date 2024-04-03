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
