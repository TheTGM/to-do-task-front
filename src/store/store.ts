import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './reducers/session.reducer';
import taskReducer from './reducers/task.reducer';

const store = configureStore({
  reducer: {
    session: sessionReducer,
    task: taskReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
