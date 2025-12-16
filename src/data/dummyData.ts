export const dailyCallVolume = [
  { day: 'Mon', calls: 120 },
  { day: 'Tue', calls: 150 },
  { day: 'Wed', calls: 180 },
  { day: 'Thu', calls: 140 },
  { day: 'Fri', calls: 200 },
  { day: 'Sat', calls: 80 },
  { day: 'Sun', calls: 60 },
]

export const callDuration = [
  { time: '0-1m', count: 45 },
  { time: '1-3m', count: 120 },
  { time: '3-5m', count: 85 },
  { time: '5-10m', count: 50 },
  { time: '10m+', count: 20 },
]

export const callOutcome = [
  { name: 'Successful', value: 720, color: '#22c55e' },
  { name: 'Failed', value: 80, color: '#ef4444' },
  { name: 'No Answer', value: 130, color: '#f59e0b' },
]

export const hourlyDistribution = [
  { hour: '9AM', calls: 25 },
  { hour: '10AM', calls: 45 },
  { hour: '11AM', calls: 60 },
  { hour: '12PM', calls: 40 },
  { hour: '1PM', calls: 35 },
  { hour: '2PM', calls: 55 },
  { hour: '3PM', calls: 70 },
  { hour: '4PM', calls: 65 },
  { hour: '5PM', calls: 50 },
  { hour: '6PM', calls: 30 },
]

export const DEFAULT_CALL_VOLUME = [120, 150, 180, 140, 200, 80, 60]
