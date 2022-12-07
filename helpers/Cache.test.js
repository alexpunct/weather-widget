import { expect, jest } from '@jest/globals'
import { LocalStorage } from './Cache'

jest.useFakeTimers()

const setMockLocalStorage = () => {
  let store = {}
  return {
    getItem: (key) => store[key],
    removeItem: (key) => delete store[key],
    setItem: (key, value) => (store[key] = value),
    clear: () => (store = {}),
  }
}

beforeEach(() => {
  global.localStorage = setMockLocalStorage()
})

afterEach(() => {
  global.localStorage.clear()
})

test('set() should store the data in localStorage with a timestamp', () => {
  LocalStorage.set('test', 'test-data')
  expect(JSON.parse(localStorage.getItem('test')).data).toBe('test-data')
})

test('get() should return the cached data if it is still valid', () => {
  LocalStorage.set('test', 'test-data')
  expect(LocalStorage.get('test', 30000)).toBe('test-data')
})

test('get() should return null if the data has expired', () => {
  LocalStorage.set('test', 'test-data')
  // Fast-forward 1 minute (60000 ms)
  jest.advanceTimersByTime(60000)
  expect(LocalStorage.get('test', 30000)).toBe(null)
})
