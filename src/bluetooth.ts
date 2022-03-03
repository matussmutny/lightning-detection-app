import {
  BT_CHARACTERISTIC,
  BT_LISTENER_TYPE,
  BT_LISTENER_TYPE_SERVER,
  BT_OPTIONS,
  BT_SERVICE,
  LOADING_STATUS
} from './constants'
import { useState } from 'react'

interface State {
  value: string
  isLoading: boolean
  loadingStatus: string
  error: Error | undefined
}

const initialState = {
  value: '',
  isLoading: false,
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
  updateState: (updatedState: Partial<State>) => void
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
    console.log(event)
    updateState({ value: readData(event) })
    characteristic?.removeEventListener(BT_LISTENER_TYPE, () => null)
  })
}

// function to connect bluetooth device
export const requestAndConnectDevice = async (
  updateState: (updatedState: Partial<State>) => void
) => {
  try {
    console.log('requesting device...')

    const device = await navigator.bluetooth.requestDevice(BT_OPTIONS)
    device.addEventListener(BT_LISTENER_TYPE_SERVER, async () => {
      console.log('disconnected, reconnecting...')
      updateState({ isLoading: true, loadingStatus: RECONNECTING })
      await connectDevice(device, updateState)
      updateState({ isLoading: false, loadingStatus: DONE })
    })
    updateState({ isLoading: true, loadingStatus: CONNECTING })
    await connectDevice(device, updateState)
    updateState({ isLoading: false, loadingStatus: DONE })
  } catch (e) {
    const error = e as Error
    updateState({ error })
  }
}

export const useBluetooth = () => {
  const [state, setState] = useState(initialState)

  const updateState = (updatedState: Partial<State>) => {
    setState((prevState: State) => ({ ...prevState, ...updatedState }))
  }

  const onClick = () => {
    void requestAndConnectDevice(updateState)
  }

  const reset = () => {
    setState(initialState)
  }

  return {
    ...state,
    onClick,
    reset
  }
}
