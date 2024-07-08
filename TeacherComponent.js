import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeacherComponent = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [grades, setGrades] = useState([]);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const response = await axios.get('/api/students'); // Актуализирайте URL, ако е необходимо
    setStudents(response.data);
  };

  const fetchStudentData = async (studentId) => {
    const gradesResponse = await axios.get(`/api/students/${studentId}/grades`);
    const attendanceResponse = await axios.get(`/api/students/${studentId}/attendance`);
    setGrades(gradesResponse.data);
    setAttendance(attendanceResponse.data);
  };

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
    fetchStudentData(student.id);
  };

  const updateGrade = async (gradeId, newGrade) => {
    await axios.put(`/api/grades/${gradeId}`, { value: newGrade });
    fetchStudentData(selectedStudent.id);
  };

  const updateAttendance = async (attendanceId, newStatus) => {
    await axios.put(`/api/attendance/${attendanceId}`, { status: newStatus });
    fetchStudentData(selectedStudent.id);
  };

  return (
    <div>
      <h2>Teacher Dashboard</h2>
      <div>
        <h3>Students</h3>
        <ul>
          {students.map((student) => (
            <li key={student.id} onClick={() => handleStudentSelect(student)}>
              {student.name}
            </li>
          ))}
        </ul>
      </div>
      {selectedStudent && (
        <div>
          <h3>{selectedStudent.name}'s Grades and Attendance</h3>
          <div>
            <h4>Grades</h4>
            <ul>
              {grades.map((grade) => (
                <li key={grade.id}>
                  {grade.subject}: 
                  <input 
                    type="text" 
                    value={grade.value} 
                    onChange={(e) => updateGrade(grade.id, e.target.value)}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Attendance</h4>
            <ul>
              {attendance.map((record) => (
                <li key={record.id}>
                  {record.day}: 
                  <select 
                    value={record.status} 
                    onChange={(e) => updateAttendance(record.id, e.target.value)}
                  >
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                    <option value="late">Late</option>
                  </select>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherComponent;



