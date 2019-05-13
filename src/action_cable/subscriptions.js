import Subscription from './subscription'

var slice = [].slice, Subscriptions;

export default Subscriptions = (function() {
  function Subscriptions(consumer) {
    this.consumer = consumer;
    this.subscriptions = [];
  }

  Subscriptions.prototype.create = function(channelName, mixin) {
    var channel, params, subscription;
    channel = channelName;
    params = typeof channel === "object" ? channel : {
      channel: channel
    };
    subscription = new Subscription(this.consumer, params, mixin);
    return this.add(subscription);
  };

  Subscriptions.prototype.add = function(subscription) {
    this.subscriptions.push(subscription);
    this.consumer.ensureActiveConnection();
    this.notify(subscription, "initialized");
    this.sendCommand(subscription, "subscribe");
    return subscription;
  };

  Subscriptions.prototype.remove = function(subscription) {
    this.forget(subscription);
    if (!this.findAll(subscription.identifier).length) {
      this.sendCommand(subscription, "unsubscribe");
    }
    return subscription;
  };

  Subscriptions.prototype.reject = function(identifier) {
    var i, len, ref, results, subscription;
    ref = this.findAll(identifier);
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      subscription = ref[i];
      this.forget(subscription);
      this.notify(subscription, "rejected");
      results.push(subscription);
    }
    return results;
  };

  Subscriptions.prototype.forget = function(subscription) {
    var s;
    this.subscriptions = (function() {
      var i, len, ref, results;
      ref = this.subscriptions;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        s = ref[i];
        if (s !== subscription) {
          results.push(s);
        }
      }
      return results;
    }).call(this);
    return subscription;
  };

  Subscriptions.prototype.findAll = function(identifier) {
    var i, len, ref, results, s;
    ref = this.subscriptions;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      s = ref[i];
      if (s.identifier === identifier) {
        results.push(s);
      }
    }
    return results;
  };

  Subscriptions.prototype.reload = function() {
    var i, len, ref, results, subscription;
    ref = this.subscriptions;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      subscription = ref[i];
      results.push(this.sendCommand(subscription, "subscribe"));
    }
    return results;
  };

  Subscriptions.prototype.notifyAll = function() {
    var args, callbackName, i, len, ref, results, subscription;
    callbackName = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    ref = this.subscriptions;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      subscription = ref[i];
      results.push(this.notify.apply(this, [subscription, callbackName].concat(slice.call(args))));
    }
    return results;
  };

  Subscriptions.prototype.notify = function() {
    var args, callbackName, i, len, results, subscription, subscriptions;
    subscription = arguments[0], callbackName = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
    if (typeof subscription === "string") {
      subscriptions = this.findAll(subscription);
    } else {
      subscriptions = [subscription];
    }
    results = [];
    for (i = 0, len = subscriptions.length; i < len; i++) {
      subscription = subscriptions[i];
      results.push(typeof subscription[callbackName] === "function" ? subscription[callbackName].apply(subscription, args) : void 0);
    }
    return results;
  };

  Subscriptions.prototype.sendCommand = function(subscription, command) {
    var identifier;
    identifier = subscription.identifier;
    return this.consumer.send({
      command: command,
      identifier: identifier
    });
  };

  return Subscriptions;

})();
