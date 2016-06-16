const meeting = (state, action) => {
    switch (action.type) {
    case 'ADD_MEETING':
        return {
            id: action.id,
            text: action.text,
            completed: false
        }
    case 'TOGGLE_MEETING':
        if (state.id !== action.id) {
            return state
        }

        return Object.assign({}, state, {
            completed: !state.completed
        })

    default:
        return state
    }
}

const meetings = (state = [], action) => {
    switch (action.type) {
    case 'ADD_MEETING':
        return [
            ...state,
            meeting(undefined, action)
        ]
    case 'TOGGLE_MEETING':
        return state.map(t =>
                         meeting(t, action)
                        )
    default:
        return state
    }
}

export default meetings
