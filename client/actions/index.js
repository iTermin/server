

let idMeeting = 0

export const addMeeting = (text) => {
    return {
        type: 'ADD_MEETING',
        id: idMeeting++,
        text
    }
}

export const setVisibilityFilter = (filter) => {
    return {
        type: 'SET_VISIBILITY_FILTER',
        filter
    }
}

export const toggleMeeting = (id) => {
    return {
        type: 'TOGGLE_MEETING',
        id
    }
}
