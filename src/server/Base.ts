export class Base {
  public getConfigWithAuthToken(): Record<string, any> {
    const token: string = "cHJlajpYNHRhTGRy";
    return {headers: {Authorization: `Basic ${token}`}};
  }
}