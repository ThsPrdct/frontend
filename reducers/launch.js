import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { content: null, author: null },
};

export const userSlice = createSlice({
  name: "launch",
  initialState,
  reducers: {
    launch: (state, action) => {
      state.value.token = action.payload.token;
      state.value.username = action.payload.username;
    },
  },
});

export const { launch } = userSlice.actions;
export default userSlice.reducer;
