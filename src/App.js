import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';
import { mockData } from './mock-data';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      events: [],
      locations:[],
      selectedLocation: 'all',
      numberOfEvents: 20
    }
    this.updateNumberOfEvents=this.updateNumberOfEvents.bind(this);
    this.updateEvents=this.updateEvents.bind(this);
  }

  //--------------OLD functions
  // updateEvents = (location) => {
  //   getEvents().then((events) => {
  //     const locationEvents = (location === 'all') ?
  //     events :
  //     events.filter((event) => event.location === location);
  //     this.setState({
  //       events: locationEvents
  //     });
  //   });
  // }

  // updateEvents = (location, eventCount) => {
  //   getEvents().then((events) => {
  //     const locationEvents = (location === 'all') ?
  //     events :
  //     events.filter((event) => event.location === location);
  //     this.setState({
  //       events: locationEvents.slice(0, this.state.numberOfEvents)
  //     });
  //   });
  // }


  /*Function that updates the state: numberOfEvents*/
  updateNumberOfEvents(option) {
    this.setState({
      numberOfEvents: option,
    });
  }

/*Function that updates the state: events (needs to be reworked)*/
  updateEvents = (location, optionNumber) => {
    const {numberOfEvents, eventCount, selectedLocation} = this.state;
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

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ 
          events: events.slice(0, this.state.numberOfEvents),
          locations: extractLocations(events)
        });
      }
    });
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  render() {
    return (
      <div className="App">
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents}/>
        <NumberOfEvents numberOfEvents={this.state.numberOfEvents} updateNumberOfEvents={this.updateNumberOfEvents} updateEvents={this.updateEvents}/>
        <EventList events={this.state.events}/>
        
      </div>
    );
  }
}

export default App;