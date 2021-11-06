import "../App.css";
import React, { useEffect, useState } from "react";
import * as studentService from "../services/studentService.js";
import { useFormik } from "formik";
import { TextField } from "@material-ui/core";
import SingleStudent from "./SingleStudent";

function StudentProfiles(props) {
  //==========( FORMIK HOOK )

  // handle form values
  const { values, handleChange } = useFormik({
    initialValues: {
      search: "",
      tag: "",
    },
  });

  //==========( STATE HOOKS )

  // state to hold mapped students
  const [displayStudent, setDisplayStudent] = useState();

  // state to hold student data from database
  const [students, setStudents] = useState();

  //==========( EFFECT HOOKS )

  // useEffect to handle the changes in students "state" values.
  useEffect(() => {
    if (students === undefined) {
      // if students value is empty hydrate it
      getStudents();
    }
    if (students !== undefined) {
      // if students value changes, map it.
      mapStudents(students);
    }
    if (values.tag !== "" || values.search !== "") {
      // if tag or search field values are not empty
      sortStudents();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [students, values.tag, values.search]);

  //==========( FILTER STUDENTS )

  // Function to start the process of filtering students.
  const sortStudents = () => {
    let filteredStudents = students.filter(filterStudents);
    mapStudents(filteredStudents);
  };

  // Filter each student indivitually depending on search or tag keywords.
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
          // if tag keyword is present return student.
          return (result = aStudent);
        } else {
          // if search keyword is present, but no tag keyword. Do not return student.
          return result;
        }
      }

      // if search keyword is present and no tag is present return student.
      else if (values.tag === "") {
        return (result = aStudent);
      }
    }
    // if student does not match the criteria do not return student.
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

  // Ajax call to get student data.
  const getStudents = () => {
    studentService
      .getStudents()
      .then(getStudentsSuccess)
      .catch(getStudentsError);
  };

  // Upon success set  students "state" to student array.
  const getStudentsSuccess = (response) => {
    let studentList = response.data.students;
    setStudents(studentList);
  };

  // Upon error log error. Normally you would use a logger.
  const getStudentsError = (response) => {
    console.log("Error", response);
  };

  //==========( MAP STUDENTS )

  // Map students to mappedStudents and then set display student "state" to mapped value.
  const mapStudents = (students) => {
    let mappedStudents = students.map(mapStudent);
    setDisplayStudent(mappedStudents);
  };

  // Map students individually using SingleStudent component.
  const mapStudent = (student) => (
    <React.Fragment key={`student${student.id}`}>
      <SingleStudent single={student} tagCall={tagCallBack} />
    </React.Fragment>
  );

  //==========( CALL BACK: STUDENT PROFILES <- SINGLE STUDENT )

  // Call back to push tag into target student array.
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

  //==========( RETURN )

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

/*
Note: Normally I would use prop types for prop validation 
and yup for form validation.
*/
