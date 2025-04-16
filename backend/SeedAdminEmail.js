import mongoose from "mongoose";
import Admin from "./models/Admin.js"; // Adjust path if needed

mongoose.connect("mongodb://localhost:27017/attendance", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const assignRealEmails = async () => {
  try {
    const updates = [
      { adminId: "A001", email: "nandinidevi_nandyala@srmap.edu.in" },
      { adminId: "A002", email: "srivyshnavi_gadamsetty@srmap.edu.in" },
      { adminId: "A003", email: "srilakshmi_annapaneni@srmap.edu.in" }
    ];

    for (const entry of updates) {
      const result = await Admin.findOneAndUpdate(
        { adminId: entry.adminId },
        { $set: { email: entry.email } }
      );
      console.log(`✅ Set email for ${entry.adminId} ➜ ${entry.email}`);
    }

    console.log("🎯 All admin emails updated successfully!");
  } catch (error) {
    console.error("❌ Error updating admin emails:", error);
  } finally {
    mongoose.connection.close();
  }
};

assignRealEmails();
