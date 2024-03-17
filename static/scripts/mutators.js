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
    // TODO : check for checked and then add items
    this.embedOptions = []
    this.updateShape();
  },
  updateShape: function() {
    // TODO: add value inputs based on list
    console.log(this.embedOptions)
  }
}