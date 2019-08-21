import Header from './Header.js';
import Footer from './Footer.js';

import Adventure from './Adventure/Adventure.js';
import Transposer from './Transposer/Transposer.js';
import Welcome from './Welcome/Welcome.js';

const CONTENT_MAP = {
    Welcome,
    Adventure,
    Transposer
};

const e = React.createElement; // (component_name, props, children)
export default class TheOneComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nowShowing: Welcome
        };
    }

    onSwitcherClicked(name) {
        return this.setState({
            nowShowing: CONTENT_MAP[name]
        });
    }

    render() {
        const {
            nowShowing
        } = this.state;
        return e('div', {className: 'theOneContainer'},
            e(Header, {contentNames: Object.keys(CONTENT_MAP), onSwitcherClicked: name => this.onSwitcherClicked(name)}),
            e('div', {className: 'content'}, e(nowShowing)),
            e(Footer)
        );
    }
}
