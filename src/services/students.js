import { studentsCollection } from "../db/models/student";

export const getAllStudents = async () => {
    const students = studentsCollection.find();
    return students;
};

export const getStudentById = async (studentId) =>{
    const student = studentsCollection.findById(studentId);
    return student;
}