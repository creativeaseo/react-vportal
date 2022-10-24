import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import ListInspectionComponent from './components/ListInspectionComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import InspectionRequest from './components/InspectionRequest';
import InspectionRequestView from './components/InspectionRequestView';
import Test from './Test';

const App = () => {
  return (
    <div className="App">
      <HeaderComponent />
      <Routes>
        {/* 메인 */}
        <Route
          path="/"
          element={<ListInspectionComponent />}
        ></Route>

        
        {/* 점검 요청 리스트 페이지 */}
        <Route
          path="/index"
          element={<ListInspectionComponent />}
        ></Route>

        {/* 점검 요청하기 페이지 */}
        <Route
          path="/request"
          element={<InspectionRequest />}
        ></Route>

        {/* 점검 요청 상세 페이지 */}
        <Route
          path="/request/view/:id"
          element={<InspectionRequestView />}
        ></Route>

        {/* 테스트 */}
        <Route
          path="/test"
          element={<Test />}
        ></Route>
      </Routes>
      <FooterComponent />
    </div>
  );
};

export default App;
