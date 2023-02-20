import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';
import { extractLocations, getEvents, checkToken, getAccessToken } from './api';
import { mockData } from './mock-data';



class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      events: [],
      locations:[],
      selectedLocation: 'all',
      numberOfEvents: 5,
      showWelcomeScreen: undefined
    }
    // this.updateNumberOfEvents=this.updateNumberOfEvents.bind(this);
    this.updateEvents=this.updateEvents.bind(this);
  }


  /*Function that updates the state: numberOfEvents*/
  // updateNumberOfEvents(option) {
  //   this.setState({
  //     numberOfEvents: option,
  //   });
  // }

/*Function that updates the state: events*/
  updateEvents = (location, optionNumber) => {
    const {numberOfEvents, selectedLocation} = this.state;
    if (location) {
      getEvents().then((events) => {
        const locationEvents = (location === 'all') ?
        events :
        events.filter((event) => event.location === location);
        const eventsToShow=locationEvents.slice(0, numberOfEvents);
        this.setState({
        events: eventsToShow,
        selectedLocation: location,
        numberOfEvents: this.state.numberOfEvents
        });
      });  
    } else {
      getEvents().then((events) => {
        const locationEvents = (selectedLocation === 'all') ?
        events :
        events.filter((event) => event.location === selectedLocation);
        const eventsToShow=locationEvents.slice(0, optionNumber);
        this.setState({
          events: eventsToShow,
          numberOfEvents: optionNumber
        });
      })
    }
  }

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ 
            events, 
            locations: extractLocations(events) 
          });
        }
      });
    }
  }


  componentWillUnmount(){
    this.mounted = false;
  }

  render() {
    if (this.state.showWelcomeScreen === undefined) return <div className="App" />
    return (
      <div className="App">
        <h1 className='text-6xl font-extrabold m-4'>Meet App</h1>
        <div className='search-events'>
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents}/>
        <NumberOfEvents numberOfEvents={this.state.numberOfEvents} /*updateNumberOfEvents={this.updateNumberOfEvents}*/ updateEvents={this.updateEvents}/>
        </div>
        <EventList events={this.state.events}/>
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
      </div>
    );
  }
}

export default App;