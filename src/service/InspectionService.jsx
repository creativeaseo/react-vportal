import axios from 'axios';

const INSPECTION_BASE_REST_API_URL = 'http://localhost:8080/api/v1/inspection';

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