import { useState } from 'react'
import { useInterval } from 'usehooks-ts'
import { MINUTE } from '../constants'

export const useRefresh = () => {
  const [, setCounter] = useState(0)
  useInterval(() => setCounter((prevState) => prevState + 1), MINUTE)
}
