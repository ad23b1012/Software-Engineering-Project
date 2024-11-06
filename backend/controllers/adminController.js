import validator from "validator";
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken"
import 'dotenv/config';
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";


// API for adding doctors
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file;

        // Checking for all required fields
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: "Missing Details" });
        }

        // Validating email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        // Validating password strength
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        // Hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Uploading the image to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now(), // Fixing date field
        };

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        res.json({ success: true, message: "Doctor Added" }); // Fixing JSON typo
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

//API for admin login
const loginAdmin = async(req,res)=>{
    try{

        const {email,password} = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD ){
            
            const token = jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})

        } else {
            res.json({success: false, message:"Invalid credentials"})
        } 

    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// Api to get all doctors list for admin panel
const allDoctors = async (req,res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.json({success:true,doctors})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
    }
}

// api to get list of all appointments
const appointmentsAdmin = async (req,res)=>{
    try {
        const appointments = await appointmentModel.find({})
        res.json({success:true,appointments})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// api for appointment cancellation
const appointmentCancel = async (req, res) => {
    try {
      const { appointmentId } = req.body;
      const appointmentData = await appointmentModel.findById(appointmentId);
      
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      /// releasing doctor slot
      const { docId, slotDate, slotTime } = appointmentData;
      const doctorData = await doctorModel.findById(docId);
      let slots_booked = doctorData.slots_booked;
      slots_booked[slotDate] = slots_booked[slotDate].filter(
        (e) => e !== slotTime
      );
  
      await doctorModel.findByIdAndUpdate(docId, { slots_booked });
      res.json({ success: true, message: "Appointment Cancelled" });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };
// API TO get dashboar for admin panel
const adminDashboard= async(req,res)=>{

    try{
        const doctors=await doctorModel.find({})
        const users=await userModel.find({})
        const appointment= await appointmentModel.find({})

        const dashData={
            doctors:doctors.length,
            appointment:appointment.length,
            latestAppointment:appointment.reverse().slice(0,5)
        }
        res.json({success:true,dashData})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
export { addDoctor,loginAdmin,allDoctors,appointmentsAdmin ,appointmentCancel,adminDashboard};
