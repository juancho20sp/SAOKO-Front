import React from 'react';

const ProvidedElement = ({ Context, contextValue, component }) => {
  return <Context.Provider value={contextValue}>{component}</Context.Provider>;
};

export default ProvidedElement;
