const mongoose = require("mongoose")
	  const hack = mongoose.Schema({
	    ServerId:String,
        UserId:String,
	    Exists:Number
	})
module.exports = mongoose.model("hack", hack)