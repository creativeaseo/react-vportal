import React, {
  useEffect,
  useState,
} from 'react';
import {
  useParams,
  useNavigate,
} from 'react-router-dom';
import InspectionService from '../service/InspectionService';

const InspectionRequestView = () => {
  const [inspection, setInspection] = useState(
    []
  );

  const { id } = useParams();
  const navigate = useNavigate();

  // 연계 시스템
  const [
    linkSystemArray,
    setLinkSystemArray,
  ] = useState([]);

  // 시스템 네트워트 위치
  const [
    systemNetworkArray,
    setSystemNetworkArray,
  ] = useState([]);

  // 서비스 유형
  const [
    serviceTypeViewArray,
    setServiceTypeViewArray,
  ] = useState([]);

  // 서비스 접근 유형 및 위치(대외)
  const [
    serviceInsideArray,
    setServiceInsideViewArray,
  ] = useState([]);

  // 서비스 접근 유형 및 위치(사내)
  const [
    serviceCompanyArray,
    setServiceCompanyArray,
  ] = useState([]);

  // 개발환경
  const [
    developEnviromentArray,
    setDevelopEnviromentArray,
  ] = useState([]);

  // SSO 적용 여부
  const [
    ssoUseViewArray,
    setSsoUseArray,
  ] = useState([]);

  // VPN 권한 여부
  const [
    vpnAuthViewArray,
    setVpnAuthArray,
  ] = useState([]);

  // 시큐어 코딩 적용 여부
  const [
    secureCodeViewArray,
    setSecureCodeArray,
  ] = useState([]);

  // 개인정보 보유 현황
  const [
    personInfoViewArray,
    setPersonInfoViewArray,
  ] = useState([]);

  // 고유 식별 및 민감정보 취급여부
  const [
    uniqueIdenViewArray,
    setUniqueIdenViewArray,
  ] = useState([]);

  // DB 암호화 여부
  const [
    dbEncryptionViewArray,
    setDbEncryptionViewArray,
  ] = useState([]);

  // 서비스 URL
  const [
    serviceURLViewArray,
    setServiceURLViewArray,
  ] = useState([]);

  useEffect(() => {
    InspectionService.getAllInspectionById(id)
      .then((response) => {
        setInspection(response.data);
        const linkSystemString =
          response.data.linkSystem;
        const linkSystemArray = JSON.parse(
          linkSystemString
        );
        const systemNetworkString =
          response.data.systemNetwork;
        const systemNetworkStringArray = JSON.parse(
          systemNetworkString
        );
        const serviceTypeString =
          response.data.serviceType;
        const serviceTypeArray = JSON.parse(
          serviceTypeString
        );
        const serviceInsideString =
          response.data.serviceInside;
        const serviceInsideArray = JSON.parse(
          serviceInsideString
        );
        const serviceCompanyString =
          response.data.serviceCompany;
        const serviceComapnyArray = JSON.parse(
          serviceCompanyString
        );
        const ssoUseString = response.data.ssoUse;
        const ssoUseArray = JSON.parse(
          ssoUseString
        );
        const developEnviromentString =
          response.data.developEnviroment;
        const developEnviromentArray = JSON.parse(
          developEnviromentString
        );
        const vpnAuthString =
          response.data.vpnAuth;
        const vpnAuthArray = JSON.parse(
          vpnAuthString
        );
        const secureString =
          response.data.secureCode;
        const secureArray = JSON.parse(
          secureString
        );
        const personInfoString =
          response.data.personInfoData;
        const personInfoArray = JSON.parse(
          personInfoString
        );
        const uniqueIdenString =
          response.data.uniqueIden;
        const uniqueIdenArray = JSON.parse(
          uniqueIdenString
        );
        const dbEncryptionString =
          response.data.dbEncryption;
        const dbEncryptionArray = JSON.parse(
          dbEncryptionString
        );
        const serviceULRString =
          response.data.serviceURL;
        const serviceULArray = JSON.parse(
          serviceULRString
        );
        setLinkSystemArray(linkSystemArray);
        setSystemNetworkArray(
          systemNetworkStringArray
        );
        setServiceTypeViewArray(serviceTypeArray);
        setServiceInsideViewArray(
          serviceInsideArray
        );
        setServiceCompanyArray(
          serviceComapnyArray
        );
        setDevelopEnviromentArray(
          developEnviromentArray
        );
        setSsoUseArray(ssoUseArray);
        setVpnAuthArray(vpnAuthArray);
        setSecureCodeArray(secureArray);
        setPersonInfoViewArray(personInfoArray);
        setUniqueIdenViewArray(uniqueIdenArray);
        setDbEncryptionViewArray(
          dbEncryptionArray
        );
        setServiceURLViewArray(serviceULArray);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      <div className="page_wrap">
        <div>
          <div className="page_contents">
            <h2 className="pageTitle">
              점검 접수 신청하기
            </h2>
            <div className="project_request_page">
              <ul className="request_form_ul">
                <li>
                  <dl className="request_form_dl">
                    <dt>시스템명</dt>
                    <dd>
                      <p className="request_font_dataTxt">
                        {inspection.systemName}
                      </p>
                    </dd>
                  </dl>
                </li>
                <li>
                  <dl className="request_form_dl">
                    <dt>프로젝트</dt>
                    <dd>
                      <p className="request_font_dataTxt">
                        {inspection.projectName}
                      </p>
                    </dd>
                  </dl>
                </li>
                <li>
                  <dl className="request_form_dl">
                    <dt>점검 요청일</dt>
                    <dd>
                      <p className="request_font_dataTxt">
                        {
                          inspection.toDayDateState
                        }
                      </p>
                    </dd>
                  </dl>
                </li>
                <li className="request_form_expansion_area">
                  <dl className="request_form_dl request_form_expansion_dl">
                    <dt>업무영역</dt>
                    <dd>
                      <div className="request_form_work_area">
                        <div className="request_form_work_type">
                          <span className="work_type_title">
                            · 대분류
                          </span>
                          <p className="request_font_dataTxt admin_request_dataText">
                            {
                              inspection.workAreaLarge
                            }
                          </p>
                        </div>
                        <div className="request_form_work_type">
                          <span className="work_type_title">
                            · 중분류
                          </span>
                          <p className="request_font_dataTxt admin_request_dataText">
                            {
                              inspection.workAreaMediumn
                            }
                          </p>
                        </div>
                        <div className="request_form_work_type">
                          <span className="work_type_title">
                            · 소분류
                          </span>
                          <p className="request_font_dataTxt admin_request_dataText">
                            {
                              inspection.workAreaSmall
                            }
                          </p>
                        </div>
                      </div>
                    </dd>
                  </dl>
                </li>
                <li>
                  <dl className="request_form_dl">
                    <dt>협업주관부서</dt>
                    <dd>
                      <p className="request_font_dataTxt">
                        {inspection.cooperation}
                      </p>
                    </dd>
                  </dl>
                </li>
                <li>
                  <dl className="request_form_dl">
                    <dt>점검 요청자</dt>
                    <dd>
                      <p className="request_font_dataTxt">
                        {
                          inspection.inspectionRequester
                        }
                      </p>
                    </dd>
                  </dl>
                </li>
                <li>
                  <dl className="request_form_dl">
                    <dt>구축 PM</dt>
                    <dd>
                      <p className="request_font_dataTxt">
                        {inspection.builderPM}
                      </p>
                    </dd>
                  </dl>
                </li>
                <li>
                  <dl className="request_form_dl">
                    <dt>현업 PM</dt>
                    <dd>
                      <p className="request_font_dataTxt">
                        {inspection.businessPM}
                      </p>
                    </dd>
                  </dl>
                </li>
                <li>
                  <dl className="request_form_dl">
                    <dt>SM담당자</dt>
                    <dd>
                      <p className="request_font_dataTxt">
                        {inspection.smManager}
                      </p>
                    </dd>
                  </dl>
                </li>
                <li>
                  <dl className="request_form_dl">
                    <dt>오픈예정일</dt>
                    <dd>
                      <p className="request_font_dataTxt">
                        {inspection.openDate}
                      </p>
                    </dd>
                  </dl>
                </li>
                <li>
                  <dl className="request_form_dl">
                    <dt>개발형태</dt>
                    <dd>
                      <p className="request_font_dataTxt">
                        {inspection.type}
                      </p>
                    </dd>
                  </dl>
                </li>
                <li className="flex_align_center">
                  <dl className="request_form_dl">
                    <dt>변경내용</dt>
                    <dd>
                      <p className="request_font_dataTxt">
                        {inspection.updateContent}
                      </p>
                    </dd>
                  </dl>
                </li>
                <li className="flex_align_center">
                  <dl className="request_form_dl">
                    <dt>
                      시스템 용도
                      <br /> 및 설명
                    </dt>
                    <dd>
                      <p className="request_font_dataTxt">
                        {
                          inspection.systemExplanation
                        }
                      </p>
                    </dd>
                  </dl>
                </li>
                <li>
                  <dl className="request_form_dl">
                    <dt>서비스 URL</dt>
                    <dd>
                      <div className="request_form_url_area">
                        <div>
                          <ul>
                            {serviceURLViewArray.map(
                              (item, index) => (
                                <li
                                  class="serviceURL_item_li"
                                  key={index}
                                >
                                  <span className="serviceURL_item">
                                    {item}
                                  </span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </dd>
                  </dl>
                </li>
              </ul>
            </div>
          </div>
          <div className="page_list_contents">
            <h2 className="pageTitle">
              비지니스 영향도
            </h2>
            <div className="project_request_page">
              <ul className="request_form_ul">
                <li className="request_form_expansion_area02">
                  <dl className="request_form_dl">
                    <dt className="service_access">
                      시스템중요도
                    </dt>
                    <dd>
                      <p className="request_font_dataTxt">
                        {
                          inspection.systemCriticality
                        }
                      </p>
                    </dd>
                  </dl>
                </li>
                <li className="request_form_expansion_area02">
                  <dl className="request_form_dl">
                    <dt className="service_access">
                      연계시스템
                    </dt>
                    <dd>
                      <p className="admin_select_text">
                        <p className="admin_select_text"></p>
                        {linkSystemArray.map(
                          (item, index) => (
                            <span key={index}>
                              {item}
                            </span>
                          )
                        )}
                      </p>
                    </dd>
                  </dl>
                </li>
                <li className="request_form_expansion_area02">
                  <dl className="request_form_dl">
                    <dt className="service_access">
                      시스템 네트워크 위치
                    </dt>
                    <dd>
                      <p className="admin_select_text">
                        {systemNetworkArray.map(
                          (item, index) => (
                            <span key={index}>
                              {item}
                            </span>
                          )
                        )}
                      </p>
                    </dd>
                  </dl>
                </li>
              </ul>
            </div>
          </div>
          <div className="page_list_contents">
            <h2 className="pageTitle">
              구축 및 개발 환경
            </h2>
            <div className="project_request_page">
              <ul className="request_form_ul">
                <li className="request_form_expansion_area02">
                  <dl className="request_form_dl">
                    <dt className="service_access">
                      서비스 유형
                    </dt>
                    <dd>
                      <p className="admin_select_text">
                        {serviceTypeViewArray.map(
                          (item, index) => (
                            <span key={index}>
                              {item}
                            </span>
                          )
                        )}
                      </p>
                    </dd>
                  </dl>
                </li>
                <li className="request_form_expansion_area02">
                  <dl className="request_form_dl">
                    <dt className="service_access">
                      서비스 접근 유형 및 위치
                    </dt>
                    <dd>
                      <div className="custom_checkbox_area">
                        <span className="service_access_subArea">
                          · 대외
                        </span>
                        <p className="admin_select_text">
                          {serviceInsideArray.map(
                            (item, index) => (
                              <span key={index}>
                                {item}
                              </span>
                            )
                          )}
                        </p>
                      </div>
                    </dd>
                  </dl>
                </li>
                <li className="request_form_expansion_area02">
                  <dl className="request_form_dl">
                    <dt className="service_access">
                      서비스 접근 유형 및 위치
                    </dt>
                    <dd>
                      <div className="custom_checkbox_area">
                        <span className="service_access_subArea">
                          · 사내
                        </span>
                        <p className="admin_select_text">
                          {serviceCompanyArray.map(
                            (item, index) => (
                              <span key={index}>
                                {item}
                              </span>
                            )
                          )}
                        </p>
                      </div>
                    </dd>
                  </dl>
                </li>
                <li className="request_form_expansion_area02">
                  <dl className="request_form_dl">
                    <dt className="service_access">
                      개발환경
                    </dt>
                    <dd>
                      <p className="admin_select_text">
                        {developEnviromentArray.map(
                          (item, index) => (
                            <span key={index}>
                              {item}
                            </span>
                          )
                        )}
                      </p>
                    </dd>
                  </dl>
                </li>
                <li className="request_form_expansion_area">
                  <dl className="request_form_dl">
                    <dt className="manage_infra">
                      운영 인프라
                    </dt>
                    <dd>
                      <div className="request_form_work_area">
                        <div className="request_form_work_type">
                          <span className="service_access_subArea_midume">
                            · 서버
                          </span>
                          <p className="admin_select_text">
                            <span>
                              {
                                inspection.operatInpraServer
                              }
                            </span>
                          </p>
                        </div>
                        <div className="request_form_work_type">
                          <span className="service_access_subArea_large">
                            · WAS
                          </span>
                          <p className="admin_select_text">
                            <span>
                              {
                                inspection.operatInpraWAS
                              }
                            </span>
                          </p>
                        </div>
                        <div className="request_form_work_type">
                          <span className="service_access_subArea_small">
                            · DB
                          </span>
                          <p className="admin_select_text">
                            <span>
                              {
                                inspection.operatInpraDB
                              }
                            </span>
                          </p>
                        </div>
                      </div>
                    </dd>
                  </dl>
                </li>
                <li className="request_form_expansion_area">
                  <dl className="request_form_dl request_form_expansion_dl">
                    <dt className="manage_infra">
                      개발 인프라
                    </dt>
                    <dd>
                      <div className="request_form_work_area">
                        <div className="request_form_work_type">
                          <span className="service_access_subArea_midume">
                            · 서버
                          </span>
                          <p className="admin_select_text">
                            <span>
                              {
                                inspection.developInpraServer
                              }
                            </span>
                          </p>
                        </div>
                        <div className="request_form_work_type">
                          <span className="service_access_subArea_large">
                            · WAS
                          </span>
                          <p className="admin_select_text">
                            <span>
                              {
                                inspection.developInpraWAS
                              }
                            </span>
                          </p>
                        </div>
                        <div className="request_form_work_type">
                          <span className="service_access_subArea_small">
                            · DB
                          </span>
                          <p className="admin_select_text">
                            <span>
                              {
                                inspection.developInpraDB
                              }
                            </span>
                          </p>
                        </div>
                      </div>
                    </dd>
                  </dl>
                </li>
                <li className="request_form_expansion_area02">
                  <dl className="request_form_dl">
                    <dt className="service_access">
                      SSO 적용 여부
                    </dt>
                    <dd>
                      <div className="custom_checkbox_area">
                        <p className="admin_select_text">
                          {ssoUseViewArray.map(
                            (item, index) => (
                              <span key={index}>
                                {item}
                              </span>
                            )
                          )}
                        </p>
                      </div>
                    </dd>
                  </dl>
                </li>
                <li className="request_form_expansion_area02">
                  <dl className="request_form_dl">
                    <dt className="service_access">
                      VPN 권한 여부
                    </dt>
                    <dd>
                      <p className="admin_select_text">
                        {vpnAuthViewArray.map(
                          (item, index) => (
                            <span key={index}>
                              {item}
                            </span>
                          )
                        )}
                      </p>
                    </dd>
                  </dl>
                </li>
                <li className="request_form_expansion_area02">
                  <dl className="request_form_dl">
                    <dt className="service_access">
                      시큐어 코딩 적용 여부
                    </dt>
                    <dd>
                      <p className="admin_select_text">
                        {secureCodeViewArray.map(
                          (item, index) => (
                            <span key={index}>
                              {item}
                            </span>
                          )
                        )}
                      </p>
                    </dd>
                  </dl>
                </li>
              </ul>
            </div>
          </div>
          <div className="page_list_contents">
            <h2 className="pageTitle">
              점검 대상 정보
            </h2>
            <div className="project_request_page">
              <ul className="request_form_ul">
                <li>
                  <dl className="request_form_dl">
                    <dt className="admin_manage">
                      운영 URL
                    </dt>
                    <dd>
                      <p className="request_font_dataTxt">
                        {inspection.operateURL}
                      </p>
                    </dd>
                  </dl>
                </li>
                <li>
                  <dl className="request_form_dl">
                    <dt>운영 IP</dt>
                    <dd>
                      <p className="request_font_dataTxt">
                        {inspection.operateIP}
                      </p>
                    </dd>
                  </dl>
                </li>
                <li>
                  <dl className="request_form_dl">
                    <dt>개발 URL</dt>
                    <dd>
                      <p className="request_font_dataTxt">
                        {inspection.developURL}
                      </p>
                    </dd>
                  </dl>
                </li>
                <li>
                  <dl className="request_form_dl">
                    <dt className="admin_manage">
                      개발 IP
                    </dt>
                    <dd>
                      <p className="request_font_dataTxt">
                        {inspection.developIP}
                      </p>
                    </dd>
                  </dl>
                </li>
                <li className="request_form_expansion_area">
                  <dl className="request_form_dl request_form_expansion_dl">
                    <dt className="admin_manage">
                      관리자 페이지
                    </dt>
                    <dd className="admin_sso_apply_dd">
                      <p className="request_font_dataTxt">
                        {inspection.adminPage}
                      </p>
                      {/* <p className="admin_select_text">
                        <span className="admin_sso_apply_span">
                          SSO 권한 분리 적용
                        </span>
                      </p> */}
                    </dd>
                  </dl>
                </li>
                <li className="request_form_expansion_area">
                  <dl className="request_form_dl">
                    <dt className="check_account">
                      점검용 계정
                    </dt>
                    <dd>
                      <div className="request_form_work_area">
                        <div className="request_form_work_type check_info_form_type">
                          <span className="check_admin">
                            · 관리자
                          </span>
                          <p className="request_font_dataTxt">
                            {
                              inspection.inspectionAccount
                            }
                          </p>
                        </div>
                        <div className="request_form_work_type check_info_form_type">
                          <span className="check_check_password">
                            · 비밀번호
                          </span>
                          <p className="request_font_dataTxt">
                            {
                              inspection.inspectionAccountPw
                            }
                          </p>
                        </div>
                      </div>
                    </dd>
                  </dl>
                </li>
                <li className="request_form_expansion_area">
                  <dl className="request_form_dl">
                    <dt className="check_account">
                      점검용 계정
                    </dt>
                    <dd>
                      <div className="request_form_work_area">
                        <div className="request_form_work_type check_info_form_type">
                          <span className="check_admin">
                            · 사용자1
                          </span>
                          <p className="request_font_dataTxt">
                            {
                              inspection.inspectionUser01
                            }
                          </p>
                        </div>
                        <div className="request_form_work_type check_info_form_type">
                          <span className="check_check_password">
                            · 비밀번호
                          </span>
                          <p className="request_font_dataTxt">
                            {
                              inspection.inspectionUser01Pw
                            }
                          </p>
                        </div>
                      </div>
                    </dd>
                  </dl>
                </li>
                <li className="request_form_expansion_area">
                  <dl className="request_form_dl">
                    <dt className="check_account">
                      점검용 계정
                    </dt>
                    <dd>
                      <div className="request_form_work_area">
                        <div className="request_form_work_type check_info_form_type">
                          <span className="check_admin">
                            · 사용자2
                          </span>
                          <p className="request_font_dataTxt">
                            {
                              inspection.inspectionUser02
                            }
                          </p>
                        </div>
                        <div className="request_form_work_type check_info_form_type">
                          <span className="check_check_password">
                            · 비밀번호
                          </span>
                          <p className="request_font_dataTxt">
                            {
                              inspection.inspectionUser02Pw
                            }
                          </p>
                        </div>
                      </div>
                    </dd>
                  </dl>
                </li>
              </ul>
            </div>
          </div>
          <div className="page_list_contents">
            <h2 className="pageTitle">
              상세 정보
            </h2>
            <div className="project_request_page">
              <ul className="request_form_ul">
                <li className="request_form_expansion_area02">
                  <dl className="request_form_dl">
                    <dt className="policy_usage">
                      사용자 권한 정의
                    </dt>
                    <dd>
                      <p className="request_font_dataTxt">
                        사용자 권한정의 파일.doc
                      </p>
                    </dd>
                  </dl>
                </li>
                <li className="request_form_expansion_area02">
                  <dl className="request_form_dl">
                    <dt className="policy_usage">
                      화면설계서
                    </dt>
                    <dd>
                      <p className="request_font_dataTxt">
                        사용자 권한정의 파일.doc
                      </p>
                    </dd>
                  </dl>
                </li>
                <li className="request_form_expansion_area02">
                  <dl className="request_form_dl">
                    <dt className="policy_usage">
                      개인정보 보유 현황
                    </dt>
                    <dd className="admin_sso_apply_dd">
                      <div className="custom_checkbox_area">
                        <p className="admin_select_text">
                          {personInfoViewArray.map(
                            (item, index) => (
                              <span key={index}>
                                {item}
                              </span>
                            )
                          )}
                        </p>
                      </div>
                    </dd>
                  </dl>
                </li>
                <li className="request_form_expansion_area02">
                  <dl className="request_form_dl">
                    <dt className="policy_usage">
                      고유 식별 및 민감정보
                      취급여부
                    </dt>
                    <dd>
                      <div className="custom_checkbox_area">
                        <div className="custom_checkbox_area">
                          <p className="admin_select_text">
                            {uniqueIdenViewArray.map(
                              (item, index) => (
                                <span key={index}>
                                  {item}
                                </span>
                              )
                            )}
                          </p>
                        </div>
                      </div>
                    </dd>
                  </dl>
                </li>
                <li className="request_form_expansion_area02">
                  <dl className="request_form_dl">
                    <dt className="policy_usage">
                      DB 암호화 여부
                    </dt>
                    <dd>
                      <div className="custom_checkbox_area">
                        <p className="admin_select_text">
                          {dbEncryptionViewArray.map(
                            (item, index) => (
                              <span key={index}>
                                {item}
                              </span>
                            )
                          )}
                        </p>
                      </div>
                    </dd>
                  </dl>
                </li>
                <li className="request_form_expansion_area02">
                  <dl className="request_form_dl">
                    <dt className="policy_usage">
                      상세 내용
                    </dt>
                    <dd>
                      <p className="request_font_dataTxt">
                        {inspection.detailContent}
                      </p>
                    </dd>
                  </dl>
                </li>
              </ul>
            </div>
          </div>
          <div className="page_list_contents">
            <h2 className="pageTitle">
              기타 보고서
              <span className="resut_subTxt">
                점검 결과 보고서가 있는 경우 해당
                파일을 등록해주세요.
              </span>
            </h2>
            <div className="project_request_page">
              <ul className="request_form_ul">
                <li className="request_form_expansion_area02">
                  <dl className="request_form_dl">
                    <dt className="result_report">
                      모의 해킹/ 인프라 점검 결과
                      보고서
                    </dt>
                    <dd>
                      <p className="request_font_dataTxt">
                        사용자 권한정의 파일.doc
                      </p>
                    </dd>
                  </dl>
                </li>
              </ul>
            </div>
            <div className="inspection_request_area">
              <p>
                <button
                  className="writeing_saveBtn"
                  onClick={() => navigate(-1)}
                >
                  뒤로가기
                </button>
                <button className="check_requestBtn">
                  수정하기
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InspectionRequestView;
