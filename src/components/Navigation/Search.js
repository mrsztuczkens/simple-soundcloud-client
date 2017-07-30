import React, { Component } from 'react';
import { Navbar, FormGroup, Button, FormControl } from 'react-bootstrap'
import { Redirect } from 'react-router';

export default class Search extends Component {

    constructor(props) {
        super(props);
        console.log(props)

        this.state = {
            q: 'System Shock Theme',
            redirect: false
        };
    }

    searchTextChanged = (e) => {
        this.setState({ q: e.target.value });
    }

    search = (event) => {
        event.preventDefault();
        console.log('SUBMIT!', this.state)
    }

    render() {
        return (
            <form onSubmit={this.search}>
                <Navbar.Form pullRight>
                    <FormGroup>
                        <FormControl type="text" placeholder="Search" value={this.state.q} onChange={this.searchTextChanged} />
                    </FormGroup>
                    {' '}
                    <Button type="submit">Submit</Button>
                </Navbar.Form>
            </form>
        );
        // if (this.state.redirect) {
        //     this.state.redirect = false;
        //     return (<Redirect to={`/search/${this.state.q}`} />);
        // }
    }
}