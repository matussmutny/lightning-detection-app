import { useState } from 'react'
import { UserLocation } from './constants'

export const useLocation = () => {
  const [location, setLocation] = useState<UserLocation | undefined>(undefined)
  const geolocation = navigator.geolocation

  const getLocation = async () => {
    setLocation(undefined)
    if (geolocation) {
      await geolocation.getCurrentPosition((pos) => {
        console.log(pos.coords)
        setLocation([pos.coords.latitude, pos.coords.longitude])
      })
    }
  }

  return { location, getLocation }
}
