import React, { useState, useEffect } from "react";
import { Section as SectionType, Student } from "../utils/types";
import { Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";

export const Section = () => {
  const [section, setSection] = useState<SectionType>(undefined as never);
  const { id } = useParams();
  var count = 0;

  useEffect(() => {
    fetch(`/api/sections/${id}/details/`)
      .then((res) => res.json())
      .then((data) => {
        setSection(data);
      });
    /* Task 2: Make an API call to get the student data. */
  }, []);
  
  return (
    <div>
      <h1>Section</h1>
      <p>Task 1: Use the UseEffect hook to implement this count button! </p>
      <button>I was clicked {count} times!</button>
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
      <p>Task 2: Make an API call to get the student data.</p>
    </div>
  );
};
