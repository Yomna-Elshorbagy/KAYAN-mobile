import {
  createSlice,
  createAsyncThunk,
  UnknownAction,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  getAllUsersAPI,
  getDemographicsAPI,
  getProfileAPI,
  getUsersOverviewAPI,
  resetPasswordAPI,
  softDeleteUserAPI,
  updateProfileAPI,
} from "../../Apis/UserApis";
import { ApiResponse, User, UsersOverview } from "../../Interfaces/Iuser";

// ================= STATE =================
interface UserState {
  profile: User | null;
  users: User[];
  overview: UsersOverview | null;
  demographics: any;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  users: [],
  overview: null,
  demographics: null,
  isLoading: false,
  error: null,
};

// ================= THUNKS =================
export const getProfileThunk = createAsyncThunk<
  ApiResponse<User>,
  void,
  { rejectValue: string }
>("user/getProfile", async (_, thunkAPI) => {
  try {
    return await getProfileAPI();
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed");
  }
});

export const updateProfileThunk = createAsyncThunk<
  ApiResponse<User>,
  FormData,
  { rejectValue: string }
>("user/updateProfile", async (formData, thunkAPI) => {
  try {
    return await updateProfileAPI(formData);
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed");
  }
});

export const resetPasswordThunk = createAsyncThunk<
  ApiResponse<null>,
  { oldPassword: string; newPassword: string; Cpassword: string },
  { rejectValue: string }
>("user/resetPassword", async (payload, thunkAPI) => {
  try {
    return await resetPasswordAPI(payload);
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed");
  }
});

export const softDeleteUserThunk = createAsyncThunk<
  ApiResponse<User>,
  void,
  { rejectValue: string }
>("user/softDelete", async (_, thunkAPI) => {
  try {
    return await softDeleteUserAPI();
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed");
  }
});

// ===== Admin =====
export const getAllUsersThunk = createAsyncThunk<
  ApiResponse<User[]>,
  any,
  { rejectValue: string }
>("user/getAllUsers", async (params, thunkAPI) => {
  try {
    return await getAllUsersAPI(params);
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed");
  }
});

export const getUsersOverviewThunk = createAsyncThunk<
  ApiResponse<UsersOverview>,
  void,
  { rejectValue: string }
>("user/overview", async (_, thunkAPI) => {
  try {
    return await getUsersOverviewAPI();
  } catch {
    return thunkAPI.rejectWithValue("Failed");
  }
});

export const getDemographicsThunk = createAsyncThunk<
  ApiResponse<any>,
  void,
  { rejectValue: string }
>("user/demographics", async (_, thunkAPI) => {
  try {
    return await getDemographicsAPI();
  } catch {
    return thunkAPI.rejectWithValue("Failed");
  }
});

// ================= SLICE =================
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserState: (state) => {
      state.profile = null;
      state.users = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // ===== Specific =====
      .addCase(getProfileThunk.fulfilled, (state, action) => {
        state.profile = action.payload.data;
      })
      .addCase(updateProfileThunk.fulfilled, (state, action) => {
        // When profile is updated (including avatar upload), replace local profile with returned data
        state.profile = action.payload.data;
      })
      .addCase(getAllUsersThunk.fulfilled, (state, action) => {
        state.users = action.payload.data;
      })
      .addCase(getUsersOverviewThunk.fulfilled, (state, action) => {
        state.overview = action.payload.data;
      })
      .addCase(getDemographicsThunk.fulfilled, (state, action) => {
        state.demographics = action.payload.data;
      })
      // ===== Generic Loading (Matchers last) =====
      .addMatcher(
        (action: UnknownAction) =>
          typeof action.type === "string" &&
          action.type.startsWith("user/") &&
          action.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action: UnknownAction) =>
          typeof action.type === "string" &&
          action.type.startsWith("user/") &&
          action.type.endsWith("/fulfilled"),
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        (action: UnknownAction) =>
          typeof action.type === "string" &&
          action.type.startsWith("user/") &&
          action.type.endsWith("/rejected"),
        (state, action: any) => {
          state.isLoading = false;
          state.error = action.payload ?? "Something went wrong";
        }
      );
  },
});

export const { clearUserState } = userSlice.actions;
export default userSlice.reducer;
