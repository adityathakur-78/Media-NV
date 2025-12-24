import EventEmitter from "events";

const emitter = new EventEmitter();

emitter.on("orderPlaced", (item) => {
  console.log(`Order received for ${item}`);
});

emitter.emit("orderPlaced", "Pizza");
