import React, { Fragment } from "react";

import { IItem, IPlayer } from "./shared/types";
import { pad } from "./shared/helpers";
import { TimeLeft } from "./components/TimeLeft";

const debug = false;

const data = {
    items: {
        "7": {
            "name": "7",
            "icon": "🏆",
            "points": 150
        },
        "bar": {
            "name": "bar",
            "icon": "💸",
            "points": 100
        },
        "cherry": {
            "name": "cherry",
            "icon": "🍒",
            "points": 70
        },
        "pear": {
            "name": "pear",
            "icon": "🍐",
            "points": 40
        },
        "plum": {
            "name": "plum",
            "icon": "🍇",
            "points": 30
        },
        "banana": {
            "name": "banana",
            "icon": "🍌",
            "points": 20
        },
        "bell": {
            "name": "bell",
            "icon": "🔔",
            "points": 10
        }
    } as { [key: string]: IItem }
};

const maxLamas = 10;


export interface IAppProps { }
export interface IAppState {
    activeItems: IItem[];
    players: IPlayer[];
    currentPlayerIndex: 0 | 1;
}

export class App extends React.Component<IAppProps, IAppState> {
    state = {
        activeItems: [
            Object.assign({ x: 1, y: 0 }, data.items.cherry),
            Object.assign({ x: 1, y: 1 }, data.items.bell),
            Object.assign({ x: 1, y: 2 }, data.items.pear),
            Object.assign({ x: 2, y: 2 }, data.items.pear),
            Object.assign({ x: 4, y: 2 }, data.items.bar),
            Object.assign({ x: 0, y: 3 }, data.items.pear),
            Object.assign({ x: 1, y: 3 }, data.items.cherry),
            Object.assign({ x: 2, y: 3 }, data.items.bell),
            Object.assign({ x: 4, y: 3 }, data.items.bell),
            Object.assign({ x: 0, y: 4 }, data.items.banana),
            Object.assign({ x: 1, y: 4 }, data.items.bell),
            Object.assign({ x: 2, y: 4 }, data.items.pear),
            Object.assign({ x: 3, y: 4 }, data.items.banana),
            Object.assign({ x: 4, y: 4 }, data.items.bell),
        ],
        players: [
            {
                name: "Cassidi",
                points: 0,
                lamas: maxLamas / 2,
                color: "red"
            },
            {
                name: "Butch",
                points: 0,
                lamas: maxLamas / 2,
                color: "blue"
            }
        ] as IPlayer[],

        currentPlayerIndex: 0 as 0 | 1
    };

    constructor(props: IAppProps) {
        super(props);
        this.onTimeUp = this.onTimeUp.bind(this);
    }

    componentDidMount() {
        this.start();
    }

    start() {
    }

    onTimeUp() {
        this.setState({ currentPlayerIndex: this.state.currentPlayerIndex === 0 ? 1 : 0 });
    }

    render() {
        return (
            <div className={`App ${debug ? "debug" : ""}`}>


                <div className="Stats m-1 mb-3">
                    {this.state.players.map((player: IPlayer, index: number) =>
                        <div
                            key={index}
                            className={`Stats-player Stats-player-${player.color} ${(this.state.currentPlayerIndex === index) ? "active" : ""}`}
                        >
                            <div className="Stats-player-name">{player.name}</div>
                            <div className="Stats-player-points">{pad(player.points, 4)}</div>
                        </div>
                    )}
                </div>

                <div className="App-row">
                    <div className="App-side-col">
                        <table className="App-table mx-2">
                            <tbody>
                                {Object.values(data.items).map((item: IItem, index: number) =>
                                    <tr key={index}>
                                        {[...Array(3)].map((i: any, index2: number) =>
                                            <td key={index2}>{item.icon}</td>
                                        )}
                                        <td>{item.points}</td>
                                    </tr>
                                )}

                                <tr>
                                    <td colSpan={3}>4 of a kind</td>
                                    <td>&times;2</td>
                                </tr>

                                <tr>
                                    <td colSpan={3}>5 of a kind</td>
                                    <td>&times;3</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <main className="App-main-col">
                        <div className="Grid mb-3">
                            {[...Array(5)].map((i: any, x: number) =>
                                [...Array(5)].map((j: any, y: number) =>
                                    <div
                                        key={`${x}-${y}`}
                                        className={`Grid-item Grid-item-${x}-${y} Grid-x-${x} Grid-y-${y}`} data-y-friendly={y + 1}
                                        style={debug ? { boxShadow: "inset 0 0 2px" } : {}}
                                    >
                                        {debug && <span className="text-muted position-absolute">x{x} y{y}</span>}
                                    </div>
                                )
                            )}

                            {this.state.activeItems.map((item: IItem, index: number) =>
                                <div key={index} className={`Item Grid-item Grid-item-${item.x}-${item.y}`}>
                                    {item.icon}
                                </div>
                            )}
                        </div>

                        <div className="TimeLeft mb-3">
                            <div className="TimeLeft-arrow TimeLeft-arrow-red">
                                {this.state.currentPlayerIndex === 0 &&
                                    <span>⬅</span>
                                }
                            </div>

                            {this.state.currentPlayerIndex === 0 ?
                                <Fragment>
                                    <TimeLeft onTimeUp={this.onTimeUp} />
                                </Fragment>
                                :
                                <TimeLeft onTimeUp={this.onTimeUp} />
                            }

                            <div className="TimeLeft-arrow TimeLeft-arrow-blue">
                                {this.state.currentPlayerIndex === 1 &&
                                    <span className="mirror">⬅</span>
                                }
                            </div>
                        </div>
                    </main>

                    <div className="App-side-col" />
                </div>


                <div className="Lamas">
                    {this.state.players.map((player: IPlayer, index: number) =>
                        <div key={index} className={`Lamas-player Lamas-player-${player.color}`}>
                            {[...Array(player.lamas)].map((i: any, index: number) =>
                                <span key={index}
                                    className={`Lamas-llama ${player.color === "red" ? "mirror" : ""}`}
                                    role="img" aria-label="Llama">🦙</span>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}