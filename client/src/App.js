import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from './Login'
import AddFriend from './AddFriend'

class App extends React.Component {
    render() {
        return (
            <Router>
                <React.Fragment>
    
                    <switch>
                        <Router>
                            <Route path="/" component={Login}/>
                        </Router>
                        <Router>
                            <Route path="/user" component={AddFriend}/>
                        </Router>
                    </switch>

                </React.Fragment>
            </Router>
        );
    }
}
export default App;
