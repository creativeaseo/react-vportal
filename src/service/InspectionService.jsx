import axios from 'axios';

const INSPECTION_BASE_REST_API_URL = 'https://7e44-14-4-86-86.jp.ngrok.io/api/v1/inspection';

const headers = {
  'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'Accept': '*/*'
}

class InspectionService {

  getAllInspection() {
    return axios.get(INSPECTION_BASE_REST_API_URL)
  }

  createInspectionRequest(inspectionRequest) {
    return axios.post(INSPECTION_BASE_REST_API_URL, inspectionRequest)
  }

  getAllInspectionById(inspectionRequestId) {
    return axios.get(INSPECTION_BASE_REST_API_URL+'/'+inspectionRequestId);
  }



}

export default new InspectionService();