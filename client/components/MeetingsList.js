import React, { PropTypes } from 'react'
import Meeting from './Meeting'

const MeetingsList = ({ meetings, onMeetingClick }) => (
        <ul>
        {meetings.map(meeting =>
                   <Meeting
                   key={meeting.id}
                   {...meeting}
                   onClick={() => onMeetingClick(meeting.id)}
                   />
                  )}
    </ul>
)

MeetingsList.propTypes = {
    meetings: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        completed: PropTypes.bool.isRequired,
        text: PropTypes.string.isRequired
    }).isRequired).isRequired,
    onMeetingClick: PropTypes.func.isRequired
}

export default MeetingsList
