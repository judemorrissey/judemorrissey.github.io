const e = React.createElement; // (component_name, props, children)
export default class Transposer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return e('div', {}, 'Coming soon…');
    }
}
