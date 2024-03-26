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
    topBlock.initSvg();
    return topBlock;
  },
  
  compose: function(topBlock) {
    this.embedOptions = []
    for (let i = 0; i < embedCheckboxes.length; i++) {
      this.embedOptions.push(topBlock.getFieldValue(embedCheckboxes[i]))
    }
    this.updateShape();
  },
  updateShape: function() {
    if (this.embedOptions){
      for (let i=0; i < this.embedOptions.length; i++){
        if (this.embedOptions[i] == 'TRUE'){
          value = embedCheckboxes[i]
          this.appendValueInput(value)
            .appendField(`${capitalizeFirstLetter(value.toLowerCase())}:`)
        }
      }
    }
  }
}