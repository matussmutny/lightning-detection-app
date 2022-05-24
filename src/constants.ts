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

export const DATA_MAX_LIMIT = 1000
export const DATA_STORAGE_KEY = 'lightning-data'

export const PAGE_STORAGE_KEY = 'app-page'

export enum PAGE {
  HOME = 'home',
  HISTORY = 'history',
  GRAPHS = 'charts',
  MAP = 'map'
}

export type Page = PAGE

export type UserLocation = [number, number]
export const MAP_OFFSET = 0.5
export const LAT_LONG_KM = 0.009

export const TODAY = new Date()

export const BG_COLOR = '#111'
export const NAVBAR_COLOR = '#222'
export const LIGHT_GRAY_COLOR = '#aaa'
export const WHITE_COLOR = '#eee'

export const MINUTE = 60000

export const REFUSE_TO_CHOOSE_DEVICE = 'User cancelled the requestDevice() chooser.'
