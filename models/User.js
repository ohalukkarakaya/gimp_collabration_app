import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        linkedUsers: {
            type: Array,
            default: []
        },
        projects: {
            type: Array,
            default: []
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("User", UserSchema);