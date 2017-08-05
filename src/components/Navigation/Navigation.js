import React, { Component } from 'react'
import { Navbar } from 'react-bootstrap'

import Search from './Search';

export default class Navigation extends Component {

    render() {
        const searchProps = {
            search: this.props.search,
            data: this.props.searchData,
            isFetching: this.props.searchIsFetching
        };
        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">Simple Soundcloud Client</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Search {...searchProps} />
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
