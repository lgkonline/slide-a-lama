import React from "react";
import { IItem, IPlayer } from "./shared/types";
import { pad } from "./shared/helpers";

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
    timeLeft: number;
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
        timeLeft: 10 * 1000 // 10 seconds
    };

    render() {
        return (
            <div className={`App ${debug ? "debug" : ""}`}>
                <div className="Stats m-1 mb-3">
                    {this.state.players.map((player: IPlayer, index: number) =>
                        <div key={index} className={`Stats-player Stats-player-${player.color}`}>
                            <div className="Stats-player-name">{player.name}</div>
                            <div className="Stats-player-points">{pad(player.points, 4)}</div>
                        </div>
                    )}
                </div>

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
                    <div className="TimeLeft-count">{this.state.timeLeft / 1000}</div>
                </div>

                <div className="Lamas">
                    {this.state.players.map((player: IPlayer, index: number) =>
                        <div key={index} className={`Lamas-player Lamas-player-${player.color}`}>
                            {[...Array(player.lamas)].map((i: any, index: number) =>
                                <span key={index} className="Lamas-llama" role="img" aria-label="Llama">🦙</span>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}