import React, { Component } from 'react'
import { View, Text, Image, ScrollView } from 'react-native'
import { showLoader } from '../actions/MainActions'
import { connect } from 'react-redux'
import { consts } from '../util/consts'
import Geolocation from '@react-native-community/geolocation';
import { changeUserLastLocation } from '../actions/MainActions'
import MapView, { Marker, Polyline } from 'react-native-maps'

class Map extends Component {
    componentWillMount() {
        this.getCurrentPosition()
    }

    getCurrentPosition() {
        this.props.showLoader(true)

        Geolocation.getCurrentPosition((info) => {
            this.props.showLoader(false)
            alert('Usuário encontrado')
            console.log(info.coords)
            this.props.changeUserLastLocation(info.coords)

            // isNeedCalculateBounds = true
            // this.props.getStopsNexts(this.props.userLastLocation.latitude, this.props.userLastLocation.longitude, this.props.defaultDistSearch)    

        });
        // navigator.geolocation.getCurrentPosition(
        //     (position) => {
        //         this.props.showLoader(false)
        //         alert('Usuário encontrado')
        //         // this.props.changeUserLastLocation(position.coords)

        //         // isNeedCalculateBounds = true
        //         // this.props.getStopsNexts(this.props.userLastLocation.latitude, this.props.userLastLocation.longitude, this.props.defaultDistSearch)
        //     },
        //     (error) => {
        //         alert(error.message)
        //         this.props.showLoader(false)
        //     },
        //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        // );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.renderMap()}
                {this.calculateBounds()}
            </View>
        );
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

        // if (this.props.nextsStops != null) {
        //     for (i = 0; i < this.props.nextsStops.length; i++) {
        //         coords = [...coords,
        //         {
        //             latitude: Number(this.props.nextsStops[i].lat),
        //             longitude: Number(this.props.nextsStops[i].long),
        //         }]
        //     }
        // }

        // if (this.props.currentLineTrackCoords !== null) {
        //     for (i = 0; i < this.props.currentLineTrackCoords.length; i++) {
        //         coords = [...coords, ...this.props.currentLineTrackCoords[i].coords]
        //     }


        // }

        // if (this.props.currentLineTrack.length === this.props.currentLineTrackCoords.length) {
        //     isNeedCalculateBounds = false
        // }

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
                    ref={(ref) => { this.mapRef = ref }}>
                    {/* {this.renderNextsStops()} */}
                    {this.renderMarkerUser()}
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
        // nextsStops: state.StopReducer.nextsStops,
        // currentLineTrack: state.LineReducer.currentLineTrack,
        // currentLineTrackCoords: state.LineReducer.currentLineTrackCoords,
        // track: state.LineReducer.track,
        // listWifiBus: state.BusReducer.listWifiBus,
        // listAccessibleBus: state.BusReducer.listAccessibleBus,
        // listACBus: state.BusReducer.listACBus,
        // defaultTimeTrack: state.MainReducer.defaultTimeTrack,
        // defaultDistSearch: state.MainReducer.defaultDistSearch,
        // notice: state.MainReducer.notice
    }
)

export default connect(mapStateToProps, { showLoader, changeUserLastLocation })(Map);