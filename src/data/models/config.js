const mongoose = require("mongoose");


class ConfigModel {
    constructor(connection) {
        this.model = connection.model("Config", this._configModel(), "ConfigWISE");
    }
    getModel() {
        return this.model;
    }

    _configModel() {
        return new mongoose.Schema({
            token: String,
        });
    }
}

module.exports = ConfigModel;