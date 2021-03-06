import React, { Component } from 'react';
import { Navbar, FormGroup, Button, FormControl } from 'react-bootstrap'
import { throttle } from 'lodash';

import SearchResults from './SearchResults';

export default class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            q: '',
        };
        this.throttledSearch = throttle(() => this.props.search(this.state.q), 1000, { trailing: true });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.q !== this.state.q) {
            this.throttledSearch();
        }
    }

    searchTextChanged = (e) => {
        this.setState({ q: e.target.value });
    }

    search = (event) => {
        event.preventDefault()
        this.props.search(this.state.q);
    }

    render() {
        const { props } = this;
        const searchResultsProps = {
            data: props.data,
            isFetching: props.isFetching,
            isVisible: props.isVisible,
            hide: props.hide,
        }
        return (
            <form onSubmit={this.search}>
                <Navbar.Form pullRight>
                    <FormGroup style={{ position: 'relative', overflow: 'visible' }}>
                        <FormControl type="text" placeholder="Search ..." value={this.state.q} onChange={this.searchTextChanged} />
                        <SearchResults {...searchResultsProps} />
                    </FormGroup>
                    {' '}
                    <Button type="submit">Submit</Button>
                </Navbar.Form>
            </form>
        );
    }
}