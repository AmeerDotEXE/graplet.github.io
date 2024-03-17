send_message_mutator_method =   {
  saveExtraState: function() {
    return {
      'itemCount': this.itemCount_,
    };
  },
  
  loadExtraState: function(state) {
    this.itemCount_ = state['itemCount'];
    this.updateShape();
  },
  decompose: function(workspace) {
    var topBlock = workspace.newBlock('options_actions_container');
    topBlock.initSvg();
  
    var connection = topBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      // TODO: Actual items naga
      var itemBlock = workspace.newBlock('lists_create_with_item');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
  
    return topBlock;
  },
  
  compose: function(topBlock) {
    var itemBlock = topBlock.getInputTargetBlock('STACK');

    var connections = [];
    while (itemBlock && !itemBlock.isInsertionMarker()) {
      connections.push(itemBlock.valueConnection_);
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  
    for (var i = 0; i < this.itemCount_; i++) {
      var connection = this.getInput('ADD' + i).connection.targetConnection;
      if (connection && connections.indexOf(connection) == -1) {
        connection.disconnect();
      }
    }
  
    this.itemCount_ = connections.length;
    this.updateShape();

  },
  updateShape: function() {
    for (var a = 0; a < this.itemCount_; a++)
        if (!this.getInput("ADD" + a)) {
          this.appendValueInput("ADD" + a)
        }
    for (a = this.itemCount_; this.getInput("ADD" + a); a++)
        this.removeInput("ADD" + a)
  }
}