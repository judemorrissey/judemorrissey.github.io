const e = React.createElement; // (component_name, props, children)
import {Air, Exit, Golem, Hero, Wall} from './Entity.js';
export default class Adventure extends React.Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({}, {
            board: null,
            logs: [],
            g_positions: [],
            hero_position: [0, 0],
            turn_in_progress: false,
            visibility: 5
        });
    }

    componentDidMount() {
        const getRandomLength = function () {
            return Math.max(Math.floor(Math.random() * 30), 15);
        };
        this.regenerateBoard(getRandomLength(), getRandomLength());
    }

    regenerateBoard(xlen, ylen) {
        // board is a 3 dimensional array, where board[x][y][0] will give you the bottom-most entity on coordinate (x, y)
        // first generate a board filled with air
        const board = [];
        let i;
        for (i = 0; i < xlen; i++) {
            const column = [];
            let j;
            for (j = 0; j < ylen; j++) {
                column.push([new Air()]);
            }
            board.push(column);
        }

        // hero always starts at origin
        board[0][0].push(new Hero());

        // exit is always at opposite corner of hero
        board[xlen - 1][ylen - 1].push(new Exit());

        // randomly place n Gs, at least one G per 25 available cells
        let gcount = Math.floor(Math.random() * xlen * ylen / 25);
        const getRandomSafeCoordinate = function () {
            return [
                Math.max(Math.floor((Math.random() * xlen) - 2), 2),
                Math.max(Math.floor((Math.random() * ylen) - 2), 2)
            ];
        };
        const g_positions = [];
        while (gcount > 0) {
            const [x, y] = getRandomSafeCoordinate();
            board[x][y].push(new Golem());
            g_positions.push([x, y]);
            gcount--;
        }

        return this.setState({
            logs: ['Game started.'],
            g_positions,
            hero_position: [0, 0],
            board
        });
    }

    updateBoard(callback) {
        // TODO: fill this in
        return callback();
    }

    moveHero(displacement) {
        if (this.state.turn_in_progress) {
            return; // don't do anything if turn is still progressing
        }
        return this.setState({
            turn_in_progress: true
        }, () => {
            return this.setState(prevState => {
                const [dx, dy] = displacement;
                const [px, py] = prevState.hero_position;
                const nx = px + dx;
                const ny = py + dy;
                const board = prevState.board;
                const entities = (board[nx] || [])[ny] || [new Wall()];
                const destination_cell_entity = entities[entities.length - 1];
                if (!destination_cell_entity.isPassable) {
                    return {
                        logs: prevState.logs.concat([`Tried to move ${displacement}, but there's a ${destination_cell_entity.constructor.name.toLowerCase()} there.`])
                    };
                }
                // move the hero from their current location to the new one
                board[nx][ny].push(board[px][py].pop());
                const newPos = [nx, ny];
                return {
                    logs: prevState.logs.concat([`Hero moved ${displacement} from ${prevState.hero_position} onto ${newPos}`]),
                    hero_position: newPos
                };
            }, () => {
                this.updateBoard(() => {
                    return this.setState({
                        turn_in_progress: false
                    });
                });
            });
        });
    }

    renderViewPortColumn(column) {
        return e('div', {className: 'viewPortColumn'},
            ...column.map(symbol => e('div', {className: 'viewPortCell'}, symbol))
        );
    }

    renderViewPort(visibility) {
        const {
            hero_position,
            board
        } = this.state;

        // grab the adjacent rows of where the hero is, then slice out adjacent columns
        const [x, y] = hero_position;
        const vp_columns = [];
        let i, j;
        for (i = x - visibility; i <= x + visibility; i++) {
            const column = board[i] || [];
            const vp_column = [];
            for (j = y - visibility; j <= y + visibility; j++) {
                const entities = column[j] || [];
                const symbol = entities.length ? entities[entities.length - 1].constructor.getSymbol() : Wall.getSymbol();
                vp_column.push(symbol);
            }
            vp_columns.push(vp_column);
        }

        return e('div', {className: 'viewPortContainer'},
            ...vp_columns.map(this.renderViewPortColumn)
        );
    }

    renderLegend() {
        return e('div', {className: 'legendContainer'},
            ...[Hero, Exit, Wall, Golem].map(entityClass => e('div', {}, `${entityClass.getSymbol()} ${entityClass.getDescription()}`))
        );
    }

    renderControls() {
        return e('div', {className: 'controlsContainer'},
            e('button', {onClick: this.moveHero.bind(this, [-1, 0])}, '<'),
            e('button', {onClick: this.moveHero.bind(this, [0, 1])}, 'v'),
            e('button', {onClick: this.moveHero.bind(this, [0, -1])}, '^'),
            e('button', {onClick: this.moveHero.bind(this, [1, 0])}, '>')
        );
    }

    renderLog() {
        const logs = this.state.logs;
        return e('div', {className: 'logContainer'},
            ...logs.slice(-5).reverse().map((log, i) => {
                return e('div', {className: 'logEntry'}, log);
            })
        );
    }

    render() {
        const {
            board,
            visibility
        } = this.state;

        if (!board) {
            return e('div', {}, 'Loading…');
        }

        return e('div', {className: 'adventureContainer'},
            this.renderViewPort(visibility),
            this.renderLegend(),
            this.renderControls(),
            this.renderLog()
        );
    }
}
