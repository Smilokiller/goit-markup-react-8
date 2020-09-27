import { createSelector } from "@reduxjs/toolkit";

export const getContacts = (state) => state.contacts.items;
export const getFilter = (state) => state.contacts.filter;
export const getUserUid = (state) => state.user.uid;
export const getUserNickname = (state) => state.user.nickname;

export const getFilteredContcats = createSelector(
  [getContacts, getFilter],
  (contacts, filter) => {
    return filter
      ? contacts.filter((el) =>
          el.name.toLowerCase().includes(filter.toLowerCase())
        )
      : contacts;
  }
);
