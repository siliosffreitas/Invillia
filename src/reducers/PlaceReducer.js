import {
    CHANGE_PLACES
} from '../actions/types';

const INITIAL_STATE = {
    placesFoundSearch: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHANGE_PLACES:
            return { ...state, placesFoundSearch: action.payload }
        default:
            return state;
    }
}