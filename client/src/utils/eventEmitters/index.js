class BrightkyEmitter {
  constructor() {
    this._state = {};
    this._callbacks = {};
    this._stateProxy = new Proxy(this._state, {
      set: (target, property, newValue, receiver) => {
        var _a;
        target[property] = newValue;
        (_a = this._callbacks[property]) === null || _a === void 0
          ? void 0
          : _a.forEach((el, idx) => {
              if (el.callback) {
                if (!el.once) el.callback(newValue);
                else if (!el.executed) {
                  this._callbacks[property][idx].executed = true;
                  el.callback(newValue);
                }
              }
            });
        return true;
      },
    });
  }
  on(eventName, callback) {
    if (Array.isArray(this._callbacks[eventName])) {
      this._callbacks[eventName].push({
        callback,
        once: false,
      });
    } else {
      this._callbacks[eventName] = [{ callback, once: false }];
    }
  }
  emit(eventName, data) {
    this._stateProxy[eventName] = data;
  }
  once(eventName, callback) {
    if (Array.isArray(this._callbacks[eventName])) {
      this._callbacks[eventName].push({
        callback,
        once: true,
      });
    } else {
      this._callbacks[eventName] = [{ callback, once: true }];
    }
  }
}
export default BrightkyEmitter;
