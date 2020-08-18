export const FETCH_USER_LIST_REQUEST = 'FETCH_USER_LIST_REQUEST';
export const FETCH_USER_LIST_SUCCESS = 'FETCH_USER_LIST_SUCCESS';
export const FETCH_USER_LIST_FAIL = 'FETCH_USER_LIST_FAIL';

export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAIL = 'CREATE_USER_FAIL';

export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAIL = 'DELETE_USER_FAIL';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAIL = 'UPDATE_USER_FAIL';

export const fetchUserListRequest = () => ({
  type: FETCH_USER_LIST_REQUEST,
});

export const fetchUserListSuccess = (data) => ({
  type: FETCH_USER_LIST_SUCCESS,
  data,
});

export const fetchUserListFail = errors => ({
  type: FETCH_USER_LIST_FAIL,
  errors,
});

export const createUserRequest = () => ({
  type: CREATE_USER_REQUEST,
});

export const createUserSuccess = (createData) => ({
  type: CREATE_USER_SUCCESS,
  createData,
});

export const createUserFail = errors => ({
  type: CREATE_USER_FAIL,
  errors,
});

export const deleteUserRequest = () => ({
  type: DELETE_USER_REQUEST,
});

export const deleteUserSuccess = (deleteData) => ({
  type: DELETE_USER_SUCCESS,
  deleteData,
});

export const deleteUserFail = errors => ({
  type: DELETE_USER_FAIL,
  errors,
});

export const updateUserRequest = () => ({
  type: UPDATE_USER_REQUEST,
});

export const updateUserSuccess = (updateData) => ({
  type: UPDATE_USER_SUCCESS,
  updateData,
});

export const updateUserFail = errors => ({
  type: UPDATE_USER_FAIL,
  errors,
});

export const updateUser = (firstName, lastName, email, user, index) => async dispatch => {
  dispatch(updateUserRequest())
  const newArray = [...user];
  newArray[index].first_name = firstName;
  newArray[index].last_name = lastName;
  newArray[index].email = email;
  dispatch(updateUserSuccess(newArray))
}

export const deleteUser = (user, index) => async dispatch => {
  dispatch(deleteUserRequest())
  const newArray = [...user];
  newArray.splice(index, 1);
  dispatch(deleteUserSuccess(newArray))
}

export const createUser = (params) => async dispatch => {
  try {
    dispatch(createUserRequest())
    const result = await fetch('https://reqres.in/api/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });
    const response = await result.json();
    dispatch(createUserSuccess(response))
  } catch (error) {
    dispatch(createUserFail(error))
  }
}


export const fetchUserList = () => async dispatch => {
  try {
    dispatch(fetchUserListRequest())
    const result = await fetch('https://reqres.in/api/users');
    const user = await result.json();
    dispatch(fetchUserListSuccess(user.data))
  } catch (error) {
    dispatch(fetchUserListFail(error))
  }
}
