import {encode, decode} from 'js-base64'

export const encodeKey = (userID: string, value: number, registerID: string) => {

  const stage1 = encode(userID);
  const stage2 = encode(value.toString());
  const stage3 = encode(registerID);

  return `${stage1}-${stage2}-${stage3}`
}


export const decodeKey = (key: string) => {
  const keyDecode = key.split('-');

  const userID = decode(keyDecode[0]);
  const value = decode(keyDecode[1]);
  const registerID = decode(keyDecode[2]);

  return {
    userID,
    value,
    registerID
  }
}
