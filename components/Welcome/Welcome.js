const e = React.createElement; // (component_name, props, children)
export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return e('div', {className: 'container'},
            e('p', {}, 'Welcome!'),
            e('p', {}, 'Soon there will be a longer nicer paragraph here. Right now though, there isn\'t, so please bear with the construction.')
        );
    }
}
