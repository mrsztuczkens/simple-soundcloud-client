import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
        const { title, artwork_url } = this.props.track;
        const { username: artistUserName, permalink: artistPermalink } = this.props.track.user;
        return (
            <Row>
                <Col lg={5}>
                    <img src={artwork_url} alt={title} />
                </Col>
                <Col lg={7}>
                    <p>{title}</p>
                    <p>
                        <Link to={{ pathname: `/artist/${artistPermalink}`}}>{artistUserName}</Link>
                    </p>
                </Col>
            </Row>
        );
    }

}

export default TrackInfo;