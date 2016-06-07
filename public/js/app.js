

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
                </table>
                </div>
        );
    }
});

const data = [
    {id: 1, name: "Meeting 1", date: "20 Diciembre 2016 20:00hrs"},
    {id: 2, name: "Meeting 2", date: "21 Diciembre 2016 21:00hrs"}
];

ReactDOM.render(
        <MeetingsBox data={data} />,
    document.getElementById('content')
);
