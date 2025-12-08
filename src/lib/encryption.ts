import Crytpr from "cryptr";

const cryptr = new Crytpr(process.env.ENCRYPTION_KEY!)

export const encrypt = (text: string) => cryptr.encrypt(text);
export const decrypt = (text: string) => cryptr.decrypt(text);