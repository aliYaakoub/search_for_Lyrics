import React from 'react';
import loadingLogo from '../resources/loading.gif';

const Loading = () => {
    return (
        <div className="flex items-center justify-center w-full">
            <img src={loadingLogo} className="w-1/4" alt="" />
        </div>
    )
}

export default Loading
