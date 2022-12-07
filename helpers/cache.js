export const setData = (key, data) => {
    // if the object isn't in localstorage or has expired,
    // store the current version in localstorage with a timestamp
    localStorage.setItem(key, JSON.stringify({
      timestamp: Date.now(),
      data
    }));
  };

export const getData = (key, expiration=30000) => {
  // check if the object is already in localstorage
  if (localStorage.getItem(key)) {
    // if it is, retrieve it and parse it into a JavaScript object
    var cachedObject = JSON.parse(localStorage.getItem(key));
    // check if it's still valid (i.e. hasn't expired yet)
    if (cachedObject.timestamp + expiration > Date.now()) {
      // if it's still valid, return the cached object
      return cachedObject.data;
    }
    // if it has expired, remove it from localstorage
    localStorage.removeItem(key);
  }
  // return null to indicate that there is no cached version available
  return null;
}

export default {
  getData,
  setData
}
