import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import './nprogress.css';

class App extends Component {
  state = {
    events: [],
    locations: [],
  };

  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents =
        location === 'all'
          ? events
          : events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents,
      });
    });
  };

  componentDidMount() {
    this.mounted = true;
    if (window.location.href.startsWith('http://localhost')) {
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }

  getEvents().then((events) => {
    if (this.mounted) {
      this.setState({ events, locaions: extractLocations(events) })
    }
  });

  const accessToken = localStorage.getItem('access_token');
  const isTokenValid = ( await checkToken(accessToken)).error ? false : true;
  const searchParams = new URLSearchParams(window.location.search);

  const code = searchParams.get('code');
  this.setState( !(code) || isTokenValid )
  if ((code || isTokenValid) && this.mounted) {
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events: events.slice(0, this.state.NumberOfEvents),
           locations: extractLocations(events) });
      }
    });
  }
}


  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return (
      <div className="App">
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <EventList events={this.state.events} />
        <NumberOfEvents />
      </div>
    );
  }
}

export default App;
