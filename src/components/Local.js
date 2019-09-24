import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { getInfoPlace, resetInfoPlace } from '../actions/PlaceActions'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../res/colors';
import MapView, { Marker } from 'react-native-maps'

class Local extends Component {

    componentWillMount() {
        console.log(this.props.place);
        this.props.getInfoPlace(this.props.place.place_id);
    }

    componentWillUnmount() {
        this.props.resetInfoPlace();
    }


    calculateBounds() {

        let coords = []
        if (this.props.infoPlace) {
            coords = [...coords,
            {
                latitude: this.props.infoPlace.geometry.location.lat,
                longitude: this.props.infoPlace.geometry.location.lng,
            }]
        }
        

        if (coords.length > 0 && this.mapRef != undefined) {
            
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

        return (
            <MapView
                
                style={{
                    height: 300,
                    
                }}

                ref={(ref) => { this.mapRef = ref }}>
                {/* {this.renderNextsStops()} */}
                {this.renderMarkerUser()}
                {/* {this.renderPolylines()}
                    {this.renderTrack()} */}
            </MapView>
        )

    }

    renderMarkerUser() {

        let coordinate = {
            latitude: this.props.infoPlace.geometry.location.lat,
            longitude: this.props.infoPlace.geometry.location.lng,
        }

        return (
            <Marker
                key={this.props.place.id}
                coordinate={coordinate}
                description={this.props.keywords}
                // image={pin_user}
                title={this.props.infoPlace.name}

                image={this.props.infoPlace.icon}
                pinColor='blue'
            />
        )

    }

    render() {
        console.log("AAA")
        console.log(this.props.infoPlace)
        if (this.props.infoPlace)
            return (
                <View>
                    {this.renderMap()}
                    {this.calculateBounds()}
                    <View style={{ flex: 1, height: 10, color: 'red' }} />
                    <View style={{ flexDirection: 'row', marginHorizontal: 16, justifyContent: 'space-between' }}>
                        <View style={{ flex: 3 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{this.props.infoPlace.name}</Text>
                            <Text>{this.props.infoPlace.vicinity}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon name="star" size={15} color={colors.color_icon_unselected} />
                                <Text>{this.props.infoPlace.rating}</Text>
                                <Icon name="person" size={15} color={colors.color_icon_unselected} />
                                <Text>{this.props.infoPlace.user_ratings_total}</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center', flex: 1 }}>
                            <TouchableOpacity>
                                <Icon name="phone" size={30} color={colors.colorPrimaryDark} />
                            </TouchableOpacity>
                            <Text>{this.props.infoPlace.formatted_phone_number}</Text>
                        </View>
                    </View>
                </View>
            );
        return (
            <View />
        )
    }
}


mapStateToProps = state => (
    {
        infoPlace: state.PlaceReducer.infoPlace
    }
)

export default connect(mapStateToProps, { getInfoPlace, resetInfoPlace })(Local);