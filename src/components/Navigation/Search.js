import React, { Component } from 'react';
import { Navbar, FormGroup, Button, FormControl, ButtonGroup } from 'react-bootstrap'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom'
import { track as trackUrl } from '../../helpers/url-helper'

import styled from 'styled-components'

const SearchResultsWrapper = styled.div`
position: absolute;
top: 100%;
width: 100%;
background-color: white;
`

const SearchResultsList = styled.ul`
list-style: none;
`

const SearchResultsEntry = styled.li`
cursor: pointer;
&:hover {
    background-color: blue;
}
`

export default class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            q: 'System Shock Theme',
        };
    }

    searchTextChanged = (e) => {
        this.setState({ q: e.target.value });
    }

    search = (event) => {
        event.preventDefault()
        this.props.search(this.state.q);
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps)
    }

    render() {
        return (
            <form onSubmit={this.search}>
                <Navbar.Form pullRight>
                    <FormGroup style={{ position: 'relative', overflow: 'visible' }}>
                        <FormControl type="text" placeholder="Search" value={this.state.q} onChange={this.searchTextChanged} />
                        <SearchResultsWrapper>
                            <SearchResultsList>
                            {this.props.data.map(track =>
                                <Link key={track.id} to={trackUrl(track.user.permalink, track.permalink)}>
                                    <SearchResultsEntry >{track.title}</SearchResultsEntry>
                                </Link>
                            )}
                            </SearchResultsList>
                        </SearchResultsWrapper>
                    </FormGroup>
                    {' '}
                    <Button type="submit">Submit</Button>
                </Navbar.Form>
            </form>
        );
    }
}