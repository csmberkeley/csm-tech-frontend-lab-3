import React, { useState, useEffect } from "react";
import { Section as SectionType, Student } from "../utils/types";
import { Link } from "react-router-dom";

interface SectionProps {
  match: {
    params: {
      id: string;
    };
  };
}

type SectionTypeNoId = Omit<SectionType, "id">;

export const Section = ({
  match: {
    params: { id },
  },
}: SectionProps) => {
  const [section, setSection] = useState<SectionTypeNoId>(undefined);
  const [students, setStudents] = useState<Student[]>([]);

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
            <Link to={`/students/${student.id}`}>{student.user.first_name} {student.user.last_name} (id: {student.id})</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
