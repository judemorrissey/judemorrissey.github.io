import TheOneComponent from '../components/TheOneComponent.js';

const e = React.createElement; // (component_name, props, children)
class Home extends React.Component {
    render() {
        return e(TheOneComponent);
    }
}

ReactDOM.render(e(Home), document.getElementById('root'));
