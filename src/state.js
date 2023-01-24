let localState = {};

export function getState(key) {
  if (key in localState) {
    return Promise.resolve(localState[key]);
  }

  return get(key).then((x) => {
    localState[key] = x;
    return x;
  });
}

export function setState(key, value) {
  localState[key] = value;
  //   set();
  return set(key, value);
}
