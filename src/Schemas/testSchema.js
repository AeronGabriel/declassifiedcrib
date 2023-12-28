const { Schema, model } = require('mongoose');

let testSchema = new Schema({

    name: String
});

module.exports = model('testSchema123', testSchema);
