import React, {useContext, useEffect} from 'react';
import LostFigures from "./LostFigures";
import avatar from "../assets/avatar.png"
import {timeEnd} from "../http/chessApi";
import {Context} from "../index";

const Player = ({player, figures, current, active, time, stopGame}) => {
    const {socket} = useContext(Context)
    useEffect(() => {
        if(time <= 0) {
            timeEnd(current).then(data => {
                if(data[0]) {
                    socket.socket.emit('board_update')
                    stopGame()
                }
            })
        }
    }, [time])

    return (
        <div className="board-player">
            <div className="board-player-content">
                <img className="board-player-img" src={avatar} alt=""/>
                <div className="board-player-info">
                    <div className="board-player-name">Джиммі</div>
                    <LostFigures figures={figures}/>
                </div>
            </div>
            <div className={['board-player-time', active].join(' ')}>
                <div className={['board-player-time-value', active].join(' ')}>
                    {`${Math.floor(time / 60)}:${(time % 60 < 10) ? "0" : ''}${time % 60}`}
                </div>
            </div>
        </div>
    );
};

export default Player;