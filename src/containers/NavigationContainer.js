import { connect } from 'react-redux';

import { NavigationComponent } from './../components';
import { search, searchResultsHide } from './../actions/searchActions';
import { toggleQueue } from './../actions/queueActions';
import { moveTrackToIndex, removeTrack } from './../actions/trackActions'

const mapStateToProps = ({ search, queue, track }) => ({
    searchIsFetching: search.isFetching,
    searchIsVisible: search.isVisible,
    searchData: search.data,
    queueIsVisible: queue.isVisible,
    queueNextTracks: track.nextTracks,
});

const mapDispatchToProps = (dispatch) => ({
    search: (q) => dispatch(search(q)),
    searchResultsHide: () => dispatch(searchResultsHide()),
    queueToggle: () => dispatch(toggleQueue()),
    queueMoveTrackToIndex: (index, toIndex) => dispatch(moveTrackToIndex(index, toIndex)),
    queueRemoveTrack: (index) => dispatch(removeTrack(index)),
});

const NavigationContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NavigationComponent);

export default NavigationContainer;