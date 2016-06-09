import React from 'react'
import Footer from './components/Footer'
import AddMeeting from './containers/AddMeeting'
import VisibleMeetingsList from './containers/VisibleMeetingsList'

const App = () => (
        <div>
        <AddMeeting />
        <VisibleMeetingsList />
        <Footer />
        </div>
)

export default App
