const e = React.createElement; // (component_name, props, children)
export default class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    makeLink(text, href) {
        return e('a', {
            className: 'link',
            href,
            target: '_blank'
        }, text);
    }

    makeLinks() {
        return [
            this.makeLink('GitHub', 'https://www.github.com/judemorrissey'),
            this.makeLink('LinkedIn', 'https://www.linkedin.com/in/judemorrissey')
        ];
    }

    render() {
        return e('div', {className: 'footer'},
            e('div', {className: 'footerContent'},
                e('div', {className: 'linksContainer'}, ...this.makeLinks())
            )
        );
    }
}
