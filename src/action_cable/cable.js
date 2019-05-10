import Consumer from './consumer'
import INTERNAL from './internal'
var slice = [].slice;

const ActionCable = {
  INTERNAL: INTERNAL,
  createConsumer: function(url) {
    return new Consumer(url);
  },
  startDebugging: function() {
    return this.debugging = true;
  },
  stopDebugging: function() {
    return this.debugging = null;
  },
  log: function() {
    var messages, ref;
    messages = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    if (this.debugging) {
      messages.push(Date.now());
      return console.log(["[ActionCable]"].concat(slice.call(messages)));
    }
  }
};

export default ActionCable
