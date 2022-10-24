import React from 'react';

const SearchComponent = () => { 
  return (
    <div className="page_contents">
      <h2 className="pageTitle">
        점검 접수 검색하기
      </h2>
      <div className="project_request_page">
        <ul className="request_form_ul">
          <li>
            <dl className="request_form_dl">
              <dt>진행 단계</dt>
              <dd>
                <select className="form_select">
                  <option>전체보기</option>
                  <option>점검요청</option>
                  <option>점검진단중</option>
                  <option>진단완료</option>
                </select>
              </dd>
            </dl>
          </li>
          <li>
            <dl className="request_form_dl">
              <dt>점검 요청자</dt>
              <dd>
                <p className="request_form_input_area">
                  <span>
                    <input
                      className="form_input form_search_input"
                      type="text"
                      placeholder="점검 요청자를 입력해주세요."
                    />
                  </span>
                  <button                    
                    className="employee_search_btn"
                  >
                    검색하기
                  </button>
                </p>
              </dd>
            </dl>
          </li>
          <li>
            <dl className="request_form_dl">
              <dt>점검자</dt>
              <dd>
                <p className="request_form_input_area">
                  <span>
                    <input
                      className="form_input form_search_input"
                      type="text"
                      placeholder="점검자를 입력해주세요."
                    />
                  </span>
                  <button className="employee_search_btn">
                    검색하기
                  </button>
                </p>
              </dd>
            </dl>
          </li>
          <li>
            <dl className="request_form_dl">
              <dt>시스템명</dt>
              <dd>
                <input
                  className="form_input"
                  type="text"
                  placeholder="시스템명을 입력해주세요."
                />
              </dd>
            </dl>
          </li>
          <li>
            <dl className="request_form_dl">
              <dt>프로젝트명</dt>
              <dd>
                <input
                  className="form_input"
                  type="text"
                  placeholder="프로젝트명을 입력해주세요."
                />
              </dd>
            </dl>
          </li>
          <li>
            <dl className="request_form_dl">
              <dt>구분</dt>
              <dd>
                <select className="form_select">
                  <option>신규</option>
                  <option>유지보수</option>
                </select>
              </dd>
            </dl>
          </li>
          <li>
            <dl className="request_form_dl">
              <dt>이행점검 여부</dt>
              <dd>
                <select className="form_select">
                  <option>1차 이행</option>
                  <option>2차 이행</option>
                  <option>3차 이행</option>
                  <option>4차 이행</option>
                  <option>5차 이행</option>
                  <option>조치완료</option>
                </select>
              </dd>
            </dl>
          </li>
        </ul>
        <p className="search_btn_area">
          <button className="search_btn">
            검색하기
          </button>
        </p>
      </div>
    </div>
  );
};

export default SearchComponent;
