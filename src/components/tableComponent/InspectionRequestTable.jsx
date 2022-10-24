import React, {
  useEffect,
  useState,
} from 'react';
import InspectionService from '../../service/InspectionService';
import { Link } from 'react-router-dom';
import SearchComponent from '../inspectionRequestComponent/SearchComponent';

const InspectionRequestTable = () => {
  const [inspection, setInspection] = useState(
    []
  ); 

  useEffect(() => {
    InspectionService.getAllInspection()
      .then((response) => {
        setInspection(response.data);        
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  

  return (
    <div className="page_list_contents">
      <SearchComponent />
      <div className="list_table_wrap">
        <div className="list_table_header">
          <h2 className="listTitle">
            점검 리스트
          </h2>
          <div className="list_table_header_btn">
            <Link className="guide_btn" to="">
              이용안내
            </Link>
            <Link
              className="request_add_btn"
              to="/request"
            >
              점검 요청하기
            </Link>
          </div>
        </div>
        <table className="list_table">
          <thead>
            <tr>
              <th>점검 Code</th>
              <th>시스템명</th>
              <th>프로젝트명</th>
              <th>구분</th>
              <th>점검 요청자</th>
              <th>점검자</th>
              <th>점검 요청일</th>
              <th>점검 기간</th>
              <th>이행점검 여부</th>
              <th>진행단계</th>
            </tr>
          </thead>
          <tbody>
            {inspection.map((item) => (
              <tr key={item.id}>
                <td> {item.id} </td>
                <td> {item.systemName} </td>
                <td>
                  <Link
                    to={`/request/view/${item.id}`}
                  >
                    {item.projectName}
                  </Link>
                </td>
                <td> {item.type} </td>
                <td>
                  {item.inspectionRequester}
                </td>
                <td>
                  {item.checker != null ? (
                    <div>아아</div>
                  ) : (
                    <div>
                      <span className="checker_null">
                        배정중
                      </span>
                    </div>
                  )}
                </td>
                <td> {item.toDayDateState} </td>
                <td> {item.openDate} </td>
                <td>
                  {item.implementation != null ? (
                    <div>아아</div>
                  ) : (
                    <div>
                      <span className="checker_null">
                        확인중
                      </span>
                    </div>
                  )}
                </td>
                <td>
                  {item.stepInProgress != null ? (
                    <div>아아</div>
                  ) : (
                    <div>
                      <span className="request_check_btn">
                        점검요청
                      </span>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InspectionRequestTable;
