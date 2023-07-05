import React, { Component } from 'react';
import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import './App.css';
import CitySearch from './CitySearch';
import EventGenre from './EventGenre';
import EventList from './EventList';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';
import { checkToken, extractLocations, getAccessToken, getEvents } from './api';
import { WarningAlert } from './components/Alert';
import './nprogress.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      locations: [],
      numberOfEvents: 32,
      selectedLocation: 'all',
      showWelcomeScreen: undefined,
    };
  }

  async componentDidMount() {
    this.mounted = true;
    if (window.location.href.startsWith('http://localhost')) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({
            events,
            locations: extractLocations(events),
          });
        }
      });
    }

    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events,
          locations: extractLocations(events),
        });
      }
    });

    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);

    const code = searchParams.get('code');
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({
            events: events.slice(0, this.state.numberOfEvents),
            locations: extractLocations(events),
          });
        }
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter(
        (event) => event.location === location
      ).length;
      const city = location.split(', ').shift();
      return { city, number };
    });
    return data;
  };

  updateNumberOfEvents(number) {
    this.setState({
      numberOfEvents: number,
    });
    this.updateEvents(this.state.selectedLocation);
  }

  updateEvents = (location, inputNumber) => {
    const { eventCount, selectedLocation } = this.state;

    if (location) {
      getEvents().then((events) => {
        const locationEvents =
          location === 'all'
            ? events
            : events.filter((event) => event.location === location);
        const shownEvents = locationEvents.slice(0, eventCount);
        this.setState({
          events: shownEvents,
          selectedLocation: location,
        });
      });
    } else {
      getEvents().then((events) => {
        const locationEvents =
          selectedLocation === 'all'
            ? events
            : events.filter((event) => event.location === selectedLocation);
        const shownEvents = locationEvents.slice(0, inputNumber);
        this.setState({
          events: shownEvents,
          eventCount: inputNumber,
        });
      });
    }
  };

  render() {
    const { locations, numberOfEvents, events } = this.state;
    if (this.state.showWelcomeScreen === undefined) {
      return <div className='App' />;
    }
    return (
      <div className='App'>
        <div>
          <h1>Developer Meet Ups</h1>
          <CitySearch locations={locations} updateEvents={this.updateEvents} />
          <NumberOfEvents
            numberOfEvents={numberOfEvents}
            updateEvents={this.updateEvents}
          />
        </div>
        <h4>Events in each city</h4>
        <div className='data-vis-wrapper'>
          <EventGenre events={events} />
          <ResponsiveContainer height={400}>
            <ScatterChart
              margin={{
                top: 20,
                right: 20,
                left: 20,
                bottom: 20,
              }}>
              <CartesianGrid />
              <XAxis type='category' dataKey='city' name='city' />
              <YAxis
                type='number'
                dataKey='number'
                name='number of events'
                allowDecimals={false}
              />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={this.getData()} fill='#8884d8' />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <EventList events={events} />
        {!navigator.onLine ? (
          <WarningAlert text='The app has no connection to the internet. The information displayed may not be up-to-date.' />
        ) : null}

        <WelcomeScreen
          showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => {
            getAccessToken();
          }}
        />
      </div>
    );
  }
}

export default App;
