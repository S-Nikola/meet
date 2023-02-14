import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';
import { mockData } from '../mock-data';
import { extractLocations, getEvents } from '../api';

describe('<App /> component', () => {
  let AppWrapper;
    beforeAll(() => {
      AppWrapper = shallow(<App />);
    });

  test('render list of events', () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test('render CitySearch', () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

  test('render NumberOfEvents', () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });
  
});

describe('<App /> integration', () => {

  test('App passes "events" state as a prop to EventList', () => {
    const AppWrapper = mount(<App />);
    const AppEvensState = AppWrapper.state('events');
    expect(AppEvensState).not.toEqual(undefined);
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEvensState);
    AppWrapper.unmount();
  });

  test('App passes "locations" state as a prop to CitySearch', () => {
    const AppWrapper = mount(<App />);
    const AppLocationsState = AppWrapper.state('locations');
    expect(AppLocationsState).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
    AppWrapper.unmount();
  });

  test('get list of events matching the city selected by the user', async () => {
    const AppWrapper = mount(<App />);
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    const locations = extractLocations(mockData);
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state('suggestions');
    const selectedIndex = Math.floor(Math.random() * (suggestions.length));
    const selectedCity = suggestions[selectedIndex];
    await CitySearchWrapper.instance().handleItemClicked(selectedCity);
    const allEvents = await getEvents();
    const eventsToShow = allEvents.filter(event => event.location === selectedCity);
    expect(AppWrapper.state('events')).toEqual(eventsToShow);
    AppWrapper.unmount();
  });

  test('get list of all events when user selects "See all cities"', async () => {
    const AppWrapper = mount(<App />);
    const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
    await suggestionItems.at(suggestionItems.length - 1).simulate('click');
    const allEvents = await getEvents();
    expect(AppWrapper.state('events')).toEqual(allEvents);
    AppWrapper.unmount();
  });

  test('App passes "eventCount" state as a prop to NumberOfEvents', () => {
    const AppWrapper = mount(<App />);
    const AppEventCountState = AppWrapper.state('numberOfEvents');
    expect(AppEventCountState).not.toEqual(undefined);
    expect(AppWrapper.find(NumberOfEvents).props().numberOfEvents).toEqual(AppEventCountState);
    AppWrapper.unmount();
  });

  test("check if number of events is properly passed on as a prop to NumberOfEvents", () => {
    const AppWrapper = mount(<App />);
    const AppEventCountState = AppWrapper.state('numberOfEvents');
    expect(AppEventCountState).not.toEqual(undefined);
    AppWrapper.setState({ numberOfEvents: 20 });
    expect(AppWrapper.find(NumberOfEvents).props().numberOfEvents).toBe(AppWrapper.state('numberOfEvents'));
    AppWrapper.unmount();
  });

  test('Change the "numberOfEvents" state when the option is changed', async ()=>{
    const AppWrapper = mount(<App />);
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    const changedNumber = NumberOfEventsWrapper.find('.option-64').prop('value');
    expect(changedNumber).toBe(changedNumber);
    // const optionSelector = AppWrapper.find(NumberOfEvents).find('.select-number');
    await NumberOfEventsWrapper.instance().changeNumber(changedNumber);
    //  expect(AppWrapper.find(NumberOfEvents).props().numberOfEvents).toBe(NumberOfEventsWrapper.state('numberOfEvents'));
    expect(AppWrapper.state('numberOfEvents')).toBe(NumberOfEventsWrapper.state('numberOfEvents'));
    AppWrapper.unmount();
  });

  // test("check if state in the app changes on input change in NumberOfEvents", () => {
  //   const AppWrapper = mount(<App />);
  //   const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
  //   const changedNumber = NumberOfEventsWrapper.find('.option-64').prop('value');
  //   NumberOfEventsWrapper.find(".select-number").simulate("change", changedNumber);
  //   expect(NumberOfEventsWrapper.state("numberOfEvents")).toBe(64);
  //   expect(AppWrapper.state("numberOfEvents")).toBe(64);
  //   AppWrapper.unmount();
  // });

  // test('Change the "numberOfEvents" state when the option is changed', async ()=>{
  //   const AppWrapper = mount(<App />);
  //   const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
  //   // expect(AppWrapper.state('numberOfEvents')).toBe(AppWrapper.state('eventCount'));
  //   const changedNumber = NumberOfEventsWrapper.find('.option-64').prop('value');
  //   NumberOfEventsWrapper.find('.select-number').simulate('change', {target: {value: changedNumber}});
  //   await getEvents();
  //   expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(changedNumber);
  //   expect(AppWrapper.state('numberOfEvents')).toBe(NumberOfEventsWrapper.state('numberOfEvents'));
  //   AppWrapper.unmount();
  // });

});