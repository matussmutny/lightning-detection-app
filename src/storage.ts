import { useLocalStorage } from 'usehooks-ts'
import { DATA_MAX_LIMIT, DATA_STORAGE_KEY, PAGE, PAGE_STORAGE_KEY } from './constants'

export type LightningData = {
  distance: number
  time: Date
}

export const useLightningDataStorage = () => {
  const [data, setData] = useLocalStorage<LightningData[]>(DATA_STORAGE_KEY, [])

  const addData = (value: string | number) => {
    const parsedValue = typeof value === 'string' ? parseInt(value) : value
    if (parsedValue) {
      setData((prevValue) => {
        if (prevValue.length > DATA_MAX_LIMIT) {
          prevValue.shift()
        }
        return [...prevValue, { distance: parsedValue, time: new Date() }]
      })
    }
  }

  return { data, addData }
}

type Page = PAGE

export const usePageStorage = () => {
  const [page, setPage] = useLocalStorage<Page>(PAGE_STORAGE_KEY, PAGE.HOME)

  const updatePage = (value: Page) => {
    setPage(value)
  }

  return { page, updatePage }
}
