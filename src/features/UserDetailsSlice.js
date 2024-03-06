import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//create action
export const createUser = createAsyncThunk(
  "createUser",
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      "https://65e08334d3db23f762497b1e.mockapi.io/crud",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//read action
export const showUser = createAsyncThunk(
  "showUser",
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      "https://65e08334d3db23f762497b1e.mockapi.io/crud"
    );
    try {
      const result = await response.json();
      console.log("result", result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
//Delete Action
export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (id, { rejectWithValue }) => {
    const response = await fetch(
      `https://65e08334d3db23f762497b1e.mockapi.io/crud/${id}`,
      { method: "DELETE" }
    );
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//update User
export const updateUser = createAsyncThunk(
  "updateUser",
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      `https://65e08334d3db23f762497b1e.mockapi.io/crud/${data.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const userDetail = createSlice({
  name: "userDetail",
  initialState: {
    users: [],
    loading: false,
    errors: null,
    searchUser: [],
  },
  reducers: {
    searchUser: (state, action) => {
      state.searchUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users = [...state.users, action.payload]; //while adding data we need to preserve previous data too
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.errors = action.payload;
    });
    builder.addCase(showUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(showUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload; //what al data present in store we need to add here
    });
    builder.addCase(showUser.rejected, (state, action) => {
      state.errors = action.payload;
    });
    builder.addCase(deleteUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false;
      console.log("actionpayload", action.payload);
      const { id } = action.payload;
      if (id) {
        state.users = state.users.filter((elm) => elm.id !== id); //what al data present in store we need to add here
      }
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.errors = action.payload;
    });
    builder.addCase(updateUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users = state.users.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.errors = action.payload;
    });
  },
});

export default userDetail.reducer;

export const { searchUser } = userDetail.actions;
