import { Schema, model } from "mongoose";

const userSchema = new Schema({
    nom : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique: (true)
    },
    motDePasse : {
        type : String,
        required : true
    },
    repeat_password : {
        type : String,
        required : true
    },
    photoDeProfil : {
        type : String,
        required : true
    },
    photos : [Schema.Types.ObjectId],
},{ timestamps: true });

const User = model("User", userSchema);

export default User;