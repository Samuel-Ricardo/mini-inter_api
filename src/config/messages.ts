export const pix_error = {
  RECEIVE_PIX_FROM_SAME_USER: 'It is not possible to receive the PIX from the same user',

  INSUFFICIENT_FUNDS: 'There is not enough balance to make the payment',

  CLIENT_NOT_FOUND: "We didn't find the transaction's customers, generate a new key",

  INVALID_KEY: "Invalid key, please generate a new key"
}

export const pix_success = {
  PAYMENT_SUCCESSFULLY: "Payment made successfully",
}

export const pix_messages = {
  ERROR: { ...pix_error },
  SUCCESS: {...pix_success}
}

export const user_error = {
  USER_NOT_FOUND: 'User not found',
  USER_ALREADY_EXISTS: "There is already a registered user with this email",
}

export const user_success = {};

export const user_messages = {
  ERROR: { ...user_error },
  SUCCESS: {...user_success}
}

export const error = {
  USER: {...user_messages.ERROR},
  PIX: { ...pix_messages.ERROR }
}

export const success = {

  PIX: {...pix_messages.SUCCESS}
}

const messages = {
  ERROR: { ...error },
  SUCCESS: {...success}
};

export default messages;


