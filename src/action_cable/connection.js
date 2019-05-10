import ConnectionMonitor  from './connection_monitor'
import INTERNAL from './internal'
import ActionCable from './cable'

var i, message_types, ref,
  slice = [].slice,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

ref = INTERNAL
message_types = ref.message_types


var Connection = (function() {
  Connection.reopenDelay = 500;

  function Connection(consumer) {
    this.consumer = consumer;
    this.open = bind(this.open, this);
    this.subscriptions = this.consumer.subscriptions;
    this.monitor = new ConnectionMonitor(this);
    this.disconnected = true;
  }

  Connection.prototype.send = function(data) {
    if (this.isOpen()) {
      this.webSocket.send(JSON.stringify(data));
      return true;
    } else {
      return false;
    }
  };

  Connection.prototype.open = function() {
    if (this.isActive()) {
      ActionCable.log("Attempted to open WebSocket, but existing socket is " + (this.getState()));
      return false;
    } else {
      ActionCable.log("Opening WebSocket, current state is " + (this.getState()));
      if (this.webSocket != null) {
        this.uninstallEventHandlers();
      }
      this.webSocket = new WebSocket(this.consumer.url);
      this.installEventHandlers();
      this.monitor.start();
      return true;
    }
  };

  Connection.prototype.close = function(arg) {
    var allowReconnect, ref1;
    allowReconnect = (arg != null ? arg : {
      allowReconnect: true
    }).allowReconnect;
    if (!allowReconnect) {
      this.monitor.stop();
    }
    if (this.isActive()) {
      return (ref1 = this.webSocket) != null ? ref1.close() : void 0;
    }
  };

  Connection.prototype.reopen = function() {
    var error;
    ActionCable.log("Reopening WebSocket, current state is " + (this.getState()));
    if (this.isActive()) {
      try {
        return this.close();
      } catch (_error) {
        error = _error;
        return ActionCable.log("Failed to reopen WebSocket", error);
      } finally {
        ActionCable.log("Reopening WebSocket in " + this.constructor.reopenDelay + "ms");
        setTimeout(this.open, this.constructor.reopenDelay);
      }
    } else {
      return this.open();
    }
  };

  Connection.prototype.isOpen = function() {
    return this.isState("open");
  };

  Connection.prototype.isActive = function() {
    return this.isState("open", "connecting");
  };

  Connection.prototype.isState = function() {
    var ref1, states;
    states = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return ref1 = this.getState(), indexOf.call(states, ref1) >= 0;
  };

  Connection.prototype.getState = function() {
    var ref1, state, value;
    for (state in WebSocket) {
      value = WebSocket[state];
      if (value === ((ref1 = this.webSocket) != null ? ref1.readyState : void 0)) {
        return state.toLowerCase();
      }
    }
    return null;
  };

  Connection.prototype.installEventHandlers = function() {
    var eventName, handler;
    for (eventName in this.events) {
      handler = this.events[eventName].bind(this);
      this.webSocket["on" + eventName] = handler;
    }
  };

  Connection.prototype.uninstallEventHandlers = function() {
    var eventName;
    for (eventName in this.events) {
      this.webSocket["on" + eventName] = function() {};
    }
  };

  Connection.prototype.events = {
    message: function(event) {
      var identifier, message, ref1, type;

      ref1 = JSON.parse(event.data), identifier = ref1.identifier, message = ref1.message, type = ref1.type;
      switch (type) {
        case message_types.welcome:
          this.monitor.recordConnect();
          return this.subscriptions.reload();
        case message_types.ping:
          return this.monitor.recordPing();
        case message_types.confirmation:
          return this.subscriptions.notify(identifier, "connected");
        case message_types.rejection:
          return this.subscriptions.reject(identifier);
        default:
          return this.subscriptions.notify(identifier, "received", message);
      }
    },
    open: function() {
      ActionCable.log("WebSocket onopen event");
      this.disconnected = false;
    },
    close: function(event) {
      ActionCable.log("WebSocket onclose event");
      if (this.disconnected) {
        return;
      }
      this.disconnected = true;
      this.monitor.recordDisconnect();
      return this.subscriptions.notifyAll("disconnected", {
        willAttemptReconnect: this.monitor.isRunning()
      });
    },
    error: function() {
      return ActionCable.log("WebSocket onerror event");
    }
  };

  return Connection;

})();

export default Connection;
