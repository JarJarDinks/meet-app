import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import './nprogress.css';
import { InfoAlert } from './components/Alert';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      locations: [],
      numberOfEvents: 32,
      selectedLocation: 'all',
      showWelcomeScreen: undefined,
      infoAlert: '',
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
    return (
      <div className='App'>
        {/* <div className='alerts-container'>
          {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
        </div> */}
        <h1>Developer Meet Ups</h1>
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <NumberOfEvents
          numberOfEvents={this.state.numberOfEvents}
          updateEvents={this.updateEvents}
        />

        <h4>Events in each city</h4>

        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
