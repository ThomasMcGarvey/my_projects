import React, { useEffect, useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import { TextField } from "@material-ui/core";

function SingleStudent(student) {
  //==========( STATE HOOKS )

  const [visibility, setVisibility] = useState("d-none");
  const [icon, setIcon] = useState(faPlus);
  /*
  const gradeAvg = useMemo(() => {
    return calculateGradeAvg();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  */
  const [tags, setTags] = useState(() => {
    if (student.single.tags) {
      return student.single.tags;
    }
  });
  const [submit, setSubmit] = useState();

  //==========( FORMIK HOOK )

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      addTag: "",
    },
    onSubmit: ({ addTag }) => {
      if (addTag !== "") {
        student.tagCall(addTag.toLowerCase(), student.single.id);
        setSubmit(addTag);
        values.addTag = "";
      }
    },
  });

  //==========( EFFECT HOOK )

  useEffect(() => {
    if (student.single.tags && student.single.tags !== undefined) {
      let mappedTags = student.single.tags.map(mapTags);
      setTags(mappedTags);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submit]);

  //==========( SHOW/HIDE GRADES )

  useEffect(() => {
    if (visibility === "d-none") {
      setIcon(faPlus);
    } else if (visibility === "") {
      setIcon(faMinus);
    }
  }, [visibility]);

  const handleVisibility = () => {
    if (visibility === "d-none") {
      setVisibility("");
    } else if (visibility === "") {
      setVisibility("d-none");
    }
  };

  //==========( MAP TAGS )

  const mapTags = (tag) => {
    return (
      <React.Fragment key={`tag${student.single.id}${tag}`}>
        <div className="tag-stickey text-center m-1 p-1">{tag}</div>
      </React.Fragment>
    );
  };

  //==========( CALCULATE AVERAGE )

  const calculateGradeAvg = () => {
    let grades = student.single.grades;
    let sum = 0;
    let length = grades.length;
    for (let i = 0; i < length; i++) {
      sum = sum + Number(grades[i]);
    }
    let average = sum / length;
    return average;
  };

  const gradeAvg = useMemo(() => {
    return calculateGradeAvg();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //==========( MAP GRADES )

  const mapCurrentGrades = () => {
    let count = 0;
    const mapGrades = (grade) => {
      ++count;
      return (
        <React.Fragment key={`grade${count}#${student.single.id}`}>
          <div>
            Test {count}: {grade}%
          </div>
        </React.Fragment>
      );
    };
    let mappedGrades = student.single.grades.map(mapGrades);
    return mappedGrades;
  };

  //==========( CONTENT )

  return (
    <div className="row list-wd">
      <div className="col-sm-2">
        <img
          className="rounded-circle border img-avatar"
          src={student.single.pic}
          alt=""
        />
      </div>

      <div className="col-sm-9">
        <h2 className="name-txt">
          <strong>
            {student.single.firstName.toUpperCase()}{" "}
            {student.single.lastName.toUpperCase()}
          </strong>
        </h2>
        <div className="container pb-2">
          <div>Email: {student.single.email}</div>
          <div>Company: {student.single.company}</div>
          <div>Skill: {student.single.skill}</div>
          <div>Average: {gradeAvg}%</div>
        </div>
      </div>
      <div className="col-sm-1">
        <FontAwesomeIcon
          className="icon-color"
          onClick={handleVisibility}
          icon={icon}
          size="2x"
        />
      </div>
      <div className={`col-sm-2${visibility}`} />
      <div id="grades" className={`col-sm-10 ${visibility}`}>
        <div className="container pb-2">{mapCurrentGrades()}</div>
      </div>
      <div className="col-sm-2" />
      <div className="col-sm-10">
        <div className="container d-flex flex-row flex-wrap">
          {student.single.tags ? tags : ""}
        </div>
      </div>
      <div className="col-sm-2" />
      <div className="col-sm-10">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <TextField
              name="addTag"
              value={values.addTag}
              onChange={handleChange}
              size="small"
              id="addTag"
              label="Add a tag"
              variant="standard"
            />
          </form>
        </div>
      </div>
      <hr className="border" />
    </div>
  );
}

export default React.memo(SingleStudent);
