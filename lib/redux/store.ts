import { configureStore, type ThunkAction, type Action, combineReducers } from '@reduxjs/toolkit'
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  type TypedUseSelectorHook,
} from 'react-redux'


// for persisting imports
import { persistReducer, persistStore } from 'redux-persist';


/* Instruments */
import { reducer } from './rootReducer'
import { middleware } from './middleware'
import storage from './storage'

const persistConfig = {
  key: 'primary',
  storage,
  whitelist: ['counter', 'shop'],
};

const persistedReducer = persistReducer(persistConfig, combineReducers(reducer));

export const reduxStore = configureStore({
  // reducer,
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(middleware)
  },
})
export const useDispatch = () => useReduxDispatch<ReduxDispatch>()
export const useSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector

/* Types */
export type ReduxStore = typeof reduxStore
export type ReduxState = ReturnType<typeof reduxStore.getState>
export type ReduxDispatch = typeof reduxStore.dispatch
export type ReduxThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  Action
>

