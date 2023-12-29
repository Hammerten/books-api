export interface IPasswordService {
  compare(rawPassword: string, encryptedPassword: string): Promise<boolean>;
  hash(password: string, saltLength: number): Promise<string>;
}
