import React, { Component } from 'react';

import { InfoAlert } from '../Alert/Alert.js';

class CitySearch extends Component {
  state = {
    query: '',
    suggestions: [],
    showSuggestions: undefined,
    infoText: '',
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({ showSuggestions: true });
    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });
    if (suggestions.length === 0) {
      this.setState({
        query: value,
        infoText:
          'We can not find the city you are looking for. Please try another city!',
      });
    } else {
      return this.setState({
        query: value,
        suggestions,
        infoText: '',
      });
    }
  };

  handleItemClicked(suggestion) {
    this.setState({
      query: suggestion,
      suggestions: [],
      showSuggestions: true,
      infoText: '',
    });
    this.props.updateEvents(suggestion, this.props.numnberOfEvents);
  }

  handleBlur = () => {
    this.setState({ showSuggestions: false });
  };

  render() {
    return (
      <div className='CitySearch' id='city-search'>
        <div>
          <input
            placeholder='Location'
            id='city-search-input'
            type='text'
            className='city'
            value={this.state.query}
            onChange={this.handleInputChanged}
            onFocus={() => {
              this.setState({ showSuggestions: true });
            }}
            onBlur={this.handleBlur}
          />
        </div>

        <ul
          className='suggestions'
          style={this.state.showSuggestions ? {} : { display: 'none' }}>
          {this.state.suggestions.map((suggestion) => (
            <li
              key={suggestion}
              onMouseDown={() => this.handleItemClicked(suggestion)}>
              {suggestion}
            </li>
          ))}
          <li key='all' onMouseDown={() => this.handleItemClicked}>
            <b>See all cities</b>
          </li>
        </ul>

        <InfoAlert text={this.state.infoText} />
      </div>
    );
  }
}

export default CitySearch;
