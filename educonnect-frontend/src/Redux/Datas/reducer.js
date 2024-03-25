import * as types from "./types";

const initialState = {
  loading: false,
  error: false,
  reports: [],
  doubts: [],
  notices: [],
  dashboard: [],
};

export default function dataReducer(state = initialState, { type, payload }) {
  switch (type) {
    case types.GET_DOUBT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.GET_DOUBT_SUCCESS:
      return {
        ...state,
        loading: false,
        doubts: payload,
      };
    case types.GET_NOTICE_SUCCESS:
      return {
        ...state,
        loading: false,
        notices: payload,
      };
    
    case types.GET_TEACHERS_SUCCESS:
      return {
        ...state,
        loading:false,
        teachers:payload
      } 

    case types.GET_ALL_TEACHERS_SUCCESS:
      return {
        ...state,
        loading:false,
        teachers:payload
      } 
    
    case types.GET_ALLDATA_SUCCESS:
      return {
        ...state,
        loading: false,
        dashboard: payload,
      };
    case types.DELETE_DOUBT_SUCCESS:
      return {
        ...state,
        doubts: [...state.doubts.filter((ele) => ele.id !== payload)],
      };

      case types.INSERT_ANSWER_SUCCESS:
        const updatedDoubt = payload;
        const updatedDoubts = state.doubts.map((ele) =>
          ele.id === updatedDoubt.doubtID ? { ...ele, doubtID: updatedDoubt.doubtID, answer: updatedDoubt.answer } : ele
        );
        return {
          ...state,
          doubts: updatedDoubts,
        };
    case types.DELETE_REPORT_SUCCESS:
      return {
        ...state,
        reports: [...state.reports.filter((ele) => ele.id !== payload)],
      };
    case types.GET_REPORT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        reports: payload,
      };

    default:
      return state;
  }
}
