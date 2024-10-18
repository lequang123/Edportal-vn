import { createSlice } from '@reduxjs/toolkit';

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        GridData: {
            business: []
        },
        createBusinessPopup: { show: false },
        createBusinessResult: null,
        editBusinessPopup: { show: false },
        editBusinessResult: null,
        deleteBusinessPopup: { show: false },
        deleteBusinessResult: null
    },
    reducers: {
        setAllDataBusiness: (state, action) => {
            state.GridData = action.payload;
        },
        setCreateBusinessPopup: (state, action) => {
            state.createBusinessPopup = action.payload;
        },
        setCreateBusinessResult: (state, action) => {
            state.createBusinessResult = action.payload;
        },
    }
});

const { actions, reducer } = homeSlice;

export const {
    setAllDataBusiness,
    setCreateBusinessPopup,
    setCreateBusinessResult
} = actions;

export default reducer;