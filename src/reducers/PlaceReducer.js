import {
    CHANGE_PLACES,
    CHANGE_INFO_PLACE,
    RESET_INFO_PLACE
} from '../actions/types';

const INITIAL_STATE = {
    placesFoundSearch: null,
    infoPlace: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHANGE_PLACES:
            return { ...state, placesFoundSearch: action.payload }
        case CHANGE_INFO_PLACE:
            return { ...state, infoPlace: action.payload }
        case RESET_INFO_PLACE:
            return { ...state, infoPlace: null }
        default:
            return state;
    }
}