import { shallow } from 'enzyme';
import React from 'react';

import Event from '../components/Event/Event.js';
import { mockData } from '../mock-data.js';

describe('<Event /> component', () => {
  let EventWrapper;
  const event = mockData[0];

  beforeAll(() => {
    EventWrapper = shallow(<Event event={event} />);
  });

  // test 1: renders the event component
  test('renders the component', () => {
    expect(EventWrapper).toBeDefined();
  });

  // test 2: renders the h2 summary correctly
  test('summary is rendered correctly', () => {
    const summary = EventWrapper.find('h2.summary');
    expect(summary).toHaveLength(1);
    expect(summary.text()).toBe(event.summary);
  });

  // test 3: checks the start time if location is rendered
  test('event start time is rendered correctly', () => {
    const eventStart = EventWrapper.find('p.event-start');
    expect(eventStart).toHaveLength(1);
    expect(eventStart.text()).toBe(new Date(event.start.dateTime).toString());
  });

  // test 4: checks the location is rednered correctly
  test('event location is rendered correctly', () => {
    const eventLocation = EventWrapper.find('p.event-location');
    expect(eventLocation).toHaveLength(1);
    expect(eventLocation.text()).toBe(`@${event.summary} | ${event.location}`);
  });

  //! this fails
  // Test 5: checks the button is collapsed by default
  test('renders collapsed by default', () => {
    expect(EventWrapper.exists('div.details')).toBe(false);
  });

  // test 7: renders collapsed view
  test('the collapsed view is rendered correctly', () => {
    expect(EventWrapper.find('h3.about')).toHaveLength(0);
    expect(EventWrapper.find('a.link')).toHaveLength(0);
    expect(EventWrapper.find('p.description')).toHaveLength(0);
  });

  // test 8: user can view event details when clicking button
  test('user can expand an event when clicking show details button', () => {
    const detailsButton = EventWrapper.find('button.details-btn');
    expect(detailsButton.text()).toBe('show details');
    detailsButton.simulate('click');
    EventWrapper.update();
    expect(EventWrapper.exists('div.details')).toBe(true);
  });

  // test 9: renders expanded view
  test('event details is expanded and rendered correctly', () => {
    expect(EventWrapper.find('h3.about')).toHaveLength(1);
    expect(EventWrapper.find('a.link')).toHaveLength(1);
    expect(EventWrapper.find('p.description')).toHaveLength(1);
  });

  // test 10: user can not view event details when clicking button
  test('user can collapse an event when clicking hide details button', () => {
    const detailsButton = EventWrapper.find('button.details-btn');
    expect(detailsButton.text()).toBe('hide details');
    detailsButton.simulate('click');
    EventWrapper.update();
    expect(EventWrapper.exists('div.details')).toBe(false);
  });

  // Test 12: checks the behavior when the component is re-rendered with different props
  test('correctly updates when the event prop changes', () => {
    const newEvent = mockData[1];
    EventWrapper.setProps({ event: newEvent });

    // Assert that the component renders the updated information
    expect(EventWrapper.find('h2.summary').text()).toBe(newEvent.summary);
  });

  // Test 13: checks if the button text changes correctly after a click event
  test('button initially shows "show details"', () => {
    const button = EventWrapper.find('button.details-btn');
    expect(button.text()).toBe('show details');
  });
});
