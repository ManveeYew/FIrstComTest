const initialState = {
  isLoading: false,
  errors: [],
  data: [],

  //Create
  createIsLoading: false,
  createErrors: [],
  createData: [],

  //Delete
  deleteIsLoading: false,
  deleteErrors: [],
  deleteData: [],

  //Update
  updateIsLoading: false,
  updateErrors: [],
  updateData: [],
}

export const userReducer = (state = initialState, action) => {
  const { data, createData, deleteData, updateData } = action
  switch (action.type) {
    case 'FETCH_USER_LIST_REQUEST':
      return {
        ...state,
        isLoading: true
      }
    case 'FETCH_USER_LIST_SUCCESS':
      return {
        ...state,
        data: data,
        isLoading: false
      }
    case 'FETCH_USER_LIST_FAIL':
      return {
        ...state,
        isLoading: false
      }
    case 'CREATE_USER_REQUEST':
      return {
        ...state,
        createIsLoading: true
      }
    case 'CREATE_USER_SUCCESS':
      return {
        ...state,
        data: [...state.data, createData],
        createIsLoading: false
      }
    case 'CREATE_USER_FAIL':
      return {
        ...state,
        createIsLoading: false
      }
    case 'DELETE_USER_REQUEST':
      return {
        ...state,
        deleteIsLoading: true
      }
    case 'DELETE_USER_SUCCESS':
      return {
        ...state,
        data: deleteData,
        deleteIsLoading: false
      }
    case 'DELETE_USER_FAIL':
      return {
        ...state,
        deleteIsLoading: false
      }
    case 'UPDATE_USER_REQUEST':
      return {
        ...state,
        updateIsLoading: true
      }
    case 'UPDATE_USER_SUCCESS':
      return {
        ...state,
        data: updateData,
        updateIsLoading: false
      }
    case 'UPDATE_USER_FAIL':
      return {
        ...state,
        updateIsLoading: false
      }
    default:
      return state
  }
}

export default userReducer