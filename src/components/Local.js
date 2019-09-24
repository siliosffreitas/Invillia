import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { getInfoPlace, resetInfoPlace } from '../actions/PlaceActions'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../res/colors';

class Local extends Component {

    componentWillMount() {
        console.log(this.props.place);
        this.props.getInfoPlace(this.props.place.place_id);
    }

    componentWillUnmount() {
        this.props.resetInfoPlace();
    }

    render() {
        console.log("AAA")
        console.log(this.props.infoPlace)
        if (this.props.infoPlace)
            return (
                <View>
                    <Image height={300} />
                    <View style={{ flex:1, height: 10, color: 'red' }} />
                    <View style={{ flexDirection: 'row', marginHorizontal: 16, justifyContent: 'space-between' }}>
                        <View style={{flex:3}}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{this.props.infoPlace.name}</Text>
                            <Text>{this.props.infoPlace.vicinity}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon name="star" size={15} color={colors.color_icon_unselected} />
                                <Text>{this.props.infoPlace.rating}</Text>
                                <Icon name="person" size={15} color={colors.color_icon_unselected} />
                                <Text>{this.props.infoPlace.user_ratings_total}</Text>
                            </View>
                        </View>
                        <View style={{alignItems: 'center', flex:1}}>
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