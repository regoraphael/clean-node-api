export class Authentication {
  auth: (email: string, password: string) => Promise<string>
}
