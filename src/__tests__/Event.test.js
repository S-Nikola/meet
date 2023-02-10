import React, { Component } from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {
    let EventWrapper, event;
    beforeAll(() => {
      event = mockData[0];
      EventWrapper = shallow(<Event event={event}/>);
    });

    test('render event with basic info', () => {
      const summary = EventWrapper.find('h2.summary');
      const summaryString = event.summary;

      const location = EventWrapper.find('p.location');
      const locationString = event.location;

      expect(EventWrapper.find('.Event')).toHaveLength(1);

      expect(EventWrapper.find('.summary')).toHaveLength(1);
      expect(summary.text()).toBe(summaryString);
      
      expect(EventWrapper.find('.location')).toHaveLength(1);
      expect(location.text()).toBe(`Location: ${locationString}`);
    });

    test('render collapse button', () => {
      const detailsButton = EventWrapper.find('.details-button')
      expect(detailsButton).toHaveLength(1);
    });

    test('initially, details are collapsed', () => {
      expect(EventWrapper.state('collapsed')).toBe(true);
      expect(EventWrapper.find('.details')).toHaveLength(0);
      expect(EventWrapper.find('.description')).toHaveLength(0);
    });

    test('on clickicng Show Details, details are expanded', () => {
      const detailsButton = EventWrapper.find('.details-button');
      detailsButton.simulate('click');
      expect(EventWrapper.state('collapsed')).toBe(false);
      expect(EventWrapper.find('.details')).toHaveLength(1);
      expect(EventWrapper.find('.description')).toHaveLength(1);

      const description = EventWrapper.find('p.description');
      const descriptionString = event.description;
      expect(description.text()).toBe(`Description: ${descriptionString}`);
    });

    test('on clicking Hide Details, details are collapsed', () => {
      const detailsButton = EventWrapper.find('.details-button');
      detailsButton.simulate('click');
      expect(EventWrapper.state('collapsed')).toBe(true);
      expect(EventWrapper.find('.details')).toHaveLength(0);
      expect(EventWrapper.find('.description')).toHaveLength(0);
    });

});