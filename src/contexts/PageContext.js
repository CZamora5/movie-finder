import React, { useState, createContext, useMemo, useContext } from 'react';

const PageApiContext = createContext(null);
const PageStateContext = createContext(null);

export function usePageStateContext() {
  const pageState = useContext(PageStateContext);

  if (!pageState) {
    throw new Error('There is no provider for page state context');
  }

  return pageState;
}

export function usePageApiContext() {
  const api = useContext(PageApiContext);

  if (!api) {
    throw new Error('There is no provider for page api context');
  }

  return api;
}

export function PageContextProvider({ children }) {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const api = useMemo(() => {
    return {
      decrement: () => {
        if (page <= 1) return;
        setPage(prevPage => prevPage - 1);
      },
      increment: () => {
        if (page >= totalPages) return;
        setPage(prevPage => prevPage + 1);
      }
    };
  }, [page, totalPages]);

  return (
    <PageStateContext.Provider value={{ page, totalPages }}>
      <PageApiContext.Provider value={{api, setPage, setTotalPages}}>
        {children}
      </PageApiContext.Provider>
    </PageStateContext.Provider>
  );
}