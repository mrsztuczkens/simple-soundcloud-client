import { connect } from 'react-redux'

import { NavigationComponent } from './../components'
import { search } from './../actions/searchActions'

const mapStateToProps = ({ search }) => ({
    searchIsFetching: search.isFetching,
    searchData: search.data,
});

const mapDispatchToProps = (dispatch) => ({
    search: (q) => dispatch(search(q)),
});

const NavigationContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NavigationComponent);

export default NavigationContainer;