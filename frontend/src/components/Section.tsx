import React, { useState, useEffect } from "react";
import { Section as SectionType, Student } from "../utils/types";
import { Link, useParams } from "react-router-dom";

export const Section = () => {
  const [section, setSection] = useState<SectionType>(undefined as never);
  const [students, setStudents] = useState<Student[]>([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/sections/${id}/details/`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSection(data);
      });
    fetch(`/api/sections/${id}/students/`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setStudents(data);
      });
  }, []);

  const handleToggleActive = (student_id: number) => {
    const newStudents = [...students];
    const student = newStudents.find((s) => s.id === student_id);
    if (student) {
      student.active = !student.active;
      setStudents(newStudents);

      // update database
      fetch(`/api/students/${student_id}/details`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          active: student.active,
        }),
      });
    }
  };

  return (
    <div>
      <h1>Section</h1>
      {section && (
        <div>
          <p>
            {section.mentor.course.name} (id: {id})
          </p>
          <p>
            Mentor: {section.mentor.user.first_name}{" "}
            {section.mentor.user.last_name}
          </p>
        </div>
      )}
      <p>Students:</p>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            <button onClick={() => handleToggleActive(student.id)}>
              {student.active ? "Set inactive" : "Set active"}
            </button>{" "}
            <Link to={`/students/${student.id}`}>
              {student.user.first_name} {student.user.last_name} (id:{" "}
              {student.id})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
