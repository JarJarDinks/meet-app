import { shallow } from 'enzyme';
import React from 'react';

import Event from '../components/Event/Event.js';
import EventList from '../components/EventList/EventList.js';
import { mockData } from '../mock-data.js';

describe('<EventList /> component', () => {
  test('render correct number of events', () => {
    const EventListWrapper = shallow(<EventList events={mockData} />);
    expect(EventListWrapper.find(Event)).toHaveLength(mockData.length);
  });
  test('Events gets passed from Event to EventList', () => {
    const EventListWrapper = shallow(<EventList events={mockData} />);
    const eventComponent = EventListWrapper.find(Event);
    eventComponent.forEach((eventComponent, index) => {
      expect(eventComponent.props().event).toEqual(mockData[index]);
    });
  });
});
