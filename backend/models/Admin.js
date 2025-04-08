import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    adminId: { type: String, required: true },
    name: { type: String, required: true },
    dob: { type: String, required: true },
    password: { type: String, required: true },
});

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
