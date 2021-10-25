import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import axios from "axios"


export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            listData : [],
            url: "http://127.0.0.1:5000/"
        }
    }
    componentDidMount(){
        this.getPlanets()
    }

    getPlanets(){
        const {url} = this.state;

        axios.get(url)
        .then(response =>{
            return this.setState({
                listData: response.data.data
            })
        })
        .catch(error => {
            Alert.alert(error.message)
        })
    }

    renderItem = ({ item, index}) =>{
        <ListItem 
        key = {index}
        title = { 'Planet:  $(item.name) '}
        subtitle = {'DIstance from earth : $(item.distance_from_earth)'}

        bottomDivider
        chevron
        
        />
    }

    keyExtractor = (item, index) => index.toString();


    render() {
        const { listData } = this.state;
    
        if (listData.length === 0) {
          return (
            <View >
              <Text>Loading...</Text>
            </View>
          );
        }
    
        return (
          <View style={styles.container}>
            <SafeAreaView />
            <View >
              <Text >Planets World</Text>
            </View>
            <View >
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.listData}
                renderItem={this.renderItem}
              />
            </View>
          </View>
        );
      }
}