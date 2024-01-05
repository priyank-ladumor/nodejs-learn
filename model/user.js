const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: String,
    user_pic: [String],
    mobile: Number,
    email: {
        type: String,
        index: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message: props => `${props.value} is not a valid email`
        },
        required: [true, 'Please provide an email']
    },
    password: { type: String, minLength: 6, required: true },
    watchlater: [String],
    token: String
});

exports.user = mongoose.model("user", userSchema);