import axios from 'axios';

import {
    ACTIVITY_LOADER,   
    CHANGE_TAB_SELECTED,
} from './types';

export const showLoader = (show) => {
    return {
        type: ACTIVITY_LOADER,
        payload: show
    }
}

export const changeTab = (text) => {
    return {
        type: CHANGE_TAB_SELECTED,
        payload: text
    }
}