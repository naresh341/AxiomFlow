import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  TableData: {},
};

const TableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setTableData: (state, action) => {
      const { schemakey, data } = action.payload;
      state.TableData[schemakey] = data;
    },
  },
});

export const { setTableData } = TableSlice.actions;

export default TableSlice.reducer;
