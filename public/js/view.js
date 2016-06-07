

const MeetingsBox = React.createClass({
    render: function() {
        return (
                <div className="meetingsBox">
                <h1>List of Meetings</h1>
                <MeetingsList data={this.props.data} />
                </div>
        );
    }
});

const MeetingsList = React.createClass({
    render: function() {
        const infoMeeting = this.props.data.map(function(comment) {
            return (
                    <Comment meeting={comment.name} key={comment.id}>
                    {comment.date}
                </Comment>
            );
        });

        return (
                <div className="meetingsList">
                {infoMeeting}
            </div>
        );
    }
});

const Comment = React.createClass({
    rawMarkup: function() {
        const rawMarkup = marked(this.props.children.toString(), {sanitize: true});
        return { __html: rawMarkup };
    },
    render: function() {
        return (
                <div className="comment">
                <table>
                <tbody>
                <tr>
                <td>
                <h3 className="infoMeeting">
                {this.props.meeting}
            </h3>
                </td>
                <td>
                <span dangerouslySetInnerHTML={this.rawMarkup()} />
                </td>
                </tr>
                </tbody>
                </table>
                </div>
        );
    }
});


window.MeetingsBox = MeetingsBox;
// module.exports = MeetingsBox;
