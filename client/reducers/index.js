import { combineReducers } from 'redux'
import meetings from './meetings'
import visibilityFilter from './visibilityFilter'

const meetingApp = combineReducers({
    meetings,
    visibilityFilter
})

export default meetingApp
