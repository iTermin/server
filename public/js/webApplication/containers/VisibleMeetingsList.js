import { connect } from 'react-redux'
import { toggleMeeting } from '../actions'
import MeetingsList from '../components/MeetingsList'

const getVisibleMeetings = (meetings, filter) => {
    switch (filter) {
    case 'SHOW_ALL':
        return meetings
    }
}

const mapStateToProps = (state) => {
    return {
        meetings: getVisibleMeetings(state.meetings, state.visibilityFilter)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onMeetingClick: (id) => {
            dispatch(toggleMeeting(id))
        }
    }
}

const VisibleMeetingsList = connect(
    mapStateToProps,
    mapDispatchToProps
)(MeetingsList)

export default VisibleMeetingsList
