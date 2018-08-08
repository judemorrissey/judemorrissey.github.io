const e = React.createElement; // (component_name, props, children)

export default class StepButtons extends React.Component {
    render() {
        const {
            onMinusClick = () => {},
            onPlusClick = () => {},
            value
        } = this.props;
        return e('div', {className: 'container'},
            e('button', {onClick: onMinusClick}, '-'),
            e('button', {onClick: onPlusClick}, '+'),
            e('span', {}, value)
        );
    }
}
