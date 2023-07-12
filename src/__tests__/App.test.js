import { render, screen } from '@testing-library/react';
import { mount } from 'enzyme';
import React from 'react';

import App from '../App.js';
import { extractLocations, getEvents } from '../api.js';
import CitySearch from '../components/CitySearch/CitySearch.js';
import EventList from '../components/EventList/EventList.js';
import NumberOfEvents from '../components/NumberOfEvents/NumberOfEvents.js';
import { mockData } from '../mock-data.js';

// unit tests
describe('<App /> component', () => {
  test('render EventList', () => {
    render(<App />);
    const EventListElement = screen.getByTestId('event-list');
    expect(EventListElement).toBeInTheDocument();
    console.log('EventListElement', EventListElement);
    console.log(App);
  });

  test('render CitySearch', () => {
    render(<App />);
    const CitySearchElement = screen.getByTestId('city-search');
    expect(CitySearchElement).toBeInTheDocument();
  });

  test('render NumberOfEvents', () => {
    render(<App />);
    const NumberOfEventsElement = screen.getByTestId('number-of-events');
    expect(NumberOfEventsElement).toBeInTheDocument();
  });
});

// integration tests
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
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(
      AppLocationsState
    );
    AppWrapper.unmount();
  });

  test('get list of events matching the city selected by the user', async () => {
    const AppWrapper = mount(<App />);
    console.log(AppWrapper);
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    const locations = extractLocations(mockData);
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state('suggestions');
    const selectedIndex = Math.floor(Math.random() * suggestions.length);
    const selectedCity = suggestions[selectedIndex];
    await CitySearchWrapper.instance().handleItemClicked(selectedCity);
    const allEvents = await getEvents();
    const eventsToShow = allEvents.filter(
      (event) => event.location === selectedCity
    );
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

  test('App passes "numberOfEvents" state as a prop to NumberOfEvents', () => {
    const AppWrapper = mount(<App />);
    const AppEventCountState = AppWrapper.state('numberOfEvents');
    expect(AppEventCountState).not.toEqual(undefined);
    AppWrapper.setState({ numberOfEvents: 10 });
    expect(AppWrapper.find(NumberOfEvents).props().numberOfEvents).toBe(
      AppWrapper.state('numberOfEvents')
    );
    AppWrapper.unmount();
  });

  test('Filtered list of events matches mock data', async () => {
    const AppWrapper = mount(<App />);
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    NumberOfEventsWrapper.find('.number').simulate('change', {
      target: { value: 20 },
    });
    await getEvents();
    expect(AppWrapper.state('events')).toEqual(mockData.slice(0, 20));
    AppWrapper.unmount();
  });
});
