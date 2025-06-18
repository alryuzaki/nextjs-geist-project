import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SubscriptionState {
  plan: string;
  goldBalance: number;
  queuePosition?: number | null;
}

const initialState: SubscriptionState = {
  plan: 'Free',
  goldBalance: 0,
  queuePosition: null,
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    setPlan(state, action: PayloadAction<string>) {
      state.plan = action.payload;
    },
    setGoldBalance(state, action: PayloadAction<number>) {
      state.goldBalance = action.payload;
    },
    setQueuePosition(state, action: PayloadAction<number | null>) {
      state.queuePosition = action.payload;
    },
  },
});

export const { setPlan, setGoldBalance, setQueuePosition } = subscriptionSlice.actions;

export const store = configureStore({
  reducer: {
    subscription: subscriptionSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
