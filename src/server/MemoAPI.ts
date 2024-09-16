import axios, {AxiosError, AxiosResponse} from 'axios';
import {Base} from "@/server/Base.ts";

class MemoAPIClient extends Base {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    super();
    this.baseUrl = baseUrl;
  }

  async search(payload: object): Promise<AxiosResponse> {

    try {
      return await axios.post(`${this.baseUrl}/memos/memos.php`, payload, this.getConfigWithAuthToken());
    } catch (error: unknown) {
      return (error as AxiosError).response as AxiosResponse;
    }
  }

  async upsert(payload: object): Promise<AxiosResponse> {
    try {
      return await axios.post(`${this.baseUrl}/memos/upsert.php`, payload, this.getConfigWithAuthToken());
    } catch (error: unknown) {
      return (error as AxiosError).response as AxiosResponse;
    }
  }
}

export default MemoAPIClient;
