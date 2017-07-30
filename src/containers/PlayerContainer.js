import { connect } from 'react-redux'

import { PlayerComponent } from './../components'
import { addToQueue, play, pause, next, previous, toggleRepeat } from './../actions/trackActions'


const mapStateToProps = ({ track }) => {
  return {
    track: track.currentTrack,
    isPlaying: track.isPlaying,
    hasNext: track.nextTracks.length > 0,
    hasPrevious: track.previousTracks.length > 0,
    repeat: track.repeat,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    play: () => dispatch(play()),
    pause: () => dispatch(pause()),
    addToQueue: (track) => dispatch(addToQueue(track)),
    next: () => dispatch(next()),
    previous: () => dispatch(previous()),
    toggleRepeat: () => dispatch(toggleRepeat())
  }
}

const PlayerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerComponent);

export default PlayerContainer;