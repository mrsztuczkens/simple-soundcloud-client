import { connect } from 'react-redux'

import { search } from './../actions/searchActions'
import { SearchComponent } from './../components'

const mapStateToProps = (state) => {
  return {
    isFetching: state.searchResults.isFetching,
    results: state.searchResults.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    search: (q) => dispatch(search(q))
  }
}

const SearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchComponent);

export default SearchContainer;