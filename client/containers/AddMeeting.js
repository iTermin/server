import React from 'react'
import { connect } from 'react-redux'
import { addMeeting } from '../actions'

let AddMeeting = ({ dispatch }) => {
    let input

    return (
            <div>
            <form onSubmit={e => {
                e.preventDefault()
                if (!input.value.trim()) {
                    return
                }
                dispatch(addMeeting(input.value))
                input.value = ''
            }}>
            <input ref={node => {
                input = node
            }} />
            <button type="submit">
            Add Meeting
        </button>
            </form>
            </div>
    )
}
AddMeeting = connect()(AddMeeting)

export default AddMeeting
