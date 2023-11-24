import {configureStore, createAsyncThunk} from '@reduxjs/toolkit';
import React from 'react';
import { createSlice } from '@reduxjs/toolkit';
import { uploadFile as uploadFileApi, getTerms as getTermsApi, getTranscription as getTranscriptionApi } from "../api";
import {pullState} from "../logic";

const getTerms = async (id) => {
  await pullState(id, 'terms');

  return await getTermsApi(id);
}

const getTranscription = async (id) => {
  await pullState(id, 'transcription');

  return await getTranscriptionApi(id);
}

const getSummary = async (id) => {
  await pullState(id, 'summary');

  return "await getTranscriptionApi(id)";
}

const summary = {
  isTranscriptionLoading: false,
  isTermsLoading: false,
  isSummaryLoading: false,
  terms: [],
  transcription: '',
  summary: ''
}

const initialState = {
  loading: false,
  file: null,
  summary
};

const uploadFile = createAsyncThunk(
  'main/uploadFile',
  async (file) => {
    return await uploadFileApi(file)
  }
);

const loadTerms = createAsyncThunk(
  'main/loadTerms',
  async (id) => {
    return await getTerms(id)
  }
);

const loadTranscription = createAsyncThunk(
  'main/loadTranscription',
  async (id) => {
    return await getTranscription(id)
  }
);

const loadSummary = createAsyncThunk(
  'main/loadSummary',
  async (id) => {
    return await getSummary(id)
  }
);


export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(uploadFile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadTerms.pending, (state) => {
      state.summary.isTermsLoading = true;
    });
    builder.addCase(loadTranscription.pending, (state) => {
      state.summary.isTranscriptionLoading = true;
    });
    builder.addCase(loadSummary.pending, (state) => {
      state.summary.isSummaryLoading = true;
    });

    builder.addCase(uploadFile.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(loadTerms.fulfilled, (state, action) => {
      state.summary = {
        ...state.summary,
        isTermsLoading: false,
        terms: action.payload
      }
    });
    builder.addCase(loadSummary.fulfilled, (state, action) => {
      state.summary = {
        ...state.summary,
        isSummaryLoading: false,
        summary: action.payload
      }
    });
    builder.addCase(loadTranscription.fulfilled, (state, action) => {
      console.log(action.payload, 'here');
      state.summary = {
        ...state.summary,
        isTranscriptionLoading: false,
        transcription: action.payload
      }
    });
  }
})

// const {
//   setDate,
//   setEvent
// } = mainSlice.actions;

export {
  uploadFile,
  loadTerms,
  loadTranscription,
  loadSummary
};

export default configureStore({
  reducer: {
    main: mainSlice.reducer,
  }
});