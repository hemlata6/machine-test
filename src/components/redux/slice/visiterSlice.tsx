import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { getVisiterList } from '../../api/visiterApi';


export const fetchVisitors = createAsyncThunk<
  Visitor[],
  void,
  { rejectValue: string }
>(
  'visitor/fetchVisitors',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getVisiterList();
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.message || 'Failed to fetch visitors'
      );
    }
  }
);

interface Visitor {
  id: number;
  name: string;
  phone: string;
  unit: string;
  visitDate: string;
  status: string;
}

interface VisiterState {
  visiters: Visitor[];
  error: string | null;
  loading: boolean;
}

const initialState: VisiterState = {
  visiters: [],
  error: null,
  loading: false,
};



export const visiterSlice = createSlice({
  name: 'visiter',
  initialState,
  reducers: {
    visiterList: (state, action) => {
      state.visiters = action.payload;
    },
    addVisitor: (state, action: PayloadAction<Visitor>) => {
      state.visiters.push(action.payload);
    },
    deleteVisiter: (state, action: PayloadAction<number>) => {
      const index = state.visiters.findIndex(
        (visitor) => visitor.id === action.payload
      );
      if (index !== -1) {
        state.visiters.splice(index, 1);
      }
    },
    editVisiter: (state, action: PayloadAction<Visitor>) => {
      const index = state.visiters.findIndex(
        (visitor) => visitor.id === action.payload.id
      );
      if (index !== -1) {
        state.visiters[index] = action.payload;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVisitors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVisitors.fulfilled, (state, action: PayloadAction<Visitor[]>) => {
        state.loading = false;
        state.error = null;
        state.visiters = action.payload;
      })
      .addCase(fetchVisitors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ||
          "Something went wrong";
      });
  },
});

export const { visiterList, addVisitor, deleteVisiter, editVisiter } = visiterSlice.actions;
export default visiterSlice.reducer;
