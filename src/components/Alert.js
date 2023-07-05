import { Component } from 'react';

class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
    this.bgColor = null;
  }

  getStyle = () => {
    return {
      color: this.color,
      backgroundColor: this.bgColor,
    };
  };

  render() {
    return (
      <div className='alert-container' style={{ textAlign: 'center' }}>
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}

class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'rgb(0, 0, 255)';
    this.bgColor = 'rgb(220, 220, 255)';
  }
}

class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'rgb(255, 0, 0)';
    this.bgColor = 'rgb(255, 220, 220)';
  }
}

class WarningAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'rgb(255, 255, 0)';
    this.bgColor = 'rgb(255, 255, 220)';
  }
}

export { InfoAlert, ErrorAlert, WarningAlert, Alert };
