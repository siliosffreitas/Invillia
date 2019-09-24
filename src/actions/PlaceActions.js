import axios from 'axios'

import { endpoints } from '../util/endpoints'
import { showLoader } from './MainActions'
import { consts } from '../util/consts'

import {
    CHANGE_PLACES
} from './types'

export const getPlaces = (info) => {
    return dispache => {
        dispache(showLoader(true))
        axios.get(endpoints.GET_LIST_PLACES, {
            // timeout:consts.timeout,
            params: {
                key: consts.google_maps_key,
                location: `${info.latitude},${info.longitude}`,
                radius: consts.default_radius_search_places,
                // name: termSearch
            }
        })
            .then(response => getPlacesSucess(response, dispache))
            .catch(error => defaultFail(error, dispache))
    }
}
const getPlacesSucess = (response, dispache) => {
    dispache(showLoader(false))
    dispache(changePlacesSearch(response.data.results))
    console.log(response.data.results)
}

const defaultFail = (error, dispache) => {
    dispache(showLoader(false));
    alert(`Error: ${error.response.status}`)
    console.log(`Error: ${error.response.status}`)
}

export const changePlacesSearch = (places) => {
    return {
        type: CHANGE_PLACES,
        payload: places
    }
}