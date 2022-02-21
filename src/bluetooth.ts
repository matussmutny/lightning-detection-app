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
            optionalServices: [0xFFE0] // Required to access service later.
        })

        // Human-readable name of the device and its id.
        console.log({name: device.name, id: device.id})

        // Attempts to connect to remote GATT Server.
        const server = await device?.gatt?.connect()
        const service = await server?.getPrimaryService(0xFFE0)
        const characteristic = await service?.getCharacteristic(0xFFE1)
        await characteristic?.startNotifications()
        characteristic?.addEventListener('characteristicvaluechanged', (event) => {
            console.log(event)
            readData(event)
            characteristic?.removeEventListener('characteristicvaluechanged',() => null)
        })

        console.log(characteristic)
    } catch (err) {
        console.error(err)
    }
}