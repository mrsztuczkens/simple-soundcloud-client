import { connect } from 'react-redux'

import { NavigationComponent } from './../components'
import { search, searchResultsHide } from './../actions/searchActions'

const mapStateToProps = ({ search }) => ({
    searchIsFetching: search.isFetching,
    searchIsVisible: search.isVisible,
    searchData: search.data,
});

const mapDispatchToProps = (dispatch) => ({
    search: (q) => dispatch(search(q)),
    searchResultsHide: () => dispatch(searchResultsHide()),
});

const NavigationContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NavigationComponent);

export default NavigationContainer;