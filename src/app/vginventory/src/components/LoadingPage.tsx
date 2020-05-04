import React from 'react';
import ReactLoading from 'react-loading';

export const LoadingPage = ({type, color} : any) => (
    <ReactLoading type={type} color={color} />
);
