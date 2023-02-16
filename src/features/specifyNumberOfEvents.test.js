import React from 'react';
import App from '../App';
import { mockData } from '../mock-data';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount, shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';
import { extractLocations, getEvents } from '../api';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  test('When user hasn’t specified a number, 20 is the default number', ({ given, and, when, then }) => {
    let AppWrapper;
    given('app is loaded', () => {
      AppWrapper = mount(<App />);
    });

    and('the user has received a list of upcoming events in specified city (all cities)', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.Event')).toHaveLength(mockData.length);
    });

    when('the user hasn’t specified a number of events to be shown', () => {

    });

    then('the user receives first 20 upcoming events on the screen', (arg0) => {
      AppWrapper.update();
      expect(AppWrapper.state('numberOfEvents')).toEqual(20);
    });
  });

  test('User can change the number of events they want to see', ({ given, when, then }) => {
    let AppWrapper;
    given('the app is loaded, user has received a list of upcoming events in specified city (all cities)', async () => {
      AppWrapper = await mount(<App />);
    });

    when('the user hasn’t specified a number of events to be shown by choosing the number in input (20 or 30 or 40)', (arg0, arg1, arg2) => {

    });

    then('the user receives first 20 or 30 or 40 upcoming events on the screen – according to the chosen number', (arg0, arg1, arg2) => {
      AppWrapper.update();
      let NumberOfEventsWrapper = AppWrapper.find('NumberOfEvents');
      const defaultNumber = NumberOfEventsWrapper.state('numberOfEvents');
      expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(defaultNumber);
      const changedNumber = NumberOfEventsWrapper.find('.option-30').prop('value');
      NumberOfEventsWrapper.find('.select-number').simulate('change', { target: { value: changedNumber }});
      expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(changedNumber);
    });
  });
});