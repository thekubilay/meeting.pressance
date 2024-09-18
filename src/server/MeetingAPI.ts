import axios, {AxiosError, AxiosResponse} from 'axios';
import {Base} from "@/server/Base.ts";

class MeetingAPIClient extends Base {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    super();
    this.baseUrl = baseUrl;
  }

  async search_times(): Promise<AxiosResponse> {

    try {
      return await axios.get(`${this.baseUrl}/meetings/times.php`, this.getConfigWithAuthToken());
    } catch (error: unknown) {
      return (error as AxiosError).response as AxiosResponse;
    }
  }

  async search_contents(payload: Object): Promise<AxiosResponse> {

    try {
      return await axios.post(`${this.baseUrl}/meetings/contents.php`, payload, this.getConfigWithAuthToken());
    } catch (error: unknown) {
      return (error as AxiosError).response as AxiosResponse;
    }
  }


  async insert_meeting(payload:object): Promise<AxiosResponse> {

    try {
      return await axios.post(`${this.baseUrl}/meetings/insert_check.php`, payload, this.getConfigWithAuthToken());
    } catch (error: unknown) {
      return (error as AxiosError).response as AxiosResponse;
    }
  }

  async update_meeting(payload: Object): Promise<AxiosResponse> {

    try {
      return await axios.post(`${this.baseUrl}/meetings/update.php`, payload, this.getConfigWithAuthToken());
    } catch (error: unknown) {
      return (error as AxiosError).response as AxiosResponse;
    }
  }

  async delete_meeting(payload: Object): Promise<AxiosResponse> {

    try {
      return await axios.post(`${this.baseUrl}/meetings/delete.php`, payload, this.getConfigWithAuthToken());
    } catch (error: unknown) {
      return (error as AxiosError).response as AxiosResponse;
    }
  }


}

export default MeetingAPIClient;
