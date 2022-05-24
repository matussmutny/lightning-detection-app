import {
  BT_CHARACTERISTIC,
  BT_LISTENER_TYPE,
  BT_LISTENER_TYPE_SERVER,
  BT_OPTIONS,
  BT_SERVICE,
  LOADING_STATUS
} from './constants'
import { useState } from 'react'
import { useLightningDataStorage } from './storage'

interface State {
  value: string
  isLoading: boolean
  isConnected: boolean
  loadingStatus: string
  error: Error | undefined
}

const initialState = {
  value: '',
  isLoading: false,
  isConnected: false,
  loadingStatus: '',
  error: undefined
} as State

const { CONNECTING, RECONNECTING, DONE } = LOADING_STATUS

const readData = (event: Event) => {
  // @ts-ignore
  const valueString = new TextDecoder().decode(event?.target?.value)
  return valueString.replace('\n', '')
}

const connectDevice = async (
  device: BluetoothDevice,
  updateState: (updatedState: Partial<State>) => void,
  addData: (value: number | string) => void
) => {
  console.log('connecting to GATT server...')
  const server = await device.gatt?.connect()
  console.log('retrieving service...')
  const service = await server?.getPrimaryService(BT_SERVICE)
  console.log('retrieving characteristic...')
  const characteristic = await service?.getCharacteristic(BT_CHARACTERISTIC)
  console.log('starting notifications...')
  await characteristic?.startNotifications()
  characteristic?.addEventListener(BT_LISTENER_TYPE, (event) => {
    const value = readData(event)
    console.log({ value: readData(event) })
    updateState({ value })
    addData(value)
    characteristic?.removeEventListener(BT_LISTENER_TYPE, () => null)
  })
}

// function to connect bluetooth device
export const requestAndConnectDevice = async (
  updateState: (updatedState: Partial<State>) => void,
  addData: (value: number | string) => void
) => {
  try {
    console.log('requesting device...')
    let device = await navigator.bluetooth.requestDevice(BT_OPTIONS)
    device.addEventListener(BT_LISTENER_TYPE_SERVER, async (event) => {
      console.log('disconnected, reconnecting...')
      device = event.target as BluetoothDevice
      updateState({ isLoading: true, isConnected: false, loadingStatus: RECONNECTING })
      await connectDevice(device, updateState, addData)
      updateState({ isLoading: false, isConnected: true, loadingStatus: DONE })
      device?.removeEventListener(BT_LISTENER_TYPE_SERVER, () => null)
    })
    updateState({ isLoading: true, isConnected: false, loadingStatus: CONNECTING })
    await connectDevice(device, updateState, addData)
    updateState({ isLoading: false, isConnected: true, loadingStatus: DONE })
  } catch (e) {
    const error = e as Error
    updateState({ ...initialState, error })
  }
}

export interface BluetoothReturn extends State {
  onClick: () => void
  reset: () => void
}

export const useBluetooth = (): BluetoothReturn => {
  const [state, setState] = useState(initialState)
  const { addData } = useLightningDataStorage()

  const updateState = (updatedState: Partial<State>) => {
    setState((prevState: State) => ({ ...prevState, ...updatedState }))
  }

  const reset = () => {
    setState(initialState)
  }

  const onClick = () => {
    void requestAndConnectDevice(updateState, addData)
  }

  return {
    ...state,
    onClick,
    reset
  }
}
