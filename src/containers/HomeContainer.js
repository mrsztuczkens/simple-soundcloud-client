import { connect } from 'react-redux'
import { HomeComponent } from './../components'

const mapStateToProps = (state, props) => {
    return {
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
    };
}

const HomeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeComponent);

export default HomeContainer;