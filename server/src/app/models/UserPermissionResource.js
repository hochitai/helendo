const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserPermissionResource = new Schema(
    {
        userID: { type: Schema.Types.ObjectId, ref: "User" },
        resourceID: { type: Number, require: true },
        permission: { type: Boolean, require: true },
    },
    {
        collection: "userPermissionResources",
    }
);

module.exports = mongoose.model("UserPermissionResource", UserPermissionResource);
