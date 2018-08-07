import LikeButton from '../components/like_button.js';

const e = React.createElement; // (component_name, props, children)
class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return e('div', {className: 'mainContainer'},
            e('h1', null, 'Hello world!'),
            e(LikeButton),
            e(LikeButton),
            e(LikeButton)
        );
    }
}

ReactDOM.render(e(Home), document.getElementById('root'));
