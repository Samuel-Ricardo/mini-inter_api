
export const status = {
  OPEN: 'open',
  CLOSE: 'close'
}

export const types = {
  RECEIVED: 'received',
  PAID: 'paid'
}

const pix = {
  STATUS: { ...status },
  TYPES: {...types}
}

export default pix;
