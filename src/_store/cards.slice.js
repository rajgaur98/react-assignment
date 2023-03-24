import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchWrapper } from "_helpers";

// create slice

const name = "cards";
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, extraReducers });

// exports

export const cardActions = { ...slice.actions, ...extraActions };
export const cardsReducer = slice.reducer;

// implementation

function createInitialState() {
  return {
    cards: {},
  };
}

function createExtraActions() {
  const cardId = "641de58fa9aebc001d0c955c";
  const baseUrl = `${process.env.REACT_APP_API_URL}/cards`;

  return {
    get: get(),
    create: create(),
  };

  function get() {
    return createAsyncThunk(
      `${name}/get`,
      async () => await fetchWrapper.get(`${baseUrl}/${cardId}`)
    );
  }
  function create() {
    return createAsyncThunk(
      `${name}/create`,
      async (cardDetails) => await fetchWrapper.post(baseUrl, cardDetails)
    );
  }
}

function createExtraReducers() {
  return {
    ...get(),
    ...create(),
  };

  function get() {
    var { pending, fulfilled, rejected } = extraActions.get;
    return {
      [pending]: (state) => {
        state.cards = { loading: true };
      },
      [fulfilled]: (state, action) => {
        state.cards = action.payload;
      },
      [rejected]: (state, action) => {
        state.cards = { error: action.error };
      },
    };
  }

  function create() {
    var { pending, fulfilled, rejected } = extraActions.create;
    return {
      [pending]: (state) => {
        state.cards = { loading: true };
      },
      [fulfilled]: (state, action) => {
        state.cards = action.payload;
      },
      [rejected]: (state, action) => {
        state.cards = { error: action.error };
      },
    };
  }
}
