import React, { Component } from 'react';
import { Platform, TouchableHighlight, View } from 'react-native';
import { Router, Scene, Stack, Actions } from 'react-native-router-flux'
import { connect } from 'react-redux';
// import Icon from 'react-native-vector-icons/MaterialIcons';

import Main from "./Main"

import { colors } from '../../res/colors';

class Routes extends Component {


    render() {
        return (
            <Router titleStyle={{ color: colors.titleColor }} nav tintColor={colors.titleColor}>
                <Stack navigationBarStyle={{ backgroundColor: colors.primary_color }}>
                    <Scene key='main' component={Main} title={this.props.titleSelectedTab} type="reset"
                        initial
                    />
                </Stack>
            </Router>
        )
    }

}
mapStateToProps = state => (
    {
        titleSelectedTab: state.MainReducer.titleSelectedTab,
        // selectedTab: state.MainReducer.selectedTab,
    }
)

export default connect(mapStateToProps, {})(Routes);