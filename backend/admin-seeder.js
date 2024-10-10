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
<<<<<<< HEAD
            loginid: 1,
=======
            loginid: 1234,
>>>>>>> 73285f4e773f6b08e456cbcc055facd8fddf83b9
            password: "admin123"
        });

        const adminDetail = {
            employeeId: "1",
            firstName: "Shubham",
            middleName: "",
            lastName: "Mukherjee",
            email: "mukherjeeshubham18@gmail.com",
            phoneNumber: "123456789",
            gender: "Male",
            type: "Admin",
            profile: "http://icongal.com/gallery/image/212948/admin_administrator_user_person_customer_face.png",
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
