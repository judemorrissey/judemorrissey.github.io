import LikeButton from '../components/LikeButton.js';
import Transposer from '../components/Transposer/Transposer.js';
import Adventure from '../components/Adventure/Adventure.js';

const e = React.createElement; // (component_name, props, children)
class Home extends React.Component {
    render() {
        return e('div', {className: 'mainContainer'},
            e('div', {className: 'helloWorldContainer'},
                e('h1', null, 'Hello world!'),
                e(LikeButton),
                e(LikeButton),
                e(LikeButton)
            ),
            e('hr'),
            e('div', {className: 'transposerContainer'},
                e('h1', null, 'Transposer'),
                e(Transposer)
            ),
            e('hr'),
            e('div', {className: 'adventureContainer'},
                e('h1', null, 'Adventure'),
                e(Adventure)
            )
        );
    }
}

ReactDOM.render(e(Home), document.getElementById('root'));
