import React from 'react';
import { Oval as LoaderSpinner } from 'react-loader-spinner';

const Loader = () => (
  <div className="loader">
    <LoaderSpinner color="#3f51b5" height={80} width={80} />
  </div>
);

export default Loader;
