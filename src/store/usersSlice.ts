import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RawUser, User } from "../types";

interface UsersState {
  list: User[];
}

// Initially the list is empty since no users are fetched yet
const initialState: UsersState = { list: [] };

// createSlice automatically generates action creators and a reducer
const usersSlice = createSlice({
  name: "users",
  initialState,

  // All the actions that can be performed on this slice
  reducers: {

    // Accepts the RawUser data and add liked flag in it
    setUsers(state, action: PayloadAction<RawUser[]>) {
      state.list = action.payload.map((u) => ({ ...u, liked: false }));
    },

    // Toggle the liked flag of the user selected
    likeUser(state, action: PayloadAction<number>) {
      const u = state.list.find((x) => x.id === action.payload);
      if (u) u.liked = !u.liked;
    },

    // Filters out the specific user
    removeUser(state, action: PayloadAction<number>) {
      state.list = state.list.filter((x) => x.id !== action.payload);
    },

    // Accepts the id and other fields to update then if the user is found, merge the new values with the old ones 
    editUser(
      state,
      action: PayloadAction<{ id: number } & Partial<Omit<User, "id">>>
    ) {
      const idx = state.list.findIndex((x) => x.id === action.payload.id);
      if (idx !== -1) {
        state.list[idx] = { ...state.list[idx], ...action.payload };
      }
    },
  },
});

export const { setUsers, likeUser, removeUser, editUser } = usersSlice.actions;
export default usersSlice.reducer;
