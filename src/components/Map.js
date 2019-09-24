import React, { Component } from 'react'
import { View, Text, Image, ScrollView } from 'react-native'
import { showLoader } from '../actions/MainActions'
import { connect } from 'react-redux'
import Geolocation from '@react-native-community/geolocation';
import { changeUserLastLocation } from '../actions/MainActions'

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
            <ScrollView>
                <View
                    style={{ flex: 1, alignItems: 'center', padding: 16 }} >
                    <Text style={{ paddingTop: 32, fontSize: 18 }}>StarBus</Text>
                    <Text style={{ fontSize: 14 }}>Versão 2.0.0</Text>

                    <Text style={{ textAlign: 'center', paddingVertical: 10 }}>MAPA</Text>

                    <Text >© 2016~2018  StarBus Inc</Text>
                </View>
            </ScrollView>
        );
    }
}

mapStateToProps = state => (
    {
        // userLastLocation: state.UserReducer.userLastLocation,
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

export default connect(mapStateToProps, {  showLoader , changeUserLastLocation })(Map);