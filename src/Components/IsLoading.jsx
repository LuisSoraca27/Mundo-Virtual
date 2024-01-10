import React from 'react';
import '../style/isloading.css';
import { ProgressSpinner } from 'primereact/progressspinner';
        

const IsLoading = () => {

    return (
        <div className='container-spinner'>
            <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
        </div>
    );
};

export default IsLoading;