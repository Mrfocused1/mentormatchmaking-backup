// Helper functions for localStorage-based stats management

const getStoredStat = (key: string, defaultValue: number): number => {
  if (typeof window === 'undefined') return defaultValue
  const stored = localStorage.getItem(key)
  return stored ? parseInt(stored, 10) : defaultValue
}

const setStoredStat = (key: string, value: number): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, value.toString())
  }
}

export const incrementActiveMentors = () => {
  const current = getStoredStat('activeMentors', 20)
  const newValue = current + 1
  setStoredStat('activeMentors', newValue)
  return newValue
}

export const incrementSuccessfulMatches = () => {
  const current = getStoredStat('successfulMatches', 15)
  const newValue = current + 1
  setStoredStat('successfulMatches', newValue)
  return newValue
}

export const getActiveMentors = () => {
  return getStoredStat('activeMentors', 20)
}

export const getSuccessfulMatches = () => {
  return getStoredStat('successfulMatches', 15)
}
