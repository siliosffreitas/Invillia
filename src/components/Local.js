import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { getInfoPlace } from '../actions/PlaceActions'

class Local extends Component {

    componentDidMount() {
        console.log(this.props.place);
        this.props.getInfoPlace(this.props.place.place_id);
    }

    render() {
        // console.log(this.props.local);
        return (
            <View>
                <Text>
                    Local
                </Text>
            </View>
        );
    }
}


mapStateToProps = state => (
    {
        infoPlace: state.PlaceReducer.infoPlace
    }
)

export default connect(mapStateToProps, { getInfoPlace })(Local);