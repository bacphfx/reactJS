import * as ActionTypes from "./ActionTypes";

export const DeptDetail = (
  state = { isLoading: true, errMess: null, deptDetail: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_DEPTDETAIL:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        deptDetail: action.payload,
      };

    case ActionTypes.DEPTDETAIL_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    default:
      return state;
  }
};
