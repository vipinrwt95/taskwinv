import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

export interface AuthState {
  token: string | null;
}


const rootReducer = combineReducers({
  auth: authReducer,
  
});


export type RootState = ReturnType<typeof rootReducer>;


const store = configureStore({
  reducer: rootReducer,
});

export default store;
