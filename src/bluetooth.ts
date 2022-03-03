import { BT_CHARACTERISTIC, BT_LISTENER_TYPE, BT_SERVICE } from './constants'

const readData = (event: Event) => {
  // @ts-ignore
  const valueString = new TextDecoder().decode(event?.target?.value)
  console.log(valueString)
}

// function to connect bluetooth device
export const requestDevice = async () => {
  try {
    const device = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
      optionalServices: [BT_SERVICE] // Required to access service later.
    })

    // Human-readable name of the device and its id.
    console.log({ name: device.name, id: device.id })

    // Attempts to connect to remote GATT Server.
    const server = await device?.gatt?.connect()
    const service = await server?.getPrimaryService(BT_SERVICE)
    const characteristic = await service?.getCharacteristic(BT_CHARACTERISTIC)
    await characteristic?.startNotifications()
    characteristic?.addEventListener(BT_LISTENER_TYPE, (event) => {
      console.log(event)
      readData(event)
      characteristic?.removeEventListener(BT_LISTENER_TYPE, () => null)
    })

    console.log(characteristic)
  } catch (err) {
    console.error(err)
  }
}
