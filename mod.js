const mongoose = require("mongoose")
	  const mod = mongoose.Schema({
	    ServerId:String,
        UserId:String,
        Warnings:Array,
	    Exists:Number
	})
module.exports = mongoose.model("mod", mod)