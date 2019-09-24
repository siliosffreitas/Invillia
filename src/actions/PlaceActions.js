import axios from 'axios'

import { endpoints } from '../util/endpoints'
import { showLoader } from './MainActions'
import { consts } from '../util/consts'

import {
    CHANGE_PLACES,
    CHANGE_INFO_PLACE,
    RESET_INFO_PLACE
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

export const getInfoPlace = (place_id) => {
    return dispache => {
        dispache(showLoader(true))
        axios.get(endpoints.GET_INFO_PLACE, {
            // timeout:consts.timeout,
            params: {
                key: consts.google_maps_key,
                place_id
            }
        })
            .then(response => getInfoPlaceSucess(response, dispache))
            .catch(error => defaultFail(error, dispache))
    }
}
const getInfoPlaceSucess = (response, dispache) => {
    dispache(showLoader(false))
    dispache(changeInfoPlace(response.data.result))
    console.log(response.data.result)
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

export const changeInfoPlace = (infos) => {
    return {
        type: CHANGE_INFO_PLACE,
        payload: infos
    }
}

export const resetInfoPlace = () => {
    return {
        type: RESET_INFO_PLACE
    }
}