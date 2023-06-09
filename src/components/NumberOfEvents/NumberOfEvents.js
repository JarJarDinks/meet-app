import React, { Component } from 'react';

import { ErrorAlert } from '../Alert/Alert.js';

class NumberOfEvents extends Component {
  state = {
    number: 32,
    errorText: '',
  };

  handleInputChanged = (event) => {
    const minValue = 0;
    const maxValue = 32;
    let inputValue = event.target.value;
    inputValue = Math.max(
      Number(minValue),
      Math.min(Number(maxValue), Number(inputValue))
    );
    this.props.updateEvents(null, inputValue);
    this.setState({ number: inputValue });
    if (inputValue < 1 || inputValue > 32) {
      this.setState({ errorText: 'Select number from 1 to 32' });
    } else {
      this.setState({ errorText: '' });
    }
  };

  render() {
    return (
      <div className='NumberOfEvents'>
        <input
          id='number-of-events'
          type='number'
          className='number'
          value={this.state.number}
          onChange={this.handleInputChanged}
          min='0'
        />
        <ErrorAlert text={this.state.errorText} />
      </div>
    );
  }
}

export default NumberOfEvents;
