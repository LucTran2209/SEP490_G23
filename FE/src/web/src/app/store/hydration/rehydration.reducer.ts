import { ActionReducer, INIT, UPDATE } from '@ngrx/store';
import { PRESISTED_STATE } from '../../configs/feature_key.config';

const STATE_KEY = 'appState';
const PERSISTED_KEYS = PRESISTED_STATE;

function loadStateFromStorage(): Partial<any> {
  const loadedState: any = {};
  PERSISTED_KEYS.forEach((key) => {
    const savedSlice = localStorage.getItem(key);
    if (savedSlice) {
      try {
        loadedState[key] = JSON.parse(savedSlice);
      } catch (error) {
        console.error(`Error parsing ${key} from localStorage`, error);
      }
    }
  });
  return loadedState;
}

export function rehydrationMetaReducer<State>(
  reducer: ActionReducer<State>
): ActionReducer<State> {
  return (state, action) => {
    if (action.type === INIT || action.type === UPDATE) {
      const loadedState = loadStateFromStorage();
      state = { ...state, ...loadedState } as State;
    }

    const nextState = reducer(state, action);

    PERSISTED_KEYS.forEach((key) => {
      if (nextState?.hasOwnProperty(key)) {
        localStorage.setItem(
          key,
          JSON.stringify((nextState as Record<string, any>)[key])
        );
      }
    });

    return nextState;
  };
}
