import React, { Component } from 'react'
import { View, Text, Image, ScrollView } from 'react-native'
import { showLoader } from '../actions/MainActions'
import {Actions} from 'react-native-router-flux';
import { connect } from 'react-redux'
import { consts } from '../util/consts'
import Geolocation from '@react-native-community/geolocation';
import { changeUserLastLocation } from '../actions/MainActions'
import MapView, { Marker, Polyline } from 'react-native-maps'
import { getPlaces } from '../actions/PlaceActions';

class Map extends Component {
    componentWillMount() {
        this.getCurrentPosition()
    }

    getCurrentPosition() {
        this.props.showLoader(true)

        Geolocation.getCurrentPosition((info) => {
            this.props.showLoader(false)
            // alert('Usuário encontrado')
            console.log(info.coords)
            this.props.changeUserLastLocation(info.coords)

            this.props.getPlaces(info.coords)

            // isNeedCalculateBounds = true
            // this.props.getStopsNexts(this.props.userLastLocation.latitude, this.props.userLastLocation.longitude, this.props.defaultDistSearch)    

        });
    }

    render() {
        console.log('Map.render');
        console.log(this.props.placesFound);
        return (
            <View style={{ flex: 1 }}>
                {this.renderMap()}
                {this.calculateBounds()}
            </View>
        );
    }



    renderNextsStops() {

        if (this.props.placesFound) {
            return (
                this.props.placesFound.map(local => (
                    <Marker
                        key={local.id}
                        coordinate={{
                            latitude: Number(local.geometry.location.lat),
                            longitude: Number(local.geometry.location.lng),
                        }}
                        onCalloutPress={() => this.openPlace(local)}
                        description={local.vicinity}
                        image={local.icon}
                        title={local.name}
                    />
                ))
            )
        }
    }

    openPlace(place) {
        // console.log(place)
        Actions.local({ place })
    }

    calculateBounds() {

        let coords = []
        if (this.props.userLastLocation != null) {
            coords = [...coords,
            {
                latitude: this.props.userLastLocation.latitude,
                longitude: this.props.userLastLocation.longitude,
            }]
        }

        if (this.props.placesFound) {
            for (i = 0; i < this.props.placesFound.length; i++) {
                coords = [...coords,
                {
                    latitude: Number(this.props.placesFound[i].geometry.location.lat),
                    longitude: Number(this.props.placesFound[i].geometry.location.lng),
                }]
            }
        }

        // if (this.props.currentLineTrackCoords !== null) {
        //     for (i = 0; i < this.props.currentLineTrackCoords.length; i++) {
        //         coords = [...coords, ...this.props.currentLineTrackCoords[i].coords]
        //     }


        // }

        // if (this.props.currentLineTrack.length === this.props.currentLineTrackCoords.length) {
        //     isNeedCalculateBounds = false
        // }``

        if (coords.length > 0 && this.mapRef != undefined) {
            // console.log(coords)
            this.mapRef.fitToCoordinates(coords,
                {
                    edgePadding: {
                        top: 75,
                        right: 75,
                        bottom: 75,
                        left: 75
                    },
                    animated: false
                }
            )
        }
    }

    renderMap() {
        if (this.props.userLastLocation) {

            return (
                <MapView
                    ini
                    style={{
                        flex: 1
                    }}
                    showsUserLocation={true}
                    ref={(ref) => { this.mapRef = ref }}>
                    {this.renderNextsStops()}
                    {/* {this.renderMarkerUser()} */}
                    {/* {this.renderPolylines()}
                    {this.renderTrack()} */}
                </MapView>
            )
        } else {
            return (
                <MapView
                    style={{
                        flex: 1
                    }}
                    region={{
                        latitude: consts.lat_city,
                        longitude: consts.lng_city,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                />
            )
        }
    }

    renderMarkerUser() {
        if (this.props.userLastLocation) {
            let coordinate = {
                latitude: this.props.userLastLocation.latitude,
                longitude: this.props.userLastLocation.longitude,
            }

            return (
                <Marker
                    key="me"
                    coordinate={coordinate}
                    description={this.props.keywords}
                    // image={pin_user}
                    title="Eu"
                    pinColor='blue'
                />
            )
        }
    }
}

mapStateToProps = state => (
    {
        userLastLocation: state.MainReducer.userLastLocation,
        placesFound: state.PlaceReducer.placesFoundSearch
    }
)

export default connect(mapStateToProps, { showLoader, changeUserLastLocation, getPlaces })(Map);