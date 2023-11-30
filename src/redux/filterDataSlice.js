import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

export const filter = createAsyncThunk("filter/list", async () => {
  const data = await filterAPI.getList();

  localStorage.setItem("filter", JSON.stringify(data));

  return data;
});

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    filterlist: JSON.parse(localStorage.getItem("filter")) || [{}],
  },
  reducers: {},
  extraReducers: {
    [filter.fulfilled]: (state, action) => {
      state.filterlist = action.payload;
    },
  },
});

const {reducer} = filterSlice;
export default reducer;
