// TODO Use common js import instead of global variables
const MeetingsBox = window.MeetingsBox;

const data = [
    { id: 1, name: "Meeting 1", date: "20 Diciembre 2016 20:00hrs" },
    { id: 2, name: "Meeting 2", date: "21 Diciembre 2016 21:00hrs" }
];

ReactDOM.render(
        <MeetingsBox data={data} />, document.getElementById('content')
);

