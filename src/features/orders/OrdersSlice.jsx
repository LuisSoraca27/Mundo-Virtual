import { createSlice } from '@reduxjs/toolkit'
import dksoluciones from '../../api/config';
import getConfig from '../../utils/config';

const initialState = {
    ordersDay: [],
    ordersById: [],
    ordersMonth: [],
}

const OrdersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setOrdersDay(state, action) {
            state.ordersDay = action.payload
        },
        setOrdersMonth(state, action) {
            state.ordersMonth = action.payload
        },
        setOrdersById(state, action) {
            state.ordersById = action.payload
        }
    }
});

export const getOrdersDay = () => async (dispatch) => {
    try {
        const { data } = await dksoluciones.get('order/day/', getConfig());
        dispatch(setOrdersDay(data.data));
        console.log(data.data);
    } catch (error) {
        console.log(error);
    }
}


export const getOrdersDayById = (id) => async (dispatch) => {
    try {
        const { data } = await dksoluciones.get('order/day/user/' + id + '/', getConfig());
        dispatch(setOrdersById(data.data));
        console.log(data.data);
    } catch (error) {
        console.log(error);
    }
}

export const getOrdersMonth = () => async (dispatch) => {
    try {
        const { data } = await dksoluciones.get('order/month/', getConfig());

        dispatch(setOrdersMonth(data.data));
    } catch (error) {
        console.log(error);
    }
}



export const { setOrdersDay, setOrdersMonth, setOrdersById } = OrdersSlice.actions

export default OrdersSlice.reducer