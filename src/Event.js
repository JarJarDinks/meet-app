import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
    };
  }

  toggleDetails = () => {
    this.setState((prevState) => ({
      collapsed: !prevState.collapsed,
    }));
  };

  render() {
    const { event } = this.props;
    const { collapsed } = this.state;
    return (
      <div className='event'>
        <h2 className='summary'>{event.summary}</h2>
        <p className='event-start'>
          {new Date(event.start.dateTime).toString()}
        </p>
        <p className='event-location'>
          {`@${event.summary} | ${event.location}`}
        </p>
        {!collapsed && (
          <div className='details'>
            <h3 className='about'>About event:</h3>
            <a className='link' href={event.htmlLink}>
              See details on Google Calendar
            </a>
            <p className='description'>{event.description}</p>
          </div>
        )}
        <button className='details-btn' type='button'
          {collapsed ? 'show' : 'hide'} details
        </button>
      </div>
    );
  }
}

Event.propTypes = {
  event: PropTypes.object.isRequired,
};

export default Event;
