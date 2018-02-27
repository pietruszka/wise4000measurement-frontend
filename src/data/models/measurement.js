const mongoose = require("mongoose");


class MeasurementModel {
    constructor(connection) {
        this.model = connection.model("Measurement", this._measurementModel(), "MeasurementWISE");
    }
    getModel() {
        return this.model;
    }

    _measurementModel() {
        return new mongoose.Schema({
            ch: Number,
            val: Number,
            date: {
                type: Date,
                default: new Date()
            }
        });
    }
}

module.exports = MeasurementModel;