import "../App.css";
import React, { useEffect, useState } from "react";
import * as studentService from "../services/studentService.js";
import { useFormik } from "formik";
import { TextField } from "@material-ui/core";
import SingleStudent from "./SingleStudent";

function StudentProfiles(props) {
  //==========( FORMIK HOOK )

  const { values, handleChange } = useFormik({
    initialValues: {
      search: "",
      tag: "",
    },
  });

  //==========( STATE HOOKS )

  const [displayStudent, setDisplayStudent] = useState();

  const [students, setStudents] = useState();

  //==========( EFFECT HOOKS )

  useEffect(() => {
    if (students === undefined) {
      getStudents();
    }
    if (students !== undefined) {
      mapStudents(students);
    }
    if (values.tag !== "" || values.search !== "") {
      sortStudents();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [students, values.tag, values.search]);

  //==========( FILTER STUDENTS )

  const sortStudents = () => {
    let filteredStudents = students.filter(filterStudents);
    mapStudents(filteredStudents);
  };

  const filterStudents = (aStudent) => {
    let result = null;

    // Search filter
    if (
      aStudent.firstName.toLowerCase().includes(values.search.toLowerCase()) ||
      aStudent.lastName.toLowerCase().includes(values.search.toLowerCase()) ||
      `${aStudent.firstName} ${aStudent.lastName}`
        .toLowerCase()
        .includes(values.search.toLowerCase())
    ) {
      // Tag filter
      if (
        values.tag !== "" &&
        aStudent.tags !== undefined &&
        aStudent.tags[0]
      ) {
        let matchingTag = aStudent.tags.filter(filterTags);
        if (matchingTag[0]) {
          return (result = aStudent);
        } else {
          return result;
        }
      } else if (values.tag === "") {
        return (result = aStudent);
      }
    }

    return result;
  };

  //==========( FILTER TAGS )

  const filterTags = (aTag) => {
    let result = null;

    if (aTag.includes(values.tag.toLowerCase())) {
      return (result = aTag);
    }
    return result;
  };

  //==========( AJAX CALL )

  const getStudents = () => {
    studentService
      .getStudents()
      .then(getStudentsSuccess)
      .catch(getStudentsError);
  };

  const getStudentsSuccess = (response) => {
    let studentList = response.data.students;
    setStudents(studentList);
  };

  const getStudentsError = (response) => {
    console.log("Error", response);
  };

  //==========( MAP STUDENTS )

  const mapStudents = (students) => {
    let mappedStudents = students.map(mapStudent);
    setDisplayStudent(mappedStudents);
  };

  const mapStudent = (student) => (
    <React.Fragment key={`student${student.id}`}>
      <SingleStudent single={student} tagCall={tagCallBack} />
    </React.Fragment>
  );

  //==========( CALL BACK: STUDENT PROFILES <- SINGLE STUDENT )

  const tagCallBack = (tag, studentId) => {
    let filterAddTag = (aStudent) => {
      let result = aStudent;
      if (aStudent.tags === undefined) {
        aStudent.tags = [];
      }
      if (aStudent.id === studentId) {
        aStudent.tags.push(tag);
      }
      return result;
    };
    let newStudentArr = students.filter(filterAddTag);
    setStudents(newStudentArr);
  };

  //==========( CONTENT )

  return (
    <div className="container d-flex align-items-center justify-content-center list-container">
      <div className="card list-hw">
        <div className="">
          <TextField
            name="search"
            value={values.search}
            onChange={handleChange}
            fullWidth
            size="small"
            id="search"
            label="Search"
            variant="standard"
          />
        </div>
        <div className="">
          <TextField
            name="tag"
            value={values.tag}
            onChange={handleChange}
            fullWidth
            size="small"
            id="tag"
            label="Tag"
            variant="standard"
          />
        </div>
        <div className="list-scroll scroll4">{displayStudent}</div>
      </div>
    </div>
  );
}

export default React.memo(StudentProfiles);
