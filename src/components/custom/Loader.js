import React , { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

class Loader extends Component {
    render(){
        if(this.props.showLoader) {
            return (
                <View 
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        justifyContent: 'center', alignItems: 'center',
                        bottom: 0,
                        left: 0,
                        backgroundColor: 'black',
                        opacity: 0.3,
                        elevation: 5
                    }}>
                    <ActivityIndicator size="large" color='white'/>
                </View>
            )
        } else {
            return null;
        }

    }
}

const mapsStateToProps = state => (
    {
        showLoader : state.MainReducer.showLoader,
    }
);

export default connect( mapsStateToProps, null ) ( Loader );