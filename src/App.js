import React, { Component } from 'react';

import {
  checkToken,
  extractLocations,
  getAccessToken,
  getEvents,
} from './api.js';
import { WarningAlert } from './components/Alert/Alert.js';
import CitySearch from './components/CitySearch/CitySearch.js';
import EventGenre from './components/EventGenre/EventGenre.js';
import EventList from './components/EventList/EventList.js';
import NumberOfEvents from './components/NumberOfEvents/NumberOfEvents.js';
import ScatterPlot from './components/ScatterPlot/ScatterPlot.js';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen.js';
import './styles/App.css';
import './styles/nprogress.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      locations: [],
      numberOfEvents: 32,
      selectedLocation: 'all',
      showWelcomeScreen: undefined,
      warningText: '',
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
        <h1 className='name'>Developer Meet Ups</h1>

        <WarningAlert text={this.state.warningText} />
        <CitySearch locations={locations} updateEvents={this.updateEvents} />
        <NumberOfEvents
          numberOfEvents={numberOfEvents}
          updateEvents={this.updateEvents}
        />
        <div className='graph-charts'>
          <EventGenre className='piechart' events={events} />
          <ScatterPlot
            className='scatterplot'
            events={events}
            locations={locations}
          />
        </div>

        <EventList events={events} />
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
