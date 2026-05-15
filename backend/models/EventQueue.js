import mongoose from "mongoose";

const EventQueueSchema = new mongoose.Schema({
  type: String,
  payload: Object,
  processed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("EventQueue", EventQueueSchema);