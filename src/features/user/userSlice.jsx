import { createSlice } from '@reduxjs/toolkit'
import dksoluciones from '../../api/config';
import getConfig from '../../utils/config';
import { setError, setSuccess } from '../error/errorSlice'


const initialState = {
    userSession: null,
    usersAdmin: [],
    usersSeller: [],
}


export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUsersAdmin: (state, action) => {
            state.usersAdmin = action.payload;
        },
        setUsersSeller: (state, action) => {
            state.usersSeller = action.payload;
        }
    },
});


export const setUsersAdminThunk = () => async (dispatch) => {
    try {
        const res = await dksoluciones.get('user/getuseradmin', getConfig());
        const { users } = res.data.data;
        dispatch(setUsersAdmin(users));
    } catch (error) {
        console.log(error);
    }
};

export const setUsersSellerThunk = () => async (dispatch) => {
    try {
        const res = await dksoluciones.get('user/getuserseller', getConfig());
        const { users } = res.data.data;
        dispatch(setUsersSeller(users));
    } catch (error) {
        console.log(error);
        if (error.response.data.message === 'Session expired') {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            window.location.reload()
        }
        dispatch(setError(error.response.data.message))
    }
};

export const createUserThunk = (data) => async (dispatch) => {
    try {
        await dksoluciones.post('user/createuser', data, getConfig());
        dispatch(setUsersAdminThunk());
        dispatch(setSuccess(true))
    } catch (error) {
        console.log(error);
        if (error.response.data.message === 'Session expired') {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            window.location.reload()
        }
        dispatch(setError(true))
        console.log(error.response.data.message)
    }
};

export const createUserSellerThunk = (data) => async (dispatch) => {
    try {
        await dksoluciones.post('user/createuserseller', data);
        dispatch(setSuccess(true))
    } catch (error) {
        console.log(error);
        if (error.response.data.message === 'Session expired') {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            window.location.reload()
        }
        dispatch(setError(true))
        console.log(error.response.data.message)
    }
};

export const rechargeUserThunk = (data, id) => async (dispatch) => {
    try {
        await dksoluciones.patch(`user/agreebalance/${id}`, data, getConfig());
        dispatch(setUsersSellerThunk());
    } catch (error) {
        console.log(error);
        if (error.response.data.message === 'Session expired') {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            window.location.reload()
        }
    }
};

export const editUserThunk = (data, id) => async (dispatch) => {
    try {
        const { id, username, email } = data
        const res = await dksoluciones.put(`user/updateuser/${id}`, { username, email }, getConfig());
        dispatch(setUsersAdminThunk());
        console.log(res.data.data)
    } catch (error) {
        console.log(error);

        if (error.response.data.message === 'Session expired') {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            window.location.reload()
        }
    }
};


export const deleteUserThunk = (id) => async (dispatch) => {
    try {
        await dksoluciones.delete(`user/deleteuser/${id}`, getConfig());
        dispatch(setUsersAdminThunk());
    } catch (error) {
        console.log(error);
        if (error.response.data.message === 'Session expired') {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            window.location.reload()
        }
    }
};




export const { setUsersAdmin, setUsersSeller } = userSlice.actions;

export default userSlice.reducer;