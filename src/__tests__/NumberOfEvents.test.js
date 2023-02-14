import React, { Component } from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';
import { mockData } from '../mock-data';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper, numberOfEvents;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents updateEvents={() => {}} />);
  });

  test('render number of events selection', () => {
    expect(NumberOfEventsWrapper.find('.select-number')).toHaveLength(1);
  });

  test('render number of events options', () => {
    expect(NumberOfEventsWrapper.find('.option-32')).toHaveLength(1);
    expect(NumberOfEventsWrapper.find('.option-64')).toHaveLength(1);
    expect(NumberOfEventsWrapper.find('.option-96')).toHaveLength(1);
  });

  test('render default number correctly', () => {
    const defaultNumber = NumberOfEventsWrapper.state('numberOfEvents');
    expect(NumberOfEventsWrapper.find('.option-32').prop('value')).toBe(defaultNumber);
  });

  test('render number of events according to chosen option', () => {
    const defaultNumber = NumberOfEventsWrapper.state('numberOfEvents');
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(defaultNumber);
    const changedNumber = NumberOfEventsWrapper.find('.option-64').prop('value');
    NumberOfEventsWrapper.find('.select-number').simulate('change', changedNumber);
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(changedNumber);
  });
  
});