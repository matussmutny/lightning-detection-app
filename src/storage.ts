import { useLocalStorage } from 'usehooks-ts'

export type LightningData = {
  distance: number
  time: Date
}

export const useStorage = () => {
  const [data, setData] = useLocalStorage<LightningData[]>('lightning-data', [])

  const addData = (value: string | number) => {
    const parsedValue = typeof value === 'string' ? parseInt(value) : value
    if (parsedValue) {
      setData((prevValue) => {
        if (prevValue.length > 10) {
          prevValue.shift()
        }
        return [...prevValue, { distance: parsedValue, time: new Date() }]
      })
    }
  }

  return { data, addData }
}
