import React from 'react';
import Footer from './components/Footer';
import AddMeeting from './containers/AddMeeting';
import VisibleMeetingsList from './containers/VisibleMeetingsList';
import reducers from './reducers';
import ReactDOM from "react-dom";
import { createStore } from 'redux';
import { Provider } from 'react-redux';

let store = createStore(reducers);
const App = () => (
        <Provider store={store}>
        <div>
        <AddMeeting />
        <VisibleMeetingsList />
        <Footer />
        </div>
        </Provider>
)

ReactDOM.render(<App />, document.body);
