import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { Genres } from './../../consts';
import { GenreWrapper } from './Home.style';

export default class Home extends Component {


    render() {
        return (
            <Grid>
                <Row>
                    {Object.entries(Genres).map(([key, name]) =>
                        <Col key={key} lg={3}>
                            <Link to={`/genre/${key}`}>
                                <GenreWrapper>
                                    <h3>{name}</h3>
                                </GenreWrapper>
                            </Link>
                        </Col>
                    )}
                </Row>
            </Grid>
        );
    }
}