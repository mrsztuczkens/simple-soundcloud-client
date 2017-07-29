import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { artist as artistUrl } from '../../helpers/url-helper'

export default class ArtistInfo extends Component {

    static propTypes = {
        info: PropTypes.object,
        permalink: PropTypes.string.isRequired,
    };

    render() {
        const { username, city, country, avatar_url, permalink } = this.props.info;
        return (
            <div>
                <Link to={artistUrl(permalink)}><h3>{username}</h3></Link>
                <img src={avatar_url} alt={username} />
                <p>From {city} in {country}</p>
            </div>
        );
    }
}