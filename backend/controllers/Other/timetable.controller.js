const Timetable = require("../../models/Other/timetable.model");
const uploadImage = require("../../services/cloudinaryService.js")

const getTimetable = async (req, res) => {
    try {
        let timetable = await Timetable.find(req.body);
        if (timetable) {
            res.json(timetable);
        } else {
            res.status(404).json({ success: false, message: "Timetable Not Found" });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const addTimetable = async (req, res) => {
    let { semester, branch } = req.body;

    let imageUrl = '';

    if (req.file) {
        try {
            console.log(req.file);
            imageUrl = await uploadImage(req.file);
        } catch (error) {
            return res.status(500).json({ message: 'Error uploading image to Cloudinary', error: error.message });
        }
    }

    try {
        let timetable = await Timetable.findOne({ semester, branch });

        if (timetable) {
            await Timetable.findByIdAndUpdate(timetable._id, {
                semester, branch, link: imageUrl
            });
            const data = {
                success: true,
                message: "Timetable Updated!",
            };
            res.json(data);
        } else {
            await Timetable.create({
                semester, branch, link: imageUrl
            });
            const data = {
                success: true,
                message: "Timetable Added!",
            };
            res.json(data);
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const deleteTimetable = async (req, res) => {
    try {
        let timetable = await Timetable.findByIdAndDelete(req.params.id);
        if (!timetable) {
            return res
                .status(400)
                .json({ success: false, message: "No Timetable Exists!" });
        }
        const data = {
            success: true,
            message: "Timetable Deleted!",
        };
        res.json(data);
    } catch (error) {
        console.error(error.message);
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

module.exports = { getTimetable, addTimetable, deleteTimetable }