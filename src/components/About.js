import React from 'react'
import { View, Text, Image, ScrollView } from 'react-native'





const About = (props) => (
    <ScrollView>
        <View
            style={{ flex: 1, alignItems: 'center', padding: 16 }} >
            
            <Text style={{ paddingTop: 32, fontSize: 18 }}>StarBus</Text>
            <Text style={{ fontSize: 14 }}>Versão 2.0.0</Text>

            <Text style={{ textAlign: 'center', paddingVertical: 10 }}>Tenha a mão as informações do transporte público de Teresina.
        StarBus permite que usuários possam ver paradas próximas, buscar por uma linha,
        saber como chegar a um local, ver onde está seu ônibus, compartilhar sua visão do meio que interagem diariamente e etc.
        Os dados de ônibus, paradas, linhas e rastreamento mostrados no aplicativo são disponibilizados, mantidos e atualizados
        pela STRANS-PI. O StarBus é teresinense, assim como você e desejamos que você tenha a melhor experiência. Bem-vindo a bordo.</Text>



            <Text >© 2016~2018  StarBus Inc</Text>
        </View>
    </ScrollView>
)
export default About;