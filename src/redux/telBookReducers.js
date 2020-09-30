import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contacts: {
    items: [],
    filter: "",
  },
  user: {
    email: "",
    nickname: "",
    uid: "",
  },
};

export const telBookReducers = createSlice({
  name: "@contacts",
  initialState: initialState,
  reducers: {
    getContacts: (state, { type, payload }) => ({
      ...state,
      contacts: {
        ...state.contacts,
        items: payload,
      },
    }),
    addContacts: (state, { type, payload }) => ({
      ...state,
      contacts: {
        ...state.contacts,
        items: [...state.contacts.items, payload],
      },
    }),
    deleteContacts: (state, { type, payload }) => ({
      ...state,
      contacts: {
        ...state.contacts,
        items: state.contacts.items.filter((el) => el.id !== payload),
      },
    }),
    filterContacts: (state, { type, payload }) => ({
      ...state,
      contacts: {
        ...state.contacts,
        filter: payload,
      },
    }),
    addRequest: (state) => ({
      ...state,
      loading: true,
    }),
    addSuccess: (state) => ({
      ...state,
      loading: false,
      error: null,
    }),
    addError: (state, { type, payload }) => ({
      ...state,
      loading: false,
      error: payload,
    }),
    getUsers: (state, { type, payload }) => ({
      ...state,
      user: {
        ...payload,
      },
    }),
    logOut: (state, { type, payload }) => ({
      ...initialState,
    }),
  },
});
