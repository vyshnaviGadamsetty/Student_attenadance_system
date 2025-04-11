
import mongoose from "mongoose";
import Admin from "./models/Admin.js";
import Teacher from "./models/Teacher.js";
import Student from "./models/Student.js";
import Subject from "./models/Subject.js";
import Timetable from "./models/Timetable.js";
import SectionTimetable from "./models/SectionTimetable.js";
import dotenv from "dotenv";

dotenv.config();
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Subjects Data
const subjects = [
    { subjectId: "SUB001", name: "Mathematics", department: ["CSE", "ECE", "EEE", "Civil", "Mech"] },
    { subjectId: "SUB002", name: "Mathematics Lab", department: ["CSE", "ECE", "EEE", "Civil", "Mech"] },
    { subjectId: "SUB003", name: "Physics", department: ["CSE", "ECE", "EEE", "Civil", "Mech"] },
    { subjectId: "SUB004", name: "Physics Lab", department: ["CSE", "ECE", "EEE", "Civil", "Mech"] },
    { subjectId: "SUB005", name: "Electronics", department: ["CSE", "ECE", "EEE", "Civil", "Mech"] },
    { subjectId: "SUB006", name: "Electronics Lab", department: ["CSE", "ECE", "EEE", "Civil", "Mech"] },
    { subjectId: "SUB007", name: "Chemistry", department: ["CSE", "ECE", "EEE", "Civil", "Mech"] },
    { subjectId: "SUB008", name: "Chemistry Lab", department: ["CSE", "ECE", "EEE", "Civil", "Mech"] },
    { subjectId: "SUB009", name: "Computer Science", department: ["CSE", "ECE", "EEE", "Civil", "Mech"] },
    { subjectId: "SUB010", name: "Computer Science Lab", department: ["CSE", "ECE", "EEE", "Civil", "Mech"] }
];

// Admins Data
const admins = [
    { adminId: "A001", name: "Nandini", dob: "2005-11-12", password: "2005-11-12" },
    { adminId: "A002", name: "Vyshnavi", dob: "2005-01-21", password: "2005-01-21" },
    { adminId: "A003", name: "Srilakshmi", dob: "2004-09-24", password: "2004-09-24" }
];

// Timetable Data for Teachers
const timetableData = [
       // Rajesh Kumar (T001)
       { teacherId: "T001", section: "CSE-A", subject: "Mathematics", subjectId: "SUB001", day: "Monday", timeSlot: "9:00 - 11:00 AM" },
       { teacherId: "T001", section: "ECE", subject: "Mathematics", subjectId: "SUB001", day: "Monday", timeSlot: "11:00 - 12:00 PM" },
       { teacherId: "T001", section: "CSE-B", subject: "Mathematics", subjectId: "SUB001", day: "Monday", timeSlot: "3:00 - 4:00 PM" },
       { teacherId: "T001", section: "CSE-B", subject: "Mathematics Lab", subjectId: "SUB002", day: "Tuesday", timeSlot: "9:00 - 11:00 AM" },
       { teacherId: "T001", section: "CSE-A", subject: "Mathematics", subjectId: "SUB001", day: "Tuesday", timeSlot: "1:00 - 2:00 PM" },
       { teacherId: "T001", section: "ECE", subject: "Mathematics", subjectId: "SUB001", day: "Wednesday", timeSlot: "9:00 - 11:00 AM" },
       { teacherId: "T001", section: "CSE-A", subject: "Mathematics Lab", subjectId: "SUB002", day: "Thursday", timeSlot: "2:00 - 4:00 PM" },
       { teacherId: "T001", section: "CSE-B", subject: "Mathematics", subjectId: "SUB001", day: "Friday", timeSlot: "9:00 - 11:00 AM" },
       { teacherId: "T001", section: "ECE", subject: "Mathematics Lab", subjectId: "SUB002", day: "Friday", timeSlot: "2:00 - 4:00 PM" },
   
   //Anjali Sharma
       { teacherId: "T002", section: "Civil", subject: "Mathematics", subjectId: "SUB001", day: "Monday", timeSlot: "9:00 - 11:00 AM" },
       { teacherId: "T002", section: "EEE", subject: "Mathematics", subjectId: "SUB001", day: "Monday", timeSlot: "11:00 - 12:00 PM" },
       { teacherId: "T002", section: "Mech", subject: "Mathematics", subjectId: "SUB001", day: "Monday", timeSlot: "3:00 - 4:00 PM" },
       { teacherId: "T002", section: "Mech", subject: "Mathematics Lab", subjectId: "SUB002", day: "Tuesday", timeSlot: "9:00 - 11:00 AM" },
       { teacherId: "T002", section: "Civil", subject: "Mathematics", subjectId: "SUB001", day: "Tuesday", timeSlot: "1:00 - 2:00 PM" },
       { teacherId: "T002", section: "EEE", subject: "Mathematics", subjectId: "SUB001", day: "Wednesday", timeSlot: "9:00 - 11:00 AM" },
       { teacherId: "T002", section: "Civil", subject: "Mathematics Lab", subjectId: "SUB002", day: "Thursday", timeSlot: "2:00 - 4:00 PM" },
       { teacherId: "T002", section: "Mech", subject: "Mathematics", subjectId: "SUB001", day: "Friday", timeSlot: "9:00 - 11:00 AM" },
       { teacherId: "T002", section: "EEE", subject: "Mathematics Lab", subjectId: "SUB002", day: "Friday", timeSlot: "2:00 - 4:00 PM" },
     
       // Suresh Iyer (T003)
       { teacherId: "T003", section: "CSE-B", subject: "Physics Lab", subjectId: "SUB004", day: "Monday", timeSlot: "9:00 - 11:00 AM" },
       { teacherId: "T003", section: "CSE-A", subject: "Physics", subjectId: "SUB003", day: "Monday", timeSlot: "11:00 - 12:00 PM" },
       { teacherId: "T003", section: "CSE-A", subject: "Physics Lab", subjectId: "SUB004", day: "Tuesday", timeSlot: "2:00 - 4:00 PM" },
       { teacherId: "T003", section: "CSE-B", subject: "Physics", subjectId: "SUB003", day: "Wednesday", timeSlot: "9:00 - 11:00 AM" },
       { teacherId: "T003", section: "ECE", subject: "Physics Lab", subjectId: "SUB004", day: "Wednesday", timeSlot: "2:00 - 4:00 PM" },
       { teacherId: "T003", section: "ECE", subject: "Physics", subjectId: "SUB003", day: "Thursday", timeSlot: "9:00 - 10:00 AM" },
       { teacherId: "T003", section: "CSE-B", subject: "Physics", subjectId: "SUB003", day: "Thursday", timeSlot: "10:00 - 11:00 AM" },
       { teacherId: "T003", section: "ECE", subject: "Physics", subjectId: "SUB003", day: "Thursday", timeSlot: "2:00 - 4:00 PM" },
       { teacherId: "T003", section: "CSE-A", subject: "Physics", subjectId: "SUB003", day: "Friday", timeSlot: "9:00 - 11:00 AM" },
   
       //Pooja Reddy
       { teacherId: "T004", section: "Mech", subject: "Physics Lab", subjectId: "SUB004", day: "Monday", timeSlot: "9:00 - 11:00 AM" },
       { teacherId: "T004", section: "Civil", subject: "Physics", subjectId: "SUB003", day: "Monday", timeSlot: "11:00 - 12:00 PM" },
       { teacherId: "T004", section: "Civil", subject: "Physics Lab", subjectId: "SUB004", day: "Tuesday", timeSlot: "2:00 - 4:00 PM" },
       { teacherId: "T004", section: "Mech", subject: "Physics", subjectId: "SUB003", day: "Wednesday", timeSlot: "9:00 - 11:00 AM" },
       { teacherId: "T004", section: "EEE", subject: "Physics Lab", subjectId: "SUB004", day: "Wednesday", timeSlot: "2:00 - 4:00 PM" },
       { teacherId: "T004", section: "EEE", subject: "Physics", subjectId: "SUB003", day: "Thursday", timeSlot: "9:00 - 10:00 AM" },
       { teacherId: "T004", section: "Mech", subject: "Physics", subjectId: "SUB003", day: "Thursday", timeSlot: "10:00 - 11:00 AM" },
       { teacherId: "T004", section: "EEE", subject: "Physics", subjectId: "SUB003", day: "Thursday", timeSlot: "2:00 - 4:00 PM" },
       { teacherId: "T004", section: "Civil", subject: "Physics", subjectId: "SUB003", day: "Friday", timeSlot: "9:00 - 11:00 AM" },
   
   
       //Arun Prasad
       { teacherId: "T005", section: "ECE", subject: "Electronics", subjectId: "SUB005", day: "Monday", timeSlot: "9:00 - 10:00 AM" },
     { teacherId: "T005", section: "CSE-A", subject: "Electronics", subjectId: "SUB005", day: "Monday", timeSlot: "1:00 - 3:00 PM" },
     { teacherId: "T005", section: "CSE-B", subject: "Electronics", subjectId: "SUB005", day: "Tuesday", timeSlot: "3:00 - 4:00 PM" },
     { teacherId: "T005", section: "CSE-A", subject: "Electronics Lab", subjectId: "SUB006", day: "Wednesday", timeSlot: "9:00 - 10:00 AM " },
     { teacherId: "T005", section: "ECE", subject: "Electronics Lab", subjectId: "SUB006", day: "Wednesday", timeSlot: "11:00 - 1:00 PM " },
     { teacherId: "T005", section: "CSE-A", subject: "Electronics", subjectId: "SUB005", day: "Thursday", timeSlot: "9:00 - 10:00 AM" },
     { teacherId: "T005", section: "ECE", subject: "Electronics", subjectId: "SUB005", day: "Thursday", timeSlot: "10:00 - 12:00 PM" },
     { teacherId: "T005", section: "CSE-B", subject: "Electronics Lab", subjectId: "SUB006", day: "Thursday", timeSlot: "2:00 - 4:00 PM " },
     { teacherId: "T005", section: "CSE-B", subject: "Electronics", subjectId: "SUB005", day: "Friday", timeSlot: "11:00 - 1:00 PM" },
   
   //Vivek Patel
     { teacherId: "T006", section: "EEE", subject: "Electronics", subjectId: "SUB005", day: "Monday", timeSlot: "9:00 - 10:00 AM" },
     { teacherId: "T006", section: "Civil", subject: "Electronics", subjectId: "SUB005", day: "Monday", timeSlot: "1:00 - 3:00 PM" },
     { teacherId: "T006", section: "Mech", subject: "Electronics", subjectId: "SUB005", day: "Tuesday", timeSlot: "3:00 - 4:00 PM" },
     { teacherId: "T006", section: "Civil", subject: "Electronics Lab", subjectId: "SUB006", day: "Wednesday", timeSlot: "9:00 - 10:00 AM" },
     { teacherId: "T006", section: "EEE", subject: "Electronics Lab", subjectId: "SUB006", day: "Wednesday", timeSlot: "11:00 - 1:00 PM " },
     { teacherId: "T006", section: "Civil", subject: "Electronics", subjectId: "SUB005", day: "Thursday", timeSlot: "9:00 - 10:00 AM" },
     { teacherId: "T006", section: "EEE", subject: "Electronics", subjectId: "SUB005", day: "Thursday", timeSlot: "10:00 - 12:00 PM" },
     { teacherId: "T006", section: "Mech", subject: "Electronics Lab", subjectId: "SUB006", day: "Thursday", timeSlot: "2:00 - 4:00 PM " },
     { teacherId: "T006", section: "Mech", subject: "Electronics", subjectId: "SUB005", day: "Friday", timeSlot: "11:00 - 1:00 PM" },
   
   
   //Meena Chawla
   { teacherId: "T007", section: "CSE-A", subject: "Chemistry", subjectId: "SUB007", day: "Monday", timeSlot: "3:00 - 4:00 PM" },
     { teacherId: "T007", section: "ECE", subject: "Chemistry Lab", subjectId: "SUB008", day: "Tuesday", timeSlot: "9:00 - 11:00 AM" },
     { teacherId: "T007", section: "ECE", subject: "Chemistry", subjectId: "SUB007", day: "Tuesday", timeSlot: "3:00 - 4:00 PM" },
     { teacherId: "T007", section: "CSE-B", subject: "Chemistry Lab", subjectId: "SUB008", day: "Wednesday", timeSlot: "11:00 - 1:00 PM" },
     { teacherId: "T007", section: "CSE-B", subject: "Chemistry", subjectId: "SUB007", day: "Wednesday", timeSlot: "2:00 - 4:00 PM" },
     { teacherId: "T007", section: "CSE-B", subject: "Chemistry", subjectId: "SUB007", day: "Thursday", timeSlot: "9:00 - 10:00 AM" },
     { teacherId: "T007", section: "CSE-A", subject: "Chemistry Lab", subjectId: "SUB008", day: "Thursday", timeSlot: "10:00 - 12:00 PM" },
     { teacherId: "T007", section: "ECE", subject: "Chemistry", subjectId: "SUB007", day: "Friday", timeSlot: "9:00 - 11:00 AM" },
     { teacherId: "T007", section: "CSE-A", subject: "Chemistry lab", subjectId: "SUB007", day: "Friday", timeSlot: "1:00 - 3:00 PM" },
   
   //Amit Verma
     { teacherId: "T008", section: "Civil", subject: "Chemistry", subjectId: "SUB007", day: "Monday", timeSlot: "3:00 - 4:00 PM" },
     { teacherId: "T008", section: "EEE", subject: "Chemistry Lab", subjectId: "SUB008", day: "Tuesday", timeSlot: "9:00 - 11:00 AM" },
     { teacherId: "T008", section: "EEE", subject: "Chemistry", subjectId: "SUB007", day: "Tuesday", timeSlot: "3:00 - 4:00 PM" },
     { teacherId: "T008", section: "Mech", subject: "Chemistry Lab", subjectId: "SUB008", day: "Wednesday", timeSlot: "11:00 - 1:00 PM" },
     { teacherId: "T008", section: "Mech", subject: "Chemistry", subjectId: "SUB007", day: "Wednesday", timeSlot: "2:00 - 4:00 PM" },
     { teacherId: "T008", section: "Mech", subject: "Chemistry", subjectId: "SUB007", day: "Thursday", timeSlot: "9:00 - 10:00 AM" },
     { teacherId: "T008", section: "Civil", subject: "Chemistry Lab", subjectId: "SUB008", day: "Thursday", timeSlot: "10:00 - 12:00 PM" },
     { teacherId: "T008", section: "EEE", subject: "Chemistry", subjectId: "SUB007", day: "Friday", timeSlot: "9:00 - 11:00 AM" },
     { teacherId: "T008", section: "Civil", subject: "Chemistry lab", subjectId: "SUB007", day: "Friday", timeSlot: "1:00 - 3:00 PM" },
   
   //Neha Agarwal
   { teacherId: "T009", section: "ECE", subject: "Computer Science", subjectId: "SUB009", day: "Monday", timeSlot: "10:00 - 11:00 AM" },
     { teacherId: "T009", section: "ECE", subject: "Computer Science", subjectId: "SUB009", day: "Monday", timeSlot: "1:00 - 2:00 PM" },
     { teacherId: "T009", section: "CSE-B", subject: "Computer Science", subjectId: "SUB009", day: "Monday", timeSlot: "2:00 - 3:00 PM" },
     { teacherId: "T009", section: "ECE", subject: "Computer Science Lab", subjectId: "SUB010", day: "Monday", timeSlot: "3:00 - 4:00 PM (Lab)" },
     { teacherId: "T009", section: "CSE-A", subject: "Computer Science", subjectId: "SUB009", day: "Tuesday", timeSlot: "9:00 - 11:00 AM" },
     { teacherId: "T009", section: "CSE-B", subject: "Computer Science", subjectId: "SUB009", day: "Tuesday", timeSlot: "11:00 - 1:00 PM" },
     { teacherId: "T009", section: "CSE-A", subject: "Computer Science", subjectId: "SUB009", day: "Wednesday", timeSlot: "11:00 - 12:00 PM" },
     { teacherId: "T009", section: "CSE-A", subject: "Computer Science Lab", subjectId: "SUB010", day: "Wednesday", timeSlot: "1:00 - 3:00 PM (Lab)" },
     { teacherId: "T009", section: "ECE", subject: "Computer Science", subjectId: "SUB009", day: "Friday", timeSlot: "11:00 - 12:00 PM" },
     { teacherId: "T009", section: "ECE", subject: "Computer Science Lab", subjectId: "SUB010", day: "Friday", timeSlot: "1:00 - 2:00 PM (Lab)" },
     { teacherId: "T009", section: "CSE-B", subject: "Computer Science Lab", subjectId: "SUB010", day: "Friday", timeSlot: "2:00 - 4:00 PM (Lab)" },
   
   //Rahul Desai
   { teacherId: "T010", section: "EEE", subject: "Computer Science", subjectId: "SUB009", day: "Monday", timeSlot: "10:00 - 11:00 AM" },
   { teacherId: "T010", section: "EEE", subject: "Computer Science", subjectId: "SUB009", day: "Monday", timeSlot: "1:00 - 2:00 PM" },
   { teacherId: "T010", section: "Mech", subject: "Computer Science", subjectId: "SUB009", day: "Monday", timeSlot: "2:00 - 3:00 PM" },
   { teacherId: "T010", section: "EEE", subject: "Computer Science Lab", subjectId: "SUB010", day: "Monday", timeSlot: "3:00 - 4:00 PM (Lab)" },
   { teacherId: "T010", section: "Civil", subject: "Computer Science", subjectId: "SUB009", day: "Tuesday", timeSlot: "9:00 - 11:00 AM" },
   { teacherId: "T010", section: "Mech", subject: "Computer Science", subjectId: "SUB009", day: "Tuesday", timeSlot: "11:00 - 1:00 PM" },
   { teacherId: "T010", section: "Civil", subject: "Computer Science", subjectId: "SUB009", day: "Wednesday", timeSlot: "11:00 - 12:00 PM" },
   { teacherId: "T010", section: "Civil", subject: "Computer Science Lab", subjectId: "SUB010", day: "Wednesday", timeSlot: "1:00 - 3:00 PM (Lab)" },
   { teacherId: "T010", section: "EEE", subject: "Computer Science", subjectId: "SUB009", day: "Friday", timeSlot: "11:00 - 12:00 PM" },
   { teacherId: "T010", section: "EEE", subject: "Computer Science Lab", subjectId: "SUB010", day: "Friday", timeSlot: "1:00 - 2:00 PM (Lab)" },
   { teacherId: "T010", section: "Mech", subject: "Computer Science Lab", subjectId: "SUB010", day: "Friday", timeSlot: "2:00 - 4:00 PM (Lab)" },
     ];


// Section-wise Timetable Data
const sectionTimetableData = [
  {
    section: "CSE-A",
    day: "Monday",
    schedule: [
      { timeSlot: "9:00 - 11:00", subject: "Mathematics", subjectId: "SUB001", teacherId: "T001" },
      { timeSlot: "11:00 - 12:00", subject: "Physics", subjectId: "SUB003", teacherId: "T003" },

      { timeSlot: "1:00 - 3:00", subject: "Electronics", subjectId: "SUB005", teacherId: "T005" },
      { timeSlot: "3:00 - 4:00", subject: "Chemistry", subjectId: "SUB007", teacherId: "T007" }
    ]
  },
  {
    section: "CSE-A",
    day: "Tuesday",
    schedule: [
      { timeSlot: "9:00 - 11:00", subject: "Computer Science", subjectId: "SUB009", teacherId: "T009" },
     
      { timeSlot: "1:00 - 2:00", subject: "Mathematics", subjectId: "SUB001", teacherId: "T001" },
      { timeSlot: "2:00 - 4:00", subject: "Physics Lab", subjectId: "SUB004", teacherId: "T003" }
    ]
  },
  {
    section: "CSE-A",
    day: "Wednesday",
    schedule: [
      { timeSlot: "9:00 - 11:00", subject: "Electronics Lab", subjectId: "SUB006", teacherId: "T005" },
      { timeSlot: "11:00 - 12:00", subject: "Computer Science", subjectId: "SUB009", teacherId: "T009" },
     
      { timeSlot: "1:00 - 3:00", subject: "Computer Science Lab", subjectId: "SUB010", teacherId: "T009" }
    ]
  },
  {
    section: "CSE-A",
    day: "Thursday",
    schedule: [
      { timeSlot: "9:00 - 10:00", subject: "Electronics", subjectId: "SUB005", teacherId: "T005" },
      { timeSlot: "10:00 - 12:00", subject: "Chemistry Lab", subjectId: "SUB008", teacherId: "T007" },
     
      { timeSlot: "2:00 - 4:00", subject: "Mathematics Lab", subjectId: "SUB002", teacherId: "T001" }
    ]
  },
  {
    section: "CSE-A",
    day: "Friday",
    schedule: [
      { timeSlot: "9:00 - 11:00", subject: "Physics", subjectId: "SUB003", teacherId: "T003" },

      { timeSlot: "1:00 - 3:00", subject: "Chemistry", subjectId: "SUB007", teacherId: "T007" }
    ]
  },
  {
      section: "Civil",
      day: "Monday",
      schedule: [
        { timeSlot: "9:00 - 11:00", subject: "Mathematics", subjectId: "SUB001", teacherId: "T002" },
        { timeSlot: "11:00 - 12:00", subject: "Physics", subjectId: "SUB003", teacherId: "T004" },
        
        { timeSlot: "1:00 - 3:00", subject: "Electronics", subjectId: "SUB005", teacherId: "T006" },
        { timeSlot: "3:00 - 4:00", subject: "Chemistry", subjectId: "SUB007", teacherId: "T008" }
      ]
    },
    {
      section: "Civil",
      day: "Tuesday",
      schedule: [
        { timeSlot: "9:00 - 11:00", subject: "Computer Science", subjectId: "SUB009", teacherId: "T010" },
       
        { timeSlot: "1:00 - 2:00", subject: "Mathematics", subjectId: "SUB001", teacherId: "T002" },
        { timeSlot: "2:00 - 4:00", subject: "Physics Lab", subjectId: "SUB004", teacherId: "T004" }
      ]
    },
    {
      section: "Civil",
      day: "Wednesday",
      schedule: [
        { timeSlot: "9:00 - 11:00", subject: "Electronics Lab", subjectId: "SUB006", teacherId: "T006" },
        { timeSlot: "11:00 - 12:00", subject: "Computer Science", subjectId: "SUB009", teacherId: "T010" },
       
        { timeSlot: "1:00 - 3:00", subject: "Computer Science Lab", subjectId: "SUB010", teacherId: "T010" }
      ]
    },
    {
      section: "Civil",
      day: "Thursday",
      schedule: [
        { timeSlot: "9:00 - 10:00", subject: "Electronics", subjectId: "SUB005", teacherId: "T006" },
        { timeSlot: "10:00 - 12:00", subject: "Chemistry Lab", subjectId: "SUB008", teacherId: "T008" },
       
        { timeSlot: "2:00 - 4:00", subject: "Mathematics Lab", subjectId: "SUB002", teacherId: "T002" }
      ]
    },
    {
      section: "Civil",
      day: "Friday",
      schedule: [
        { timeSlot: "9:00 - 11:00", subject: "Physics", subjectId: "SUB003", teacherId: "T004" },

        { timeSlot: "1:00 - 3:00", subject: "Chemistry", subjectId: "SUB007", teacherId: "T008" }
      ]
    },
    
      {
        section: "CSE-B",
        day: "Monday",
        schedule: [
          { timeSlot: "9:00 - 11:00", subject: "Physics Lab", subjectId: "SUB004", teacherId: "T003" },
          { timeSlot: "2:00 - 3:00", subject: "Computer Science", subjectId: "SUB009", teacherId: "T009" },
          { timeSlot: "3:00 - 4:00", subject: "Mathematics", subjectId: "SUB001", teacherId: "T001" }
        ]
      },
      {
        section: "CSE-B",
        day: "Tuesday",
        schedule: [
          { timeSlot: "9:00 - 11:00", subject: "Electronics Lab", subjectId: "SUB002", teacherId: "T001" },
          { timeSlot: "11:00 - 1:00", subject: "Computer Science", subjectId: "SUB009", teacherId: "T009" },
          { timeSlot: "3:00 - 4:00", subject: "Electronics", subjectId: "SUB005", teacherId: "T005" }
        ]
      },
      {
        section: "CSE-B",
        day: "Wednesday",
        schedule: [
          { timeSlot: "9:00 - 11:00", subject: "Physics", subjectId: "SUB003", teacherId: "T003" },
          { timeSlot: "11:00 - 1:00", subject: "Chemistry Lab", subjectId: "SUB008", teacherId: "T007" },
          { timeSlot: "2:00 - 4:00", subject: "Chemistry", subjectId: "SUB007", teacherId: "T007" }
        ]
      },
      {
        section: "CSE-B",
        day: "Thursday",
        schedule: [
          { timeSlot: "9:00 - 10:00", subject: "Chemistry", subjectId: "SUB007", teacherId: "T007" },
          { timeSlot: "10:00 - 11:00", subject: "Physics", subjectId: "SUB003", teacherId: "T003" },
          { timeSlot: "2:00 - 4:00", subject: "Electronics Lab", subjectId: "SUB006", teacherId: "T005" }
        ]
      },
      {
        section: "CSE-B",
        day: "Friday",
        schedule: [
          { timeSlot: "9:00 - 11:00", subject: "Mathematics", subjectId: "SUB001", teacherId: "T001" },
          { timeSlot: "11:00 - 1:00", subject: "Electronics", subjectId: "SUB005", teacherId: "T005" },
          { timeSlot: "2:00 - 4:00", subject: "Computer Science Lab", subjectId: "SUB010", teacherId: "T009" }
        ]
      },
      {
          section: "Mech",
          day: "Monday",
          schedule: [
            { timeSlot: "9:00 - 11:00", subject: "Physics Lab", subjectId: "SUB004", teacherId: "T004" },
            { timeSlot: "2:00 - 3:00", subject: "Computer Science", subjectId: "SUB009", teacherId: "T010" },
            { timeSlot: "3:00 - 4:00", subject: "Mathematics", subjectId: "SUB001", teacherId: "T002" }
          ]
        },
        {
          section: "Mech",
          day: "Tuesday",
          schedule: [
            { timeSlot: "9:00 - 11:00", subject: "Electronics Lab", subjectId: "SUB002", teacherId: "T002" },
            { timeSlot: "11:00 - 1:00", subject: "Computer Science", subjectId: "SUB009", teacherId: "T010" },
            { timeSlot: "3:00 - 4:00", subject: "Electronics", subjectId: "SUB005", teacherId: "T006" }
          ]
        },
        {
          section: "Mech",
          day: "Wednesday",
          schedule: [
            { timeSlot: "9:00 - 11:00", subject: "Physics", subjectId: "SUB003", teacherId: "T004" },
            { timeSlot: "11:00 - 1:00", subject: "Chemistry Lab", subjectId: "SUB008", teacherId: "T008" },
            { timeSlot: "2:00 - 4:00", subject: "Chemistry", subjectId: "SUB007", teacherId: "T008" }
          ]
        },
        {
          section: "Mech",
          day: "Thursday",
          schedule: [
            { timeSlot: "9:00 - 10:00", subject: "Chemistry", subjectId: "SUB007", teacherId: "T008" },
            { timeSlot: "10:00 - 11:00", subject: "Physics", subjectId: "SUB003", teacherId: "T004" },
            { timeSlot: "2:00 - 4:00", subject: "Electronics Lab", subjectId: "SUB006", teacherId: "T006" }
          ]
        },
        {
          section: "Mech",
          day: "Friday",
          schedule: [
            { timeSlot: "9:00 - 11:00", subject: "Mathematics", subjectId: "SUB001", teacherId: "T002" },
            { timeSlot: "11:00 - 1:00", subject: "Electronics", subjectId: "SUB005", teacherId: "T006" },
            { timeSlot: "2:00 - 4:00", subject: "Computer Science Lab", subjectId: "SUB010", teacherId: "T010" }
          ]
        },
        {
          section: "ECE",
          day: "Monday",
          schedule: [
            { timeSlot: "9:00 - 10:00", subject: "Mathematics", subjectId: "SUB001", teacherId: "T001" },
            { timeSlot: "10:00 - 11:00", subject: "Computer Science", subjectId: "SUB009", teacherId: "T009" },
            { timeSlot: "11:00 - 12:00", subject: "Physics", subjectId: "SUB003", teacherId: "T003" },
            { timeSlot: "1:00 - 2:00", subject: "Computer Science", subjectId: "SUB009", teacherId: "T009" },
            { timeSlot: "3:00 - 4:00", subject: "Chemistry", subjectId: "SUB007", teacherId: "T007" }
          ]
        },
        {
          section: "ECE",
          day: "Tuesday",
          schedule: [
            { timeSlot: "9:00 - 11:00", subject: "Electronics", subjectId: "SUB005", teacherId: "T005" },
            { timeSlot: "3:00 - 4:00", subject: "Physics Lab", subjectId: "SUB004", teacherId: "T003" }
          ]
        },
        {
          section: "ECE",
          day: "Wednesday",
          schedule: [
            { timeSlot: "9:00 - 11:00", subject: "Physics", subjectId: "SUB003", teacherId: "T003" },
            { timeSlot: "11:00 - 1:00", subject: "Electronics Lab", subjectId: "SUB006", teacherId: "T005" },
            { timeSlot: "2:00 - 4:00", subject: "Chemistry Lab", subjectId: "SUB008", teacherId: "T007" }
          ]
        },
        {
          section: "ECE",
          day: "Thursday",
          schedule: [
            { timeSlot: "9:00 - 10:00", subject: "Mathematics Lab", subjectId: "SUB002", teacherId: "T001" },
            { timeSlot: "10:00 - 12:00", subject: "Mathematics", subjectId: "SUB001", teacherId: "T001" },
            { timeSlot: "2:00 - 4:00", subject: "Mathematics Lab", subjectId: "SUB002", teacherId: "T001" }
          ]
        },
        {
          section: "ECE",
          day: "Friday",
          schedule: [
            { timeSlot: "9:00 - 11:00", subject: "Physics Lab", subjectId: "SUB004", teacherId: "T003" },
            { timeSlot: "11:00 - 12:00", subject: "Computer Science", subjectId: "SUB009", teacherId: "T009" },
            { timeSlot: "1:00 - 2:00", subject: "Chemistry", subjectId: "SUB007", teacherId: "T007" },
            { timeSlot: "2:00 - 4:00", subject: "Computer Science Lab", subjectId: "SUB010", teacherId: "T009" }
          ]
        },

        {
          section: "EEE",
          day: "Monday",
          schedule: [
            { timeSlot: "9:00 - 10:00", subject: "Mathematics", subjectId: "SUB001", teacherId: "T002" },
            { timeSlot: "10:00 - 11:00", subject: "Computer Science", subjectId: "SUB009", teacherId: "T010" },
            { timeSlot: "11:00 - 12:00", subject: "Physics", subjectId: "SUB003", teacherId: "T004" },
            { timeSlot: "1:00 - 2:00", subject: "Computer Science", subjectId: "SUB009", teacherId: "T010" },
            { timeSlot: "3:00 - 4:00", subject: "Chemistry", subjectId: "SUB007", teacherId: "T008" }
          ]
        },
        {
          section: "EEE",
          day: "Tuesday",
          schedule: [
            { timeSlot: "9:00 - 11:00", subject: "Electronics", subjectId: "SUB005", teacherId: "T006" },
            { timeSlot: "3:00 - 4:00", subject: "Physics Lab", subjectId: "SUB004", teacherId: "T004" }
          ]
        },
        {
          section: "EEE",
          day: "Wednesday",
          schedule: [
            { timeSlot: "9:00 - 11:00", subject: "Physics", subjectId: "SUB003", teacherId: "T004" },
            { timeSlot: "11:00 - 1:00", subject: "Electronics Lab", subjectId: "SUB006", teacherId: "T004" },
            { timeSlot: "2:00 - 4:00", subject: "Chemistry Lab", subjectId: "SUB008", teacherId: "T004" }
          ]
        },
        {
          section: "EEE",
          day: "Thursday",
          schedule: [
            { timeSlot: "9:00 - 10:00", subject: "Mathematics Lab", subjectId: "SUB002", teacherId: "T002" },
            { timeSlot: "10:00 - 12:00", subject: "Mathematics", subjectId: "SUB001", teacherId: "T002" },
            { timeSlot: "2:00 - 4:00", subject: "Mathematics Lab", subjectId: "SUB002", teacherId: "T002" }
          ]
        },
        {
          section: "EEE",
          day: "Friday",
          schedule: [
            { timeSlot: "9:00 - 11:00", subject: "Physics Lab", subjectId: "SUB004", teacherId: "T004" },
            { timeSlot: "11:00 - 12:00", subject: "Computer Science", subjectId: "SUB009", teacherId: "T010" },
            { timeSlot: "1:00 - 2:00", subject: "Chemistry", subjectId: "SUB007", teacherId: "T007" },
            { timeSlot: "2:00 - 4:00", subject: "Computer Science Lab", subjectId: "SUB010", teacherId: "T010" }
          ]
        }
    
];

// Seeding function
const seedDatabase = async () => {
    try {
        await mongoose.connection.dropDatabase(); // Clear database

        // Insert Subjects
        const insertedSubjects = await Subject.insertMany(subjects);
        const subjectsMap = insertedSubjects.reduce((acc, subject) => {
            acc[subject.subjectId] = subject._id;
            return acc;
        }, {});

        // Insert Admins
        await Admin.insertMany(admins);

        // Insert Teachers
        await Teacher.insertMany([
          { teacherId: "T001", name: "Rajesh Kumar", dob: "1985-05-05", password: "1985-05-05", sections: ["CSE-A", "CSE-B", "ECE"], subjects: [subjectsMap["SUB001"], subjectsMap["SUB002"]] },
          { teacherId: "T002", name: "Anjali Sharma", dob: "1986-06-06", password: "1986-06-06", sections: ["EEE", "Civil", "Mech"], subjects: [subjectsMap["SUB001"], subjectsMap["SUB002"]] },
          { teacherId: "T003", name: "Suresh Iyer", dob: "1987-07-07", password: "1987-07-07", sections: ["CSE-A", "CSE-B", "ECE"], subjects: [subjectsMap["SUB003"], subjectsMap["SUB004"]] },
          { teacherId: "T004", name: "Pooja Reddy", dob: "1984-03-15", password: "1984-03-15", sections: ["EEE", "Civil", "Mech"], subjects: [subjectsMap["SUB003"], subjectsMap["SUB004"]] },
          { teacherId: "T005", name: "Arun Prasad", dob: "1988-08-20", password: "1988-08-20", sections: ["CSE-A", "CSE-B", "ECE"], subjects: [subjectsMap["SUB005"], subjectsMap["SUB006"]] },
          { teacherId: "T006", name: "Vivek Patel", dob: "1983-12-10", password: "1983-12-10", sections: ["EEE", "Civil", "Mech"], subjects: [subjectsMap["SUB005"], subjectsMap["SUB006"]] },
          { teacherId: "T007", name: "Meena Chawla", dob: "1982-11-25", password: "1982-11-25", sections: ["CSE-A", "CSE-B", "ECE"], subjects: [subjectsMap["SUB007"], subjectsMap["SUB008"]] },
          { teacherId: "T008", name: "Amit Verma", dob: "1981-09-30", password: "1981-09-30", sections: ["EEE", "Civil", "Mech"], subjects: [subjectsMap["SUB007"], subjectsMap["SUB008"]] },
          { teacherId: "T009", name: "Neha Agarwal", dob: "1989-04-18", password: "1989-04-18", sections: ["CSE-A", "CSE-B", "ECE"], subjects: [subjectsMap["SUB009"], subjectsMap["SUB010"]] },
          { teacherId: "T010", name: "Rahul Desai", dob: "1980-02-17", password: "1980-02-17", sections: ["EEE", "Civil", "Mech"], subjects: [subjectsMap["SUB009"], subjectsMap["SUB010"]] }
      ]);

        // Insert Students
        await Student.insertMany([
                        { studentId: "SCSE-A01", name: "Amit.A", dob: "2005-06-10", password: "2005-06-10", department: "CSE", section: "A", subjects: Object.values(subjectsMap) },
            { studentId: "SCSE-A02", name: "Priya.A", dob: "2005-07-15", password: "2005-07-15", department: "CSE", section: "A", subjects: Object.values(subjectsMap) },
            { studentId: "SCSE-A03", name: "Suman.B", dob: "2005-08-20", password: "2005-08-20", department: "CSE", section: "A", subjects: Object.values(subjectsMap) },
            { studentId: "SCSE-A04", name: "Swaroop.M", dob: "2004-11-18", password: "2004-11-18", department: "CSE", section: "A", subjects: Object.values(subjectsMap) },
            { studentId: "SCSE-A05", name: "Manoj.D", dob: "2004-12-12", password:  "2004-12-12", department: "CSE", section: "A", subjects: Object.values(subjectsMap) },
            { studentId: "SCSE-A06", name: "Nikhil.A", dob: "2005-06-20", password: "2005-06-20", department: "CSE", section: "A", subjects: Object.values(subjectsMap) },
            { studentId: "SCSE-A07", name: "Nihal.A", dob: "2005-06-18", password: "2005-06-18", department: "CSE", section: "A", subjects: Object.values(subjectsMap) },
            { studentId: "SCSE-A08", name: "Karthikeya.K", dob: "2005-07-15", password: "2005-07-15", department: "CSE", section: "A", subjects: Object.values(subjectsMap) },
            { studentId: "SCSE-A09", name: "Jahnavi.K", dob: "2004-08-22", password: "2004-08-22", department: "CSE", section: "A", subjects: Object.values(subjectsMap) },
            { studentId: "SCSE-A10", name: "Amruta.T", dob: "2005-01-10", password: "2005-01-10", department: "CSE", section: "A", subjects: Object.values(subjectsMap) },
            { studentId: "SCSE-A11", name: "Karishma.T", dob: "2005-09-15", password: "2005-09-15", department: "CSE", section: "A", subjects: Object.values(subjectsMap) },
            { studentId: "SCSE-A12", name: "Vignesh.E", dob: "2004-08-20", password: "2004-08-20", department: "CSE", section: "A", subjects: Object.values(subjectsMap) },
            { studentId: "SCSE-A13", name: "Kiran.R", dob: "2005-08-10", password: "2005-08-10", department: "CSE", section: "A", subjects: Object.values(subjectsMap) },
            { studentId: "SCSE-A14", name: "Pravallika.B", dob: "2004-12-15", password: "2004-12-15", department: "CSE", section: "A", subjects: Object.values(subjectsMap) },
            { studentId: "SCSE-A15", name: "Pooja.R", dob: "2005-08-28", password: "2005-08-28", department: "CSE", section: "A", subjects: Object.values(subjectsMap) },
            { studentId: "SCSE-A16", name: "Venkat.K", dob: "2005-03-10", password: "2005-03-10", department: "CSE", section: "A", subjects: Object.values(subjectsMap) },
            { studentId: "SCSE-A17", name: "Pravasha.K", dob: "2005-02-15", password: "2005-02-15", department: "CSE", section: "A", subjects: Object.values(subjectsMap) },
            { studentId: "SCSE-A18", name: "Sumana.L", dob: "2004-11-20", password: "2004-11-20", department: "CSE", section: "A", subjects: Object.values(subjectsMap) },


    { studentId: "SCSE-B01", name: "Karthik.C", dob: "2005-09-25", password: "2005-09-25", department: "CSE", section: "B", subjects: Object.values(subjectsMap) },
    { studentId: "SCSE-B02", name: "Neha.A", dob: "2005-10-30", password: "2005-10-30", department: "CSE", section: "B", subjects: Object.values(subjectsMap) },
    { studentId: "SCSE-B03", name: "Rohan.K", dob: "2005-07-18", password: "2005-07-18", department: "CSE", section: "B", subjects: Object.values(subjectsMap) },
    { studentId: "SCSE-B04", name: "Sanya.M", dob: "2005-11-12", password: "2005-11-12", department: "CSE", section: "B", subjects: Object.values(subjectsMap) },
    { studentId: "SCSE-B05", name: "Aditya.P", dob: "2004-08-05", password: "2004-08-05", department: "CSE", section: "B", subjects: Object.values(subjectsMap) },
    { studentId: "SCSE-B06", name: "Tanvi.R", dob: "2005-02-14", password: "2005-02-14", department: "CSE", section: "B", subjects: Object.values(subjectsMap) },
    { studentId: "SCSE-B07", name: "Vikram.S", dob: "2004-12-20", password: "2004-12-20", department: "CSE", section: "B", subjects: Object.values(subjectsMap) },
    { studentId: "SCSE-B08", name: "Meghana.V", dob: "2005-06-25", password: "2005-06-25", department: "CSE", section: "B", subjects: Object.values(subjectsMap) },
    { studentId: "SCSE-B09", name: "Arjun.N", dob: "2005-03-08", password: "2005-03-08", department: "CSE", section: "B", subjects: Object.values(subjectsMap) },
    { studentId: "SCSE-B10", name: "Divya.L", dob: "2004-10-10", password: "2004-10-10", department: "CSE", section: "B", subjects: Object.values(subjectsMap) },
    { studentId: "SCSE-B11", name: "Rahul.T", dob: "2005-01-27", password: "2005-01-27", department: "CSE", section: "B", subjects: Object.values(subjectsMap) },
    { studentId: "SCSE-B12", name: "Shruti.D", dob: "2005-05-15", password: "2005-05-15", department: "CSE", section: "B", subjects: Object.values(subjectsMap) },
    { studentId: "SCSE-B13", name: "Aniket.J", dob: "2005-04-22", password: "2005-04-22", department: "CSE", section: "B", subjects: Object.values(subjectsMap) },
    { studentId: "SCSE-B14", name: "Pallavi.K", dob: "2004-09-18", password: "2004-09-18", department: "CSE", section: "B", subjects: Object.values(subjectsMap) },
    { studentId: "SCSE-B15", name: "Harsha.Y", dob: "2005-07-05", password: "2005-07-05", department: "CSE", section: "B", subjects: Object.values(subjectsMap) },

    

   
    { studentId: "SECE-A01", name: "Vikram.N", dob: "2005-06-05", password: "2005-06-05", department: "ECE", section: "A", subjects: Object.values(subjectsMap) },
    { studentId: "SECE-A02", name: "Manga.D", dob: "2005-07-12", password: "2005-07-12", department: "ECE", section: "A", subjects: Object.values(subjectsMap) },
    { studentId: "SECE-A03", name: "Rahul.S", dob: "2005-08-22", password: "2005-08-22", department: "ECE", section: "A", subjects: Object.values(subjectsMap) },
    { studentId: "SECE-A04", name: "Deepika.R", dob: "2004-12-15", password: "2004-12-15", department: "ECE", section: "A", subjects: Object.values(subjectsMap) },
    { studentId: "SECE-A05", name: "Pranav.K", dob: "2005-03-10", password: "2005-03-10", department: "ECE", section: "A", subjects: Object.values(subjectsMap) },
    { studentId: "SECE-A06", name: "Tanisha.V", dob: "2005-11-20", password: "2005-11-20", department: "ECE", section: "A", subjects: Object.values(subjectsMap) },
    { studentId: "SECE-A07", name: "Vikas.P", dob: "2005-04-25", password: "2005-04-25", department: "ECE", section: "A", subjects: Object.values(subjectsMap) },
    { studentId: "SECE-A08", name: "Roshini.M", dob: "2005-10-05", password: "2005-10-05", department: "ECE", section: "A", subjects: Object.values(subjectsMap) },
    { studentId: "SECE-A09", name: "Harsha.Y", dob: "2005-02-18", password: "2005-02-18", department: "ECE", section: "A", subjects: Object.values(subjectsMap) },
    { studentId: "SECE-A10", name: "Pooja.L", dob: "2005-06-25", password: "2005-06-25", department: "ECE", section: "A", subjects: Object.values(subjectsMap) },
    { studentId: "SECE-A11", name: "Nikhil.B", dob: "2004-09-28", password: "2004-09-28", department: "ECE", section: "A", subjects: Object.values(subjectsMap) },
    { studentId: "SECE-A12", name: "Meghana.K", dob: "2005-01-15", password: "2005-01-15", department: "ECE", section: "A", subjects: Object.values(subjectsMap) },
    { studentId: "SECE-A13", name: "Ravi.T", dob: "2005-05-10", password: "2005-05-10", department: "ECE", section: "A", subjects: Object.values(subjectsMap) },
    { studentId: "SECE-A14", name: "Sneha.J", dob: "2004-11-08", password: "2004-11-08", department: "ECE", section: "A", subjects: Object.values(subjectsMap) },
    { studentId: "SECE-A15", name: "Siddharth.R", dob: "2005-07-30", password: "2005-07-30", department: "ECE", section: "A", subjects: Object.values(subjectsMap) },
    { studentId: "SECE-A16", name: "Ananya.C", dob: "2005-03-22", password: "2005-03-22", department: "ECE", section: "A", subjects: Object.values(subjectsMap) },


    { studentId: "SEEE-A01", name: "Rohan.M", dob: "2005-08-18", password: "2005-08-18", department: "EEE", section: "A", subjects: Object.values(subjectsMap) },
    { studentId: "SEEE-A02", name: "Sahana.V", dob: "2005-09-22", password: "2005-09-22", department: "EEE", section: "A", subjects: Object.values(subjectsMap) },
    { studentId: "SEEE-A03", name: "Arjun.K", dob: "2005-07-14", password: "2005-07-14", department: "EEE", section: "A", subjects: Object.values(subjectsMap) },
    { studentId: "SEEE-A04", name: "Divya.P", dob: "2005-11-05", password: "2005-11-05", department: "EEE", section: "A", subjects: Object.values(subjectsMap) },
    { studentId: "SEEE-A05", name: "Vikas.T", dob: "2005-06-30", password: "2005-06-30", department: "EEE", section: "A", subjects: Object.values(subjectsMap) },
    { studentId: "SEEE-A06", name: "Meghana.R", dob: "2005-12-10", password: "2005-12-10", department: "EEE", section: "A", subjects: Object.values(subjectsMap) },
    { studentId: "SEEE-A07", name: "Suraj.N", dob: "2005-05-25", password: "2005-05-25", department: "EEE", section: "A", subjects: Object.values(subjectsMap) },
    { studentId: "SEEE-A08", name: "Anusha.S", dob: "2005-04-18", password: "2005-04-18", department: "EEE", section: "A", subjects: Object.values(subjectsMap) },
    { studentId: "SEEE-A09", name: "Karthik.L", dob: "2005-10-08", password: "2005-10-08", department: "EEE", section: "A", subjects: Object.values(subjectsMap) },
    { studentId: "SEEE-A10", name: "Sneha.D", dob: "2005-02-20", password: "2005-02-20", department: "EEE", section: "A", subjects: Object.values(subjectsMap) },

    

    { studentId: "SCIVIL-A01", name: "Swati.R", dob: "2005-09-22", password: "2005-09-22", department: "Civil", section: "A", subjects: Object.values(subjectsMap) },
    { studentId: "SCIVIL-A02", name: "Harsha.V", dob: "2005-07-10", password: "2005-07-10", department: "Civil", section: "A", subjects: Object.values(subjectsMap) },
    { studentId: "SCIVIL-A03", name: "Meera.K", dob: "2005-06-18", password: "2005-06-18", department: "Civil", section: "A", subjects: Object.values(subjectsMap) },
    { studentId: "SCIVIL-A04", name: "Vikrant.S", dob: "2005-05-25", password: "2005-05-25", department: "Civil", section: "A", subjects: Object.values(subjectsMap) },
    { studentId: "SCIVIL-A05", name: "Tanisha.M", dob: "2005-08-30", password: "2005-08-30", department: "Civil", section: "A", subjects: Object.values(subjectsMap) },
    { studentId: "SCIVIL-A06", name: "Rajat.N", dob: "2005-10-12", password: "2005-10-12", department: "Civil", section: "A", subjects: Object.values(subjectsMap) },
    { studentId: "SCIVIL-A07", name: "Siddharth.L", dob: "2005-11-05", password: "2005-11-05", department: "Civil", section: "A", subjects: Object.values(subjectsMap) },
    { studentId: "SCIVIL-A08", name: "Anjali.T", dob: "2005-04-15", password: "2005-04-15", department: "Civil", section: "A", subjects: Object.values(subjectsMap) },
    


    { studentId: "SMECH-A01", name: "Ankur.S", dob: "2005-10-27", password: "2005-10-27", department: "Mech", section: "A", subjects: Object.values(subjectsMap) },
    { studentId: "SMECH-A02", name: "Rajeev.K", dob: "2005-09-15", password: "2005-09-15", department: "Mech", section: "A", subjects: Object.values(subjectsMap) },
    { studentId: "SMECH-A03", name: "Vikas.N", dob: "2005-08-22", password: "2005-08-22", department: "Mech", section: "A", subjects: Object.values(subjectsMap) },
    { studentId: "SMECH-A04", name: "Manish.P", dob: "2005-07-10", password: "2005-07-10", department: "Mech", section: "A", subjects: Object.values(subjectsMap) },
    { studentId: "SMECH-A05", name: "Sandeep.R", dob: "2005-06-18", password: "2005-06-18", department: "Mech", section: "A", subjects: Object.values(subjectsMap) },
    { studentId: "SMECH-A06", name: "Amit.T", dob: "2005-05-25", password: "2005-05-25", department: "Mech", section: "A", subjects: Object.values(subjectsMap) },
    { studentId: "SMECH-A07", name: "Pranav.B", dob: "2005-08-30", password: "2005-08-30", department: "Mech", section: "A", subjects: Object.values(subjectsMap) },
    { studentId: "SMECH-A08", name: "Rahul.M", dob: "2005-10-12", password: "2005-10-12", department: "Mech", section: "A", subjects: Object.values(subjectsMap) },
    { studentId: "SMECH-A09", name: "Sameer.V", dob: "2005-11-05", password: "2005-11-05", department: "Mech", section: "A", subjects: Object.values(subjectsMap) },
    { studentId: "SMECH-A10", name: "Yash.G", dob: "2005-04-15", password: "2005-04-15", department: "Mech", section: "A", subjects: Object.values(subjectsMap) },
    { studentId: "SMECH-A11", name: "Kunal.D", dob: "2005-03-20", password: "2005-03-20", department: "Mech", section: "A", subjects: Object.values(subjectsMap) },
    { studentId: "SMECH-A12", name: "Rohit.L", dob: "2005-02-18", password: "2005-02-18", department: "Mech", section: "A", subjects: Object.values(subjectsMap) },
    { studentId: "SMECH-A13", name: "Arjun.T", dob: "2005-01-25", password: "2005-01-25", department: "Mech", section: "A", subjects: Object.values(subjectsMap) },
    { studentId: "SMECH-A14", name: "Nitin.K", dob: "2005-12-05", password: "2005-12-05", department: "Mech", section: "A", subjects: Object.values(subjectsMap) }
        ]);

        // Insert Timetable Data
        const formattedTimetableData = timetableData.map(entry => ({
            teacherId: entry.teacherId,
            section: entry.section,
            subject: entry.subject,
            subjectId: subjectsMap[entry.subjectId],
            day: entry.day,
            timeSlot: entry.timeSlot
        }));
        await Timetable.insertMany(formattedTimetableData);

        // Insert Section Timetable Data
        const formattedSectionTimetableData = sectionTimetableData.map(sectionEntry => ({
            section: sectionEntry.section,
            day: sectionEntry.day,
            schedule: sectionEntry.schedule.map(slot => ({
                timeSlot: slot.timeSlot,
                subject: slot.subject,
                subjectId: subjectsMap[slot.subjectId],
                teacherId: slot.teacherId
            }))
        }));
        await SectionTimetable.insertMany(formattedSectionTimetableData);

        console.log("Database Seeded Successfully!");
        mongoose.connection.close();
    } catch (error) {
        console.error("Seeding Error:", error);
        mongoose.connection.close();
    }
};

seedDatabase();
