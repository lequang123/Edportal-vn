import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';
import {
    setAllDataBusiness,
    setCreateBusinessResult,
    setCreateBusinessPopup
} from './homeSlice';

const getAllDataBusiness = () => async dispatch => {
    const url = Site.resolveClientUrl('Home/GetAllDataBusiness');
    await DataService.getDataAsync(url).then(response => {
        dispatch(setAllDataBusiness(response.data));
    });
};

const createBusiness = data => async dispatch => {
    const url = Site.resolveClientUrl('Home/Create');
    await DataService.postDataAsync(url, data).then(response => {
        dispatch(setCreateBusinessResult(response.data));
    });
};

export const ActionCreators = {
    setAllDataBusiness,
    setCreateBusinessResult,
    setCreateBusinessPopup,
    getAllDataBusiness,
    createBusiness

};