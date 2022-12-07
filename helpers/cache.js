export class LocalStorage {
  static set(key, data) {
    // If the object isn't in localstorage or has expired,
    // Store the current version in localstorage with a timestamp
    localStorage.setItem(
      key,
      JSON.stringify({
        timestamp: Date.now(),
        data,
      })
    )
  }

  static get(key, expiration = 30000) {
    // Check if the object is already in localstorage
    if (localStorage.getItem(key)) {
      // If it is, retrieve it and parse it into a JavaScript object
      var cachedObject = JSON.parse(localStorage.getItem(key))
      // Check if it's still valid (i.e. hasn't expired yet)
      if (cachedObject.timestamp + expiration > Date.now()) {
        // If it's still valid, return the cached object
        return cachedObject.data
      }
      // If it has expired, remove it from localstorage
      localStorage.removeItem(key)
    }
    // Return null to indicate that there is no cached version available
    return null
  }
}

export default {
  LocalStorage,
}
