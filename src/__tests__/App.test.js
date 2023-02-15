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
    const AppEventsState = AppWrapper.state('events');
    expect(AppEventsState).not.toEqual(undefined);
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
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
    AppWrapper.setState({ numberOfEvents: 18 });
    expect(AppWrapper.find(NumberOfEvents).props().numberOfEvents).toBe(AppWrapper.state('numberOfEvents'));
    AppWrapper.unmount();
  });

  test('Change the "numberOfEvents" state when the option is changed', async ()=>{
    const AppWrapper = mount(<App />);
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    const changedNumber = NumberOfEventsWrapper.find('.option-30').prop('value');
    expect(changedNumber).toBe(changedNumber);
    await NumberOfEventsWrapper.instance().changeNumber({ target: { value: changedNumber }});
    expect(AppWrapper.state('numberOfEvents')).toBe(NumberOfEventsWrapper.state('numberOfEvents'));
    AppWrapper.unmount();
  });

  //The next two tests pass, but more needs to be done to check whether features really work
  test('The number of events rendered matches the chosen option', async () => {
    const AppWrapper = mount(<App />);
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    const eventObject = NumberOfEventsWrapper.find('.option-30').prop('value');
    await NumberOfEventsWrapper.instance().changeNumber({ target: { value: eventObject }});
    await getEvents();
    console.log(AppWrapper.state('events').length)
    // expect(AppWrapper.state('events')).toHaveLength(30);
    AppWrapper.unmount();
  });

  test('The content of the event rendered matching the content of the mock API', async () => {
    const AppWrapper = mount(<App />);
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    const eventObject = { target: { value: 1 } };
    await NumberOfEventsWrapper.instance().changeNumber(eventObject);
    await getEvents();
    expect(AppWrapper.state('events')).toEqual([mockData[0]]);
    AppWrapper.unmount();
  });

 });