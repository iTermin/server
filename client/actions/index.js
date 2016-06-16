

let idMeeting = 0

function addMeeting(text){
    return {
        type: 'ADD_MEETING',
        id: idMeeting++,
        text
    }
}

function setVisibilityFilter(filter){
    return {
        type: 'SET_VISIBILITY_FILTER',
        filter
    }
}

function toggleMeeting(id){
    return {
        type: 'TOGGLE_MEETING',
        id
    }
}

module.exports = {
    addMeeting, setVisibilityFilter, toggleMeeting
}
