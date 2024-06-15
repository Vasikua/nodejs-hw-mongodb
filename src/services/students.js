import { studentsCollection } from "../db/models/student.js";

export const getAllStudents = async () => {
    const students = await studentsCollection.find();
    return students;
};

export const getStudentById = async (studentId) => {
    const student = await studentsCollection.findById(studentId);
    return student;
};