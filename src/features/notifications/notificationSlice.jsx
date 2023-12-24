import { createSlice } from '@reduxjs/toolkit'
import getConfig from '../../utils/config';
import dksoluciones from '../../api/config';
import { setError, setSuccess } from '../error/errorSlice'

const initialState = []

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification: (state, action) => {
            return action.payload
        }
    }
});


export const getNotificationThunk = () => async (dispatch) => {
    try {
        const res = await dksoluciones.get('notification/', getConfig())
        const { data } = res.data
        dispatch(setNotification(data))
    } catch (error) {
        console.log(error)
        if (error.response.data.message === 'Session expired') {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            window.location.reload()
        }
    }
}

export const deleteNotificationThunk = (id) => async (dispatch) => {
    try {
        await dksoluciones.delete(`notification/${id}`, getConfig())
        dispatch(getNotificationThunk())
    } catch (error) {
        console.log(error)
        if (error.response.data.message === 'Session expired') {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            window.location.reload()
        }
    }
}

export const { setNotification } = notificationSlice.actions

export default notificationSlice.reducer