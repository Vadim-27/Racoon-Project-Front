import { axiosInstance } from '@/axios';
import { BaseApiController } from '@/api/BaseApiController';

class UsersApiController {
  constructor(ApiController) {
    this.baseApiClient = ApiController;
  }

  async getMyUser() {
    const path = '/auth/users/me/';
    return this.baseApiClient.makeRequest('GET', path);
  }

  async changeUserProfile(formData) {
    const path = '/auth/users/me/';
    return this.baseApiClient.makeRequest(
      'PATCH',
      path,
      formData,
      { headers: {'Content-Type': 'multipart/form-data'} },
    );
  }

  async updateUserAvatar(formData) {
    const path = '/auth/users/me/';
    return this.baseApiClient.makeRequest(
      'PATCH',
      path,
      formData,
      { headers: {'Content-Type': 'multipart/form-data'} },
    );
  }

  async changeUserPassword(formData) {
    const path = '/auth/users/set_password/';
    return this.baseApiClient.makeRequest('POST', path, formData);
  }

  async deleteMyUser(formData) {
    const path = '/auth/users/me/';
    return this.baseApiClient.makeRequest('DELETE', path, formData);
  }

  async getUserProfile(id) {
    const path = `auth/users/${id}/`;
    return this.baseApiClient.makeRequest('GET', path);
  }

  async getUserList(page) {
    const params = new URLSearchParams();
    params.append('page', page);

    const path = `api/v1/users/?${params.toString()}`;
    return this.baseApiClient.makeRequest('GET', path);
  }
}

const usersApiController = new BaseApiController(axiosInstance);
export const usersApi = new UsersApiController(usersApiController);
