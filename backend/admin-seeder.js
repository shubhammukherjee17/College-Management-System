const adminDetails = require("./models/Admin/details.model.js");
const adminCredential = require("./models/Admin/credential.model.js");
const connectToMongo = require("./Database/db.js");
const mongoose = require("mongoose");

const seedData = async () => {
    try {
        await connectToMongo();

        await adminCredential.deleteMany({})
        await adminDetails.deleteMany({})

        await adminCredential.create({
            loginid: 8989,
            password: "admin123"
        });

        const adminDetail = {
            employeeId: "01",
            firstName: "Shubham",
            middleName: " ",
            lastName: "Mukherjee",
            email: "mukherjeeshubham18@gmail.com",
            phoneNumber: "1234567890",
            gender: "Male",
            type: "Admin",
            profile: "Shubham.jpg",
        };

        await adminDetails.create(adminDetail);

        console.log("Seeding completed successfully!");
    } catch (error) {
        console.error("Error while seeding:", error);
    } finally {
        await mongoose.connection.close();
        process.exit();
    }
};

seedData();
