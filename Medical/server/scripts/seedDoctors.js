import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import connectDB from "../config/mongodb.js";
import doctorModel from "../models/doctorModel.js";

const seedDoctors = async () => {
  await connectDB();

  const saltRounds = 10;
  const commonPassword = await bcrypt.hash("Doctor@123", saltRounds);
  const now = Date.now();

  const doctors = [
    {
      name: "Dr. Aisha Khan",
      email: "aisha.khan+seed@neuracare.local",
      password: commonPassword,
      image: "/doctors/doctor-1.png",
      speciality: "Neurologist",
      degree: "MBBS, MD (Neurology)",
      experience: "8 Years",
      about: "Focused on headache, epilepsy, and stroke prevention with patient-first care.",
      fees: 800,
      address: { line1: "Clinic Street 12", line2: "New Delhi" },
      date: now,
    },
    {
      name: "Dr. Rohan Mehta",
      email: "rohan.mehta+seed@neuracare.local",
      password: commonPassword,
      image: "/doctors/doctor-3.png",
      speciality: "General physician",
      degree: "MBBS",
      experience: "6 Years",
      about: "Primary care and chronic disease management with evidence-based guidance.",
      fees: 500,
      address: { line1: "Park Avenue 3", line2: "Mumbai" },
      date: now,
    },
    {
      name: "Dr. Neha Sharma",
      email: "neha.sharma+seed@neuracare.local",
      password: commonPassword,
      image: "/doctors/doctor-2.png",
      speciality: "Dermatologist",
      degree: "MBBS, MD (Dermatology)",
      experience: "5 Years",
      about: "Skin, hair, and allergy care with a practical and minimal-treatment approach.",
      fees: 700,
      address: { line1: "Sunrise Road 21", line2: "Bengaluru" },
      date: now,
    },
    {
      name: "Dr. Priya Verma",
      email: "priya.verma+seed@neuracare.local",
      password: commonPassword,
      image: "/doctors/doctor-5.png",
      speciality: "Gynecologist",
      degree: "MBBS, DGO",
      experience: "7 Years",
      about: "Women’s health focused on preventive care, safe gynecological treatments, and patient comfort.",
      fees: 900,
      address: { line1: "Lake View 7", line2: "Pune" },
      date: now,
    },
    {
      name: "Dr. Arjun Kapoor",
      email: "arjun.kapoor+seed@neuracare.local",
      password: commonPassword,
      image: "/doctors/doctor-4.png",
      speciality: "Pediatricians",
      degree: "MBBS, DCH",
      experience: "9 Years",
      about: "Child-friendly pediatric care with a focus on growth, development, and quick, reassuring guidance for parents.",
      fees: 750,
      address: { line1: "Green Park 18", line2: "Chennai" },
      date: now,
    },
  ];

  const emails = doctors.map((d) => d.email);

  // Idempotent: remove existing seeded doctors first (exact seeded email list)
  // so rerunning doesn't duplicate doctors / hit unique email index.
  await doctorModel.deleteMany({ email: { $in: emails } });
  const inserted = await doctorModel.insertMany(doctors);

  console.log(`✅ Seeded ${inserted.length} doctors.`);
  console.log('🔑 Doctor login password for seeded accounts: "Doctor@123"');
};

seedDoctors()
  .then(async () => {
    await mongoose.disconnect();
    process.exit(0);
  })
  .catch(async (err) => {
    console.error("❌ Failed to seed doctors:", err?.message || err);
    try {
      await mongoose.disconnect();
    } catch {}
    process.exit(1);
  });

