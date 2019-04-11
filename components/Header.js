const e = React.createElement; // (component_name, props, children)
export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    makeSwitcher(name, handler) {
        return e('a', {
            className: 'switcher',
            onClick: () => handler(name)
        }, name);
    }

    makeSwitchers() {
        const {
            contentNames,
            onSwitcherClicked
        } = this.props;
        return contentNames.map(name => this.makeSwitcher(name, onSwitcherClicked));
    }

    render() {
        return e('div', {className: 'header'},
            e('div', {className: 'headerContent'},
                e('div', {className: 'title'}, 'Jude Morrissey'),
                ...this.makeSwitchers()
            ),
            e('div', {className: 'garnish'})
        );
    }
}
