import React from 'react'
import { View, Text, Image, ScrollView } from 'react-native'





const About = (props) => (
    <ScrollView>
        <View
            style={{ flex: 1, alignItems: 'center', padding: 16 }} >
            
            <Text style={{ paddingTop: 32, fontSize: 18 }}>Invillia</Text>
            <Text style={{ fontSize: 14 }}>Silio Silvestre</Text>

            <Text style={{ textAlign: 'center', paddingVertical: 10 }}>Projeto de desafio, criado com React-Native utilizando Redux.</Text>



            <Text >© 2016~2018</Text>
        </View>
    </ScrollView>
)
export default About;