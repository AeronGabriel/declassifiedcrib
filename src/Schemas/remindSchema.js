const { model, Schema } = require('mongoose');

let reminderSchema = new Schema ({
    User: String,
    Time: String,
    Remind: String,
})

module.exports = model("rSch", reminderSchema);