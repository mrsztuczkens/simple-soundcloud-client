import { connect } from 'react-redux'

import { PlayerComponent } from './../components'

const mapStateToProps = (state) => {
  return {
      track: state.track
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const PlayerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerComponent);

export default PlayerContainer;