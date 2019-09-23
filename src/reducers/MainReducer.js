import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';

import {
    ACTIVITY_LOADER,
} from '../actions/types';

const INITIAL_STATE = {
    showLoader: false,
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ACTIVITY_LOADER:
            return { ...state, showLoader: action.payload }
        default:
            return state;
    }
}