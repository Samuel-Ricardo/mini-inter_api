


export const error = {
  USER_NOT_FOUND: 'User not found',
  USER_ALREADY_EXISTS: "There is already a registered user with this email",
  PIX: { ...pix_error }
}

export const success = {

  PIX: {...pix_success}
}

const messages = {
  ERROR: { ...error },
  SUCCESS: {...success}
};

export default messages;


