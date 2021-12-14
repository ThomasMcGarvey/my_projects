import * as studentService from "../../services/studentService.js";
import { getServerDataSuccess, getServerDataFailure } from "../todos/actions";

//==========( DISPLAY ALERT )

export const displayAlert = (text) => () => {
  alert(text);
};

//==========( GET STUDENT DATA )

export const getStudentProfiles = () => async (dispatch, getState) => {
  const getStudentsSuccess = (response) => {
    dispatch(getServerDataSuccess(response.data));
  };

  const getStudentsError = (response) => {
    dispatch(getServerDataFailure());
    dispatch(displayAlert(response));
  };

  await studentService
    .getStudents()
    .then(getStudentsSuccess)
    .catch(getStudentsError);
};
