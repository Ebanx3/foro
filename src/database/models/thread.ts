import { Schema, model, models } from "mongoose";

const ThreadSchema = new Schema({
    ownerInfo: { type: Object, required: true },
    title: { type: String, required: true },
    messages: { type: [Schema.Types.ObjectId], ref: 'Message' },
    lastCommenter: { type: String, required: true },
    category: { type: String, required: true },
    type: { type: String, required: true }
}, {
    versionKey: false,
    timestamps: true
})



export default models.Thread || model('Thread', ThreadSchema);