import React from 'react'
import {getLogo} from '../models/Logos'

const CellComponent = ({cell, selected, click}) => {
    return (
        <div className={['cell', cell.color, selected ? 'selected' : ''].join(' ')}
             onClick={() => click(cell)}
             style={{background: cell.available && cell.figure ? 'green' : ''}}
             data-x={cell.x}
             data-y={cell.y}
        >
            {cell.available && !cell.figure && <div className={"available"}></div>}
            {getLogo(cell.figure) && <img src={getLogo(cell.figure)} alt=""/>}
        </div>
    );
};

export default CellComponent;