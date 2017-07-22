import React, { Component } from 'react';
import { Redirect } from 'react-router';

class SearchWidgetComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            q: 'System Shock Theme',
            redirect: false
        };

        this.search = this.search.bind(this);
        this.searchTextChanged = this.searchTextChanged.bind(this);
    }

    searchTextChanged(e) {
        this.setState({ q: e.target.value });
    }

    search(event) {
        event.preventDefault();
        this.setState({ redirect: true });
    }

    render() {
        if (this.state.redirect) {
            this.state.redirect = false;
            return (<Redirect to={`/search/${this.state.q}`} />);
        }
        return (
            <form onSubmit={this.search} >
                <input type="text" value={this.state.q} onChange={this.searchTextChanged} placeholder="Search" />
                <button type="submit">Do stuff</button>
            </form>
        );
    }
}

export default SearchWidgetComponent;