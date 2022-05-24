import { useLocalStorage } from 'usehooks-ts'
import { DATA_MAX_LIMIT, DATA_STORAGE_KEY, UserLocation } from './constants'
import { useState } from 'react'

const displayNotification = (distance: number) => {
  if (Notification.permission === 'granted') {
    navigator.serviceWorker.getRegistration().then(function (reg) {
      reg?.showNotification('New Activity detected', {
        body: `New lightning activity was detected ${distance}km away.`,
        icon: 'logo192.png',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1
        }
      })
    })
  }
}

export type LightningData = {
  distance: number
  time: Date
  position: [number, number]
}

export const useLightningDataStorage = () => {
  const [data, setData] = useLocalStorage<LightningData[]>(DATA_STORAGE_KEY, [])
  const [dataAdded, setDataAdded] = useState(0)

  const addData = async (value: string | number) => {
    const parsedValue = typeof value === 'string' ? parseInt(value) : value
    const geolocation = navigator.geolocation
    console.log('parsedvalue', parsedValue)
    if (parsedValue <= 40 && parsedValue >= 1 && geolocation) {
      geolocation.getCurrentPosition((pos) => {
        const position = [pos.coords.latitude, pos.coords.longitude] as UserLocation
        setDataAdded((prevState) => prevState + 1)
        setData((prevValue) => {
          if (prevValue.length > DATA_MAX_LIMIT) {
            prevValue.shift()
          }
          return [
            ...prevValue,
            { distance: parsedValue, time: new Date(), position } as LightningData
          ]
        })
        displayNotification(parsedValue)
      })
    }
  }

  return { data, addData, dataAdded }
}
