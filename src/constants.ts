// bluetooth constants
export const BT_DEVICE_NAME = 'BT05'
export const BT_SERVICE = 0xffe0
export const BT_CHARACTERISTIC = 0xffe1
export const BT_LISTENER_TYPE = 'characteristicvaluechanged'
export const BT_LISTENER_TYPE_SERVER = 'gattserverdisconnected'

export const BT_OPTIONS = { filters: [{ services: [BT_SERVICE], name: BT_DEVICE_NAME }] }

export const LOADING_STATUS = {
  CONNECTING: 'connecting',
  RECONNECTING: 'reconnecting',
  DONE: 'done'
}
