import { Schema, model, models } from "mongoose";

const MessageSchema = new Schema({
    userInfo: { type: Object, required: true },
    content: { type: String, required: true },
    likes: { type: Number, default: 0 },
    threadId: { type: Schema.Types.ObjectId, ref: 'Thread' }

}, {
    versionKey: false,
    timestamps: true
})



export default models.Message || model('Message', MessageSchema);