import React, {useEffect} from 'react';
import LostFigures from "./LostFigures";
import avatar from "../assets/avatar.png"
import {timeEnd} from "../http/chessApi";

const Player = ({player, figures, current, active, time, stopGame}) => {

    useEffect(() => {
        if(time <= 0) {
            timeEnd(current).then(data => {
                if(data[0]) stopGame()
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