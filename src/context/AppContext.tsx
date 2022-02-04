import { createContext, ReactNode, useContext, useMemo, useReducer } from "react";

interface AppState {
  score: number;
}

interface AppAction {
  type: 'increment' | 'decrement' | 'reset'
}

interface AppContext {
  appState: AppState;
  appDispatch: React.Dispatch<AppAction>;
  increaseScore(): any;
  decreaseScore(): any;
  resetScore(): any;
}

const initialState: AppState = {
  score: 0
}

export const AppContext = createContext<AppContext>({
  appState: initialState,
  appDispatch: () => null,
  increaseScore: () => null,
  decreaseScore: () => null,
  resetScore: () => null,
});

const AppReducer = (state: AppState, action: AppAction) => {
  switch (action.type) {
    case 'increment':
      return {
        ...state,
        score: state.score + 1
      }
    case 'decrement':
      return {
        ...state,
        score: state.score - 1
      }
    case 'reset':
      return {
        ...state,
        score: 0
      }
  }
}

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [appState, appDispatch] = useReducer(AppReducer, initialState);

  function increaseScore() {
    appDispatch({ type: 'increment' });
  }

  function decreaseScore() {
    appDispatch({ type: 'decrement' });
  }

  function resetScore() {
    appDispatch({ type: 'reset' });
  }

  const ctx = useMemo(() => ({
    appState,
    appDispatch,
    increaseScore,
    decreaseScore,
    resetScore,
  }), [appState]);

  return (
    <AppContext.Provider value={ctx}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext);
};
