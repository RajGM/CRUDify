import { atom } from 'jotai';

export const userAtom = atom(null); // Initially no user is logged in
export const tokenAtom = atom(null); // Initially no token
export const isLoggedInAtom = atom((get) => !!get(userAtom) && !!get(tokenAtom)); // Derive login status
