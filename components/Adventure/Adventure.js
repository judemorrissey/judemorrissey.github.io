const e = React.createElement; // (component_name, props, children)
export default class Adventure extends React.Component {
    constructor(props) {
        super(props);
        this.friendlyNameToSymbolMap = {
            air: ' ',
            exit: 'O',
            golem: 'G',
            hero: '@',
            wall: '#'
        };
        this.symbolToLegendTextMap = {
            '@': 'is your hero',
            O: 'marks the exit',
            '#': 'is unpassable',
            'G': 'are evil enemies, watch out!'
        };
        this.state = Object.assign({}, {
            board: null,
            logs: [],
            g_positions: [],
            hero_position: [0, 0],
            turn_in_progress: false,
            visibility: 2
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
                column.push([this.friendlyNameToSymbolMap.air]);
            }
            board.push(column);
        }

        // hero always starts at origin
        board[0][0].push(this.friendlyNameToSymbolMap.hero);

        // exit is always at opposite corner of hero
        board[xlen - 1][ylen - 1].push(this.friendlyNameToSymbolMap.exit);

        // randomly place n Gs, at least one G per 25 available cells
        let gcount = Math.floor(Math.random() * xlen * ylen / 25);
        const getRandomSafeCoordinate = function () {
            return [
                Math.min(Math.floor((Math.random() * xlen) - 2), 2),
                Math.min(Math.floor((Math.random() * ylen) - 2), 2)
            ];
        };
        const g_positions = [];
        while (gcount > 0) {
            const [x, y] = getRandomSafeCoordinate();
            board[x][y].push(this.friendlyNameToSymbolMap.golem);
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
                const entities = (board[nx] || [])[ny] || [this.friendlyNameToSymbolMap.wall];
                const destination_cell_entity = entities[entities.length - 1];
                if (destination_cell_entity === this.friendlyNameToSymbolMap.wall) {
                    return {
                        logs: prevState.logs.concat([`Tried to move ${displacement}, but there's a wall there.`])
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
        return e('div', {
            style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-evenly'
            }
        }, ...column.map(entities => {
            return e('div', {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: '1px',
                    borderColor: 'gray',
                    fontSize: '2em',
                    padding: '4px',
                    height: '30px',
                    width: '30px'
                }
            }, entities[entities.length - 1]);
        }));
    }

    renderViewPort(visibility = 2) {
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
                const item = column[j] || this.friendlyNameToSymbolMap.wall;
                vp_column.push(item);
            }
            vp_columns.push(vp_column);
        }

        return e('div', {
            style: {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                padding: '16px',
                height: '150px',
                width: '150px'
            }
        },
        ...vp_columns.map(this.renderViewPortColumn)
        );
    }

    renderLegend() {
        return e('div', {className: 'legendContainer'},
            ...Object.keys(this.symbolToLegendTextMap).map(symbol => e('div', {}, `${symbol} ${this.symbolToLegendTextMap[symbol]}`))
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
                return e('div', {
                    style: {
                        backgroundColor: i % 2 !== 0 ? 'lightGray' : 'white'
                    }
                }, log);
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

        return e('div', {},
            this.renderViewPort(visibility),
            this.renderLegend(),
            this.renderControls(),
            this.renderLog()
        );
    }
}
