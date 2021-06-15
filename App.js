import React from 'react';
import Loading from './Loading';
import { Alert } from 'react-native';
import * as Location from "expo-location";
import axios from 'axios';
import Weather from './Weather';

const API_KEY = "e5bc57258c33054e315142a70f277688";
export default class App extends React.Component {
  state = {
    isLoading: true
  };
  getWeather = async (latitude,longitude) => {
    const { 
      data: {
        main: { temp },
        weather
      } 
    } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    this.setState({ 
      isLoading: false,
      condition: weather[0].main, 
      temp
    });
  }

  getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const { 
        coords: { latitude,longitude }
      } = await Location.getCurrentPositionAsync();
      // console.log(coords);
      this.getWeather(latitude,longitude);
    } catch (error) {
      Alert.alert("Can find you.","So sad");
    }
    
  }

  componentDidMount(){
    this.getLocation();
  }

  render(){
    const { isLoading, temp, condition } = this.state;
    return isLoading ? <Loading /> : <Weather temp={Math.round(temp)} condition={condition} />;
  }
}

