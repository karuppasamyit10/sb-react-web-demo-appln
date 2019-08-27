import { ACTION_TYPES } from '../utils/Constants';

let initialState = {
  userDetail :{},
  isUploading : false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.USER_DETAILS:
    state ={
      ...state,
      userDetail : action.payload,
    }
    break;
    case ACTION_TYPES.CHANGE_UPLOADING_STATUS:
    state ={
      ...state,
      isUploading : action.payload,
    }
    console.log(state)
    break;
    default:
      break;
  }
  return state;
};
export default userReducer;

