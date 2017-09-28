let state = {};

const PERSIST_KEY = '_ionic-chat';

// Load any persisted state data, use that as the 
// seed for the in-memory state
const load = () => {
  const existing = window.localStorage.getItem(PERSIST_KEY);
  try {
    state = JSON.parse(existing) || {};
    console.log('Loaded persisted state', state);
  } catch(e) {
    console.error('Unable to load state form localStorage');
  }
}

load();

const setState = (o) => { state = { ...state, ...o } }
const getState = () => state;
const persist = (o) => {
  const existing = window.localStorage.getItem(PERSIST_KEY);
  try {
    const obj = JSON.parse(existing);
    window.localStorage.setItem(PERSIST_KEY, JSON.stringify({ ...obj, ...o }));
    // Also set this in in-memory state
    setState({ ...o });
  } catch(e) {
    console.error('Unable to updating existing local settings. Clearing.');
    window.localStorage.setItem(PERSIST_KEY, JSON.stringify({ ...o }));
  }
}

export { setState, getState, persist };