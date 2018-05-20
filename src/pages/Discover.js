import React, { Component, Fragment } from 'react';
import Person from '../components/Person';
import Fab from '../components/Fab';

// state management

const succ = (current, min, max) => (current === max ? min : current + 1);
const pred = (current, min, max) => (current === min ? max : current - 1);

const setNext = ({ current }, { people }) => ({
  current: succ(current, 1, people.length)
});

const setPrev = ({ current }, { people }) => ({
  current: pred(current, 1, people.length)
});

const play = () => ({
  playing: true
});

const pause = () => ({
  playing: false
});

// subcomponents

const Fabs = ({ playing, next, prev, play, pause }) => (
  <div className="control-container">
    <Fab kind="skip_previous" onClick={prev} />
    {playing ? (
      <Fab kind="pause" large onClick={pause} />
    ) : (
      <Fab kind="play_arrow" large onClick={play} />
    )}
    <Fab kind="skip_next" onClick={next} />
  </div>
);

// container

class Discover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      playing: false
    };
  }

  showNextPerson = () => {
    this.setState(setNext);
  };

  showPreviousPerson = () => {
    this.setState(setPrev);
  };

  play = () => {
    this.intervalId = setInterval(this.showNextPerson, 2000);
    this.showNextPerson();
    this.setState(play);
  };

  pause = () => {
    clearInterval(this.intervalId);
    this.setState(pause);
  };

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    const { people } = this.props;
    const { current, playing } = this.state;
    return (
      <Fragment>
        <div className="card-container">
          <Person person={people[current - 1]} />
        </div>
        <Fabs
          playing={playing}
          next={this.showNextPerson}
          prev={this.showPreviousPerson}
          play={this.play}
          pause={this.pause}
        />
      </Fragment>
    );
  }
}

export default Discover;
