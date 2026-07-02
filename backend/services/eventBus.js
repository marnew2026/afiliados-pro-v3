import { EventEmitter } from "events";

class EventBus extends EventEmitter {
  add(event, data) {
    this.emit(event, data);
  }
}

export const eventBus = new EventBus();