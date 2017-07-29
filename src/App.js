import React, { Component } from 'react';
import SC from 'soundcloud';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import { SearchWidgetComponent, NotFoundComponent } from './components/';
import { SearchContainer, PlayerContainer, ArtistContainer } from './containers'
import { CLIENT_ID } from './consts';

import logo from './logo.svg';
import './App.css';

const history = createHistory();

class App extends Component {


    componentWillMount() {
        SC.initialize({
            client_id: CLIENT_ID
        });
    }

    render() {
        return (
            <Router history={history}>
                <div className="App">
                    <div className="App-header">
                        <h2>Simple Soundcloud Client</h2>
                    </div>
                    <SearchWidgetComponent />
                    <Route path="/artist/:permalink" component={ArtistContainer} />
                    <Route path="/search/:q?" component={SearchContainer} />
                    <Route path="/404" component={NotFoundComponent} />
                    <PlayerContainer />
                </div>
            </Router>
        );
    }
}

export default App;
