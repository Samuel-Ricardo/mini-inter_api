import {encode, decode} from 'js-base64'

export const encodeKey = (userID: string, value: number, registerID: string) => {

  const stage1 = encode(userID);
  const stage2 = encode(value.toString());
  const stage3 = encode(registerID);

  return `${stage1}-${stage2}-${stage3}`
}

