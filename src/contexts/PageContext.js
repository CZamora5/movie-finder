import React, { useState, createContext, useMemo, useContext } from 'react';

const PageApiContext = createContext(null);
const PageStateContext = createContext(null);

export function usePageStateContext() {
  const page = useContext(PageStateContext);

  if (!page) {
    throw new Error('There is no provider for page state context');
  }

  return page;
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

  const api = useMemo(() => {
    return {
      decrement: () => {
        if (page <= 1) return;
        setPage(prevPage => prevPage - 1);
      },
      increment: () => setPage(prevPage => prevPage + 1)
    };
  }, [page]);

  return (
    <PageStateContext.Provider value={page}>
      <PageApiContext.Provider value={api}>
        {children}
      </PageApiContext.Provider>
    </PageStateContext.Provider>
  );
}