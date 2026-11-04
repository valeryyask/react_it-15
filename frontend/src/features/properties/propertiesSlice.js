import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loadProperties, saveProperties, resetPropertiesStorage } from '../../data/mockProperties';

export const fetchProperties = createAsyncThunk('properties/fetch', async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(loadProperties());
    }, 800); 
  });
});

const propertiesSlice = createSlice({
  name: 'properties',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    addProperty: (state, action) => {
      const newProperty = action.payload;
      state.items.unshift(newProperty);
      saveProperties(state.items);
    },
    updateProperty: (state, action) => {
      const { id, data } = action.payload;
      state.items = state.items.map((p) => (p.id === id ? { ...p, ...data } : p));
      saveProperties(state.items);
    },
    deleteProperty: (state, action) => {
      state.items = state.items.filter((p) => p.id !== action.payload);
      saveProperties(state.items);
    },
    resetProperties: (state) => {
      state.items = resetPropertiesStorage();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProperties.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to load properties';
      });
  },
});

export const { addProperty, updateProperty, deleteProperty, resetProperties } = propertiesSlice.actions;
export default propertiesSlice.reducer;
