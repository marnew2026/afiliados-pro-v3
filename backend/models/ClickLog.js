import mongoose from "mongoose";

const ClickLogSchema = new mongoose.Schema(
{
    campaignId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Campaign",
        required:true,
        index:true
    },

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        index:true
    },

    ip:String,

    userAgent:String,

    referer:String

},
{
    timestamps:true
});

export default mongoose.model(
    "ClickLog",
    ClickLogSchema
);