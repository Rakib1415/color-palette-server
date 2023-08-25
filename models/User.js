const { model, Schema } = require('mongoose');

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: [2, 'name is too short'],
            maxlength: [20, 'name is too long'],
        },
        email: {
            type: String,
            required: true,
            validate: {
                validator(v) {
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
                },
                message: (props) => `Invalid email ${props.value}`,
            },
        },
        password: {
            type: String,
            required: true,
            minlength: [6, 'password is too short'],
        },
        confirmPassword: {
            type: String,
            required: true,
            minlength: [6, 'password is too short'],
        },
    },
    { timestamps: true }
);

const User = model('User', userSchema);

module.exports = User;
