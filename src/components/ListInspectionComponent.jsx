import React from 'react';
import InspectionRequestTable from './tableComponent/InspectionRequestTable';

const ListInspectionComponent = () => {
  return (
    <div className="container">
      <div className="page_wrap">
        {/* 점검 요청 테이블 */}
        <InspectionRequestTable />
      </div>
    </div>
  );
};

export default ListInspectionComponent;
