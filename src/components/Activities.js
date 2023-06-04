import React from 'react';

const Activities = ({restart}) => {
    const handleRestart = () => {
        restart(600)
    }

    return (
        <div className="activities">
            <div className="activities-button" onClick={handleRestart}>Нова гра</div>
        </div>
    );
};

export default Activities;