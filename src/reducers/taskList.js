const initialState = {
  task_list: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_TASK":
      return {
        ...state,
        task_list: action.payload
      }
    default:
      return state
  }
}