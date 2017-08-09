import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { UrlHelper } from './../../helpers'

class TrackInfo extends Component {

    static propTypes = {
        track: PropTypes.object
    };

    static defaultProps = {
        track: null
    };

    render() {
        if (!this.props.track) {
            return null;
        }
        const { title, user } = this.props.track;
        const artwork = this.props.artwork_url || 'http://via.placeholder.com/150x150';

        return (
            <Row>
                <Col lg={5}>
                    <img src={artwork} alt={title} />
                </Col>
                <Col lg={7}>
                    <p>{title}</p>
                    <p>
                        <Link to={ UrlHelper.artist(user.permalink)}>{user.username}</Link>
                    </p>
                </Col>
            </Row>
        );
    }

}

export default TrackInfo;