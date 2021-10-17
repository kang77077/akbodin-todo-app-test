export const getAllTaskAction = (e) => dispatch => {
  dispatch({
    type: "GET_TASK",
    payload: e
  })
}