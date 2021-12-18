export const error = {
  USER_NOT_FOUND: 'User not found',
    USER_ALREADY_EXISTS: "There is already a registered user with this email"
}

export const pix = {
  status: {
    OPEN: 'open'
  }
}

const messages = {
  ERROR: { ...error },
  PIX: {...pix}
};

export default messages;


