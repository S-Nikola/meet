import React from 'react';
import App from '../App';
import { mockData } from '../mock-data';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount, shallow } from 'enzyme';
import CitySearch from '../CitySearch';
import { extractLocations } from '../api';

const feature = loadFeature('./src/features/filterEventsByCity.feature');

defineFeature(feature, test => {
  //Feature 1: Scenario 1
  test('When user hasn’t searched for a city, show upcoming events from all cities.', ({ given, when, then }) => {
    given('user hasn’t searched for any city', () => {

    });
    let AppWrapper;
    when('the user opens the app', () => {
      AppWrapper = mount(<App />);
    });

    then('the user should see the list of upcoming events.', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.Event')).toHaveLength(mockData.length);
     });
  });
   //Feature 1: Scenario 2
  test('User should see a list of suggestions when they search for a city', ({ given, when, then }) => {
    let CitySearchWrapper;
    let locations = extractLocations(mockData);
    given('the main page is open', () => {
      CitySearchWrapper = shallow(<CitySearch updateEvents={() => {}} locations={locations} />);
    });

    when('the user starts typing in the city textbox', () => {
      CitySearchWrapper.find('.city').simulate('change', { target: { value: 'Berlin' } });
    });

    then('the user should receive a list of cities (suggestions) that match what they’ve typed', () => {
      expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(2);
    });
  });
 //Feature 1: Scenario 3
  test('User can select a city from the suggested list', ({ given, and, when, then }) => {
    let AppWrapper;
    given('user was typing “Berlin” in the city textbox', async () => {
      AppWrapper = await mount(<App />);
      AppWrapper.find('.city').simulate('change', { target: { value: 'Berlin' } });
    });

    and('the list of suggested cities is showing', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.suggestions li')).toHaveLength(2);
    });

    when('the user selects a city (e.g., “Berlin, Germany”) from the list', () => {
      AppWrapper.find('.suggestions li').at(0).simulate('click');
    });

    then('their city should be changed to that city (i.e., “Berlin, Germany”)', () => {
      const CitySearchWrapper = AppWrapper.find(CitySearch);
      expect(CitySearchWrapper.state('query')).toBe('Berlin, Germany');
    });

    and('the user should receive a list of upcoming events in that city', () => {
      expect(AppWrapper.find('.Event')).toHaveLength(mockData.length);
    });
  });

});