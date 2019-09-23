import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Text, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux'
import TabNavigator from 'react-native-tab-navigator';
import { colors } from '../../res/colors';

import Map from './Map';
import About from './About';

import { changeTab, showLoader } from '../actions/MainActions'

class Main extends Component {

    // render() {
    //     return (
    //         <View style={{ flex: 1, backgroundColor: colors.backgroundColor }}>

    //             <Map/>
    //         </View>
    //     )
    // }

    render() {
        return (

            <View style={{ flex: 1, backgroundColor: colors.backgroundColor }}>



                <TabNavigator style={{ flex: 1, }}
                    tabBarStyle={{ height: 60 }}
                    sceneStyle={{ marginBottom: 10 }}>
                    <TabNavigator.Item
                        selected={this.props.selectedTab === 'home'}
                        title="Mapa"
                        selectedTitleStyle={{ color: colors.primary_color }}
                        renderIcon={() => <Icon name="map" size={30} color={colors.color_icon_unselected} />}
                        renderSelectedIcon={() => <Icon name="map" size={40} color={colors.color_icon_selected} />}
                        onPress={() => this.props.changeTab('home')}>
                        <Map />
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        selected={this.props.selectedTab === 'about'}
                        title="Sobre"
                        selectedTitleStyle={{ color: colors.color_icon_selected }}
                        titleStyle={{ color: colors.color_icon_unselected }}
                        renderIcon={() => <Icon name="notifications" size={30} color={colors.color_icon_unselected} />}
                        renderSelectedIcon={() => <Icon name="notifications" size={40} color={colors.color_icon_selected} />}
                        onPress={() => this.props.changeTab('about')}>
                        <About />
                    </TabNavigator.Item>

                </TabNavigator>

            </View>


        )

    }
}

mapStateToProps = state => (
    {
        selectedTab: state.MainReducer.selectedTab,
    }
)

export default connect(mapStateToProps, { changeTab })(Main);

