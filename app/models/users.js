import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    emailAddress: String,
    userType: String
},
{
    timestamps: true,
    collection: 'users'
});

export default mongoose.model('User', UserSchema);