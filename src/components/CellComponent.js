import React from 'react'
import {getLogo} from '../models/Logos'

const CellComponent = ({cell, selected, click, history}) => {
    function last() {
        const lastMove = history[history.length - 1][history[history.length - 1].length - 1]

        const from = cell.x === lastMove?.from[0] && cell.y === lastMove?.from[1]
        const to = cell.x === lastMove?.to[0] && cell.y === lastMove?.to[1]

        return from || to
    }

    return (
        <div className={[
            'cell',
            cell.color,
            last() ? 'last' : '',
            selected ? 'selected' : '',
            //cell.available && cell.figure ? 'capture' : ''
        ].join(' ')}
             onClick={() => click(cell)}
             //style={{background: cell.available && cell.figure ? 'green' : ''}}
             data-x={cell.x}
             data-y={cell.y}
        >
            {/*{cell.available && !cell.figure && <div className={"available"}></div>}*/}
            <div className={['figureContainer', cell.available && (cell.figure ? "capture" : "available")].join(' ')}>
                {getLogo(cell.figure) && <img src={getLogo(cell.figure)} alt=""/>}
            </div>
        </div>
    );
};

export default CellComponent;