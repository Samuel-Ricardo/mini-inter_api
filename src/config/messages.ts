
export const pix = {
  RECEIVE_PIX_FROM_SAME_USER: 'It is not possible to receive the PIX from the same user'
}

export const error = {
  USER_NOT_FOUND: 'User not found',
  USER_ALREADY_EXISTS: "There is already a registered user with this email",
  PIX: { ...pix }
}

const messages = {
  ERROR: { ...error },

};

export default messages;


