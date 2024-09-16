import axios, {AxiosError, AxiosResponse} from 'axios';
import {Base} from "@/server/Base.ts";

class SettingAPIClient extends Base {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    super();
    this.baseUrl = baseUrl;
  }

  async search(): Promise<AxiosResponse> {
    try {
      return await axios.get(`${this.baseUrl}/settings/search.php`, this.getConfigWithAuthToken());
    } catch (error: unknown) {
      return (error as AxiosError).response as AxiosResponse;
    }
  }

}

export default SettingAPIClient;
