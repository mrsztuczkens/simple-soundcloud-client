import React, { Component } from 'react';
import SC from 'soundcloud';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import { NotFoundComponent } from './components/';
import {
    SearchResultsContainer, PlayerContainer, ArtistContainer,
    NavigationContainer, HomeContainer, GenreContainer
} from './containers'
import { CLIENT_ID } from './consts';
import { AppWrapper } from './App.style'
import './App.css'

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
                <div>
                    <AppWrapper>
                        <NavigationContainer />
                        <Switch>
                            <Route path="/genre/:genre" component={GenreContainer} />
                            <Route path="/artist/:permalink" component={ArtistContainer} />
                            <Route path="/search/:q?" component={SearchResultsContainer} />
                            <Route path="/" exact component={HomeContainer} />
                            <Route component={NotFoundComponent} />
                        </Switch>
                    </AppWrapper>
                    <PlayerContainer />
                </div>
            </Router>
        );
    }
}

export default App;
