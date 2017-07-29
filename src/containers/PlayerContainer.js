import { connect } from 'react-redux'

import { PlayerComponent } from './../components'
import { addToQueue, play, pause } from './../actions/trackActions'


const mapStateToProps = (state) => {
  const { track } = state
  return {
      track: state.currentTrack,
      isPlaying: state.isPlaying,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    play: () => dispatch(play()),
    pause: () => dispatch(pause()),
    addToQueue: (track) => dispatch(addToQueue(track)),
  }
}

const PlayerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerComponent);

export default PlayerContainer;