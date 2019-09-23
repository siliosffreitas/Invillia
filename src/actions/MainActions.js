import axios from 'axios';

import {
    ACTIVITY_LOADER,   
} from './types';

export const showLoader = (show) => {
    return {
        type: ACTIVITY_LOADER,
        payload: show
    }
}