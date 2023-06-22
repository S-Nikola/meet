import React from 'react';
import App from '../App';
import { mockData } from '../mock-data';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount } from 'enzyme';
import Event from '../Event';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature')

defineFeature(feature, test => {
  test('An event element is collapsed by default', ({ given, when, then }) => {
    let AppWrapper;
    given('app is loaded', () => {
      AppWrapper = mount(<App />);
    });

    when('user has received a list of upcoming events in specified city (all cities)', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.Event')).toHaveLength(mockData.length);
    });

    then('the event details are not visible for user', () => {
      const EventWrapper = AppWrapper.find(Event);
      expect(EventWrapper.find('.details')).toHaveLength(0);
    });
});

test('User can expand an event to see its details', ({ given, when, then }) => {
  let AppWrapper;
  given('user received general information about upcoming events', () => {
      AppWrapper = mount(<App />);
  });

  when('user pushes the button “Details” for a specific event', () => {
    AppWrapper.update();
    AppWrapper.find('.Event .details-button').at(0).simulate('click');
  });

  then('the specific event is expanded with the details', () => {
    expect(AppWrapper.find('.Event .details')).toHaveLength(1);
  });
});

test('User can collapse an event to hide its details', ({ given, when, then }) => {
  let AppWrapper;
  given('the specific event is expanded with the details', async () => {
    AppWrapper = await mount(<App />);
    AppWrapper.update();
    AppWrapper.find('.Event .details-button').at(0).simulate('click');
    expect(AppWrapper.find('.Event .details')).toHaveLength(1);
  });

  when('the user pushes the button “Back” for the specific event', () => {
    AppWrapper.update();
    AppWrapper.find('.Event .details-button').at(0).simulate('click');
  });

  then('the specific event is collapsed, details are hidden, user receives full list of upcoming events with general information only', () => {
    expect(AppWrapper.find('.Event .event-details')).toHaveLength(0);
  });
});
});