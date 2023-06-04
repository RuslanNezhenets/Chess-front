import React from 'react'
import {getLogo} from "../models/Logos";

const LostFigures = ({figures}) => {

    function sort(){
        figures?.sort((a, b) => a.name > b.name ? 1 : -1)
    }

    sort()

    return (
        <div className="lost">
            {figures?.map(figure =>
                <div key={figure.id} className="lost-img">
                    {figure && <img width={20} height={20} src={getLogo(figure, true)} alt={figure.name}/>}
                </div>
            )}
        </div>
    );
};

export default LostFigures;