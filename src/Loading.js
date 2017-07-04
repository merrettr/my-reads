import React, { Component } from 'react';
import { times } from 'lodash';

class Loading extends Component {
  state = {
    dots: 1,
  };

  componentDidMount() {
    this.interval = setInterval(this.incrementDots, 400);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  incrementDots = () => {
    this.setState(prev => ({
      dots: prev.dots === 3 ? 1 : prev.dots + 1,
    }));
  };

  render() {
    let dots = '';
    times(this.state.dots, () => (dots += '.'));

    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <span>
          Loading{dots}
        </span>
      </div>
    );
  }
}

export default Loading;
