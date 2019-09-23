import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';

import {
    ACTIVITY_LOADER,
    CHANGE_TAB_SELECTED,
} from '../actions/types';

const INITIAL_STATE = {
    showLoader: false,
    selectedTab: 'home',
    titleSelectedTab: 'Locais',
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ACTIVITY_LOADER:
            return { ...state, showLoader: action.payload }

        case CHANGE_TAB_SELECTED:
            let titleTab;
            switch (action.payload) {
                case 'home':
                    titleTab = "Locais";
                    break;
                case 'about':
                    titleTab = "Informações";
                    break;
                default:
                    titleTab = "Locais";
            }
            // Actions.refresh({ key: 'main', title: titleTab });
            return { ...state, selectedTab: action.payload, titleSelectedTab: titleTab }
        default:
            return state;
    }
}