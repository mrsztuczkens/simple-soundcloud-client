import { connect } from 'react-redux'

import { changeTrack, search } from './../actions'
import { SearchComponent } from './../components'

const mapStateToProps = (state) => {
  return {
    isFetching: state.searchResults.isFetching,
    results: state.searchResults.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeTrack: (track) => dispatch(changeTrack(track)),
    search: (q) => dispatch(search(q))
  }
}

const SearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchComponent);

export default SearchContainer;