import React, { Component } from 'react'
import { View, Text, Image, ScrollView } from 'react-native'
import { showLoader } from '../actions/MainActions'
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
                        onCalloutPress={() => this.openStop(parada)}
                        description={local.vicinity}

                        title={local.name}
                    />
                ))
            )

        }

        // if (this.props.nextsStops !== null) {
        //     if (this.props.track != null && this.props.track.paradas) {
        //         return (
        //             this.props.track.paradas.map(parada => (
        //                 <Marker
        //                     key={parada.codigo}
        //                     coordinate={{
        //                         latitude: Number(parada.lat),
        //                         longitude: Number(parada.long),
        //                     }}
        //                     onCalloutPress={() => this.openStop(parada)}
        //                     description={parada.endereco}
        //                     image={stopbus_green}
        //                     title={`Parada #${parada.codigo} • ${parada.denominacao} • ${parseInt(parada.dist)}m`}
        //                 />
        //             ))
        //         )
        //     } else {
        //         if (this.props.nextsStops.length === 0) {
        //             alert("Nenhuma parada próxima da sua localização")
        //         } else {
        //             return (
        //                 this.props.nextsStops.map(parada => (
        //                     <Marker
        //                         key={parada.codigo}
        //                         coordinate={{
        //                             latitude: Number(parada.lat),
        //                             longitude: Number(parada.long),
        //                         }}
        //                         onCalloutPress={() => this.openStop(parada)}
        //                         description={parada.endereco}
        //                         image={stopbus_green}
        //                         title={`Parada #${parada.codigo} • ${parada.denominacao} • ${parseInt(parada.dist)}m`}
        //                     />
        //                 ))
        //             )
        //         }
        //     }

        // }

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
                    {this.renderNextsStops()}
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
        placesFound: state.PlaceReducer.placesFoundSearch
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

export default connect(mapStateToProps, { showLoader, changeUserLastLocation, getPlaces })(Map);