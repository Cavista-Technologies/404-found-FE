import type { UserRole } from "@/config/menuConfig";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface RoleState {
  activeRole: UserRole;
}

const initialState: RoleState = {
  activeRole: (localStorage.getItem("activeRole") as UserRole) || "employee",
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<UserRole>) => {
      state.activeRole = action.payload;
      localStorage.setItem("activeRole", action.payload); 
    },
    resetRole: (state) => {
      state.activeRole = "Recruiter";
      localStorage.removeItem("activeRole");
    },
  },
});

export const { setRole, resetRole } = roleSlice.actions;
export default roleSlice.reducer;
