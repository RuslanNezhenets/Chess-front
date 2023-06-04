import React, {useEffect, useRef, useState} from 'react'
import './css/App.css'
import BoardComponent from "./components/BoardComponent"
import {fetchBoard, highlight, reset} from "./http/chessApi"
import Player from "./components/Player"
import History from "./components/History";
import {Colors} from "./models/Colors";
import WinModal from "./components/modals/WinModal";
import Activities from "./components/Activities";

function App() {
    const [board, setBoard] = useState({'cells': [], "first": true})
    const [showModal, setShowModal] = useState(false)
    const [blackTime, setBlackTime] = useState(600)
    const [whiteTime, setWhiteTime] = useState(600)
    const timer = useRef(null)

    useEffect(() => {
        highlight(null, 1).then(() => {
            fetchBoard().then(data => {
                setBoard(data)
                setWhiteTime(data.time[0])
                setBlackTime(data.time[1])
            })
        })
    }, [])

    useEffect(() => {
        startTimer()
    }, [board.active])

    function restart(time_init) {
        setWhiteTime(time_init)
        setBlackTime(time_init)
        clearInterval(timer.current)
        setBoard({'cells': [], "first": true})
        reset(time_init).then((data => setBoard(data)))
    }

    function startTimer() {
        if (board.state !== 2 && board.state !== 3 && !board.first) {
            if (timer.current) clearInterval(timer.current)
            let callback = null
            if (board.active === Colors.WHITE) callback = decrementWhiteTimer
            else if (board.active === Colors.BLACK) callback = decrementBlackTimer
            timer.current = setInterval(callback, 1000)
        }
    }

    function decrementBlackTimer() {
        setBlackTime(prev => prev - 1)
    }

    function decrementWhiteTimer() {
        setWhiteTime(prev => prev - 1)
    }

    function stopGame() {
        fetchBoard().then(data => setBoard(data))
        setShowModal(true)
        clearInterval(timer.current)
    }

    return (
        <div className="app">
            <WinModal
                show={showModal}
                onHide={() => setShowModal(false)}
                board={board}
            />
            <div id="board-main">
                <div className="board-main-container">
                    <Player
                        figures={board.lost_white}
                        active={board.active === "white" ? "black" : "white"}
                        current={board.active}
                        time={blackTime}
                        stopGame={stopGame}
                    />
                    <BoardComponent
                        board={board}
                        setBoard={setBoard}
                        currentPlayer={board.active}
                        stopGame={stopGame}
                    />
                    <Player
                        figures={board.lost_black}
                        active={board.active === "white" ? "white" : "black"}
                        current={board.active}
                        time={whiteTime}
                        stopGame={stopGame}
                    />
                </div>
            </div>
            <div id="board-sidebar">
                <div className="board-sidebar-container">
                    <History history={board.history}/>
                    <Activities restart={restart}/>
                </div>
            </div>
        </div>
    );
}

export default App;
