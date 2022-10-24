import React, {
  useState,
  useCallback,
  useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import RequestCompleteModal from './modalComponent/RequestCompleteModal';
import InspectionService from '../service/InspectionService';
import ServiceURLItemList from './inspectionRequestComponent/ServiceURLItemList';

const InspectionRequest = () => {
  const navigate = useNavigate();
  // ****** 오픈예정일 달력 ******
  const [startDate, setStartDate] = useState(
    new Date()
  );
  const [endDate, setEndDate] = useState(
    new Date()
  );
  const openStartDate =
    startDate.getFullYear() +
    '년 ' +
    (startDate.getMonth() + 1) +
    '월 ' +
    startDate.getDate() +
    '일';
  const openEndDate =
    endDate.getFullYear() +
    '년 ' +
    (endDate.getMonth() + 1) +
    '월 ' +
    endDate.getDate() +
    '일';
  const openDate =
    openStartDate + ' ~ ' + openEndDate;

  // ****** 오늘 날짜 가져오기 ******
  const date = new Date();
  const toDayDate =
    date.getFullYear() +
    '년 ' +
    (date.getMonth() + 1) +
    '월 ' +
    date.getDate() +
    '일';

  const [
    toDayDateState,
    setToDayDateState,
  ] = useState(toDayDate);

  const toDayDateStateOnChange = (event) => {
    setToDayDateState(event.target.value);
  };

  // ****** 점검 접수 useState / input 입력 ******
  // 시스템명
  const [systemName, setSytetmName] = useState(
    ''
  );
  const systemNameRef = React.useRef(null);

  // 프로젝트명
  const [projectName, setProjectName] = useState(
    ''
  );
  const projectNameRef = React.useRef(null);
  // 점검 요청일
  const [requestDate, setRequestDate] = useState(
    ''
  );

  // 업무영역(대분류)
  const workAreaOption = ['R & D', '유지보수'];
  const [
    workAreaLarge,
    setWorkAreaLarge,
  ] = useState('R & D');
  const handleSelect = (e) => {
    setWorkAreaLarge(e.target.value);
  };

  // 업무영역(중분류)
  const workAreaMediumOption = [
    'R & D',
    '유지보수',
  ];
  const [
    workAreaMediumn,
    setWorkAreaMediumn,
  ] = useState('R & D');
  const handleMedium = (e) => {
    setWorkAreaMediumn(e.target.value);
  };

  // 업무영역(소분류)
  const workAreaSmallOption = [
    'R & D',
    '유지보수',
  ];
  const [
    workAreaSmall,
    setWorkAreaSmall,
  ] = useState('R & D');
  const handleSmall = (e) => {
    setWorkAreaSmall(e.target.value);
  };
  // 협업주관부서
  const [cooperation, setCooperation] = useState(
    ''
  );
  // 점검요청자
  const [
    inspectionRequester,
    setInspectionRequester,
  ] = useState('이책임');
  const inspectionRequesterOnChange = (e) => {
    setInspectionRequester(e.target.value);
  };

  // 점검자
  const checker = null;
  // 구축PM
  const [builderPM, setbuilderPM] = useState('');
  // 협업PM
  const [businessPM, setBusinessPM] = useState(
    ''
  );
  // SM담당자
  const [smManager, setSmManager] = useState('');
  // 개발형태
  const typeOption = ['신규', '유지보수'];
  const [type, setType] = useState('신규');
  const handleType = (e) => {
    setType(e.target.value);
  };
  // 변경내용
  const [
    updateContent,
    setUpdateContent,
  ] = useState('');
  // 시스템 용도 및 설명
  const [
    systemExplanation,
    setSystemExplanation,
  ] = useState('');
  // 서비스 URL

  const [
    serviceURLOption,
    setServiceURLOption,
  ] = useState([]);
  const [
    serviceURLValue,
    setServiceURLValue,
  ] = useState([]);

  const serviceURLRef = React.useRef(null);

  const createUrl = useCallback(
    (e) => {
      if (serviceURLValue == '') {
        alert('내용을 입력해주세요.');
        serviceURLRef.current.focus();
      } else {
        setServiceURLOption(
          serviceURLOption.concat(serviceURLValue)
        );
        setServiceURLValue('');
      }

      e.preventDefault();
    },
    [serviceURLValue]
  );

  const onRemove = useCallback(
    (e, key) => {
      e.preventDefault();
      setServiceURLOption(
        serviceURLOption.filter(
          (item) => item.key !== key
        )
      );
    },
    [serviceURLOption]
  );

  // 시스템중요도
  const [
    systemCriticality,
    setSystemCriticality,
  ] = useState('');

  // ****** 점검접수 checkbox 생성 *****
  // 연계시스템
  const linkSystemOption = [
    'ERP',
    'GPLM',
    'GSCM',
    'GMES',
    'GQMS',
  ];
  const [
    linkSystemIdxArray,
    setLinkSystemIdxArray,
  ] = useState(['ERP']);
  const [
    linkSystemEtc,
    setlinkSystemEtc,
  ] = useState(null);
  const linkSystemOnCkeck = useCallback(
    (checked, item) => {
      if (checked) {
        setLinkSystemIdxArray([
          ...linkSystemIdxArray,
          item,
        ]);
      } else {
        setLinkSystemIdxArray(
          linkSystemIdxArray.filter(
            (el) => el !== item
          )
        );
      }
    },
    [linkSystemIdxArray]
  );

  const LinkSystemChekBox = () => {
    return linkSystemOption.map((item, index) => (
      <p
        className="custom_checkbox_item"
        key={index}
      >
        <input
          type="checkbox"
          className="custom_checkbox"
          name={item}
          id={item}
          onChange={(e) =>
            linkSystemOnCkeck(
              e.target.checked,
              item
            )
          }
          checked={
            linkSystemIdxArray.includes(item)
              ? true
              : false
          }
        ></input>
        <label
          className="custom_checkbox_label"
          htmlFor={item}
        >
          <span>{item}</span>
        </label>
      </p>
    ));
  };

  const addLinkSystemEtc = () => {
    linkSystemIdxArray.push(linkSystemEtc);
  };

  // 시스템 네트워크 위치
  const systemNetworkOption = [
    'OA',
    'A',
    'RA',
    'CA',
    'QA',
  ];
  const [
    systemNetworkChecked,
    setSystemNetworkChedked,
  ] = useState(['OA']);
  const systemNetworkOnCheck = useCallback(
    (checked, item) => {
      if (checked) {
        setSystemNetworkChedked([
          ...systemNetworkChecked,
          item,
        ]);
      } else {
        setSystemNetworkChedked(
          systemNetworkChecked.filter(
            (el) => el !== item
          )
        );
      }
    },
    [systemNetworkChecked]
  );

  const SystemNetworkCheckbox = () => {
    return systemNetworkOption.map(
      (item, index) => (
        <p
          className="custom_checkbox_item"
          key={index}
        >
          <input
            type="checkbox"
            className="custom_checkbox"
            // name="erpCheckbox"
            id={item}
            onChange={(e) =>
              systemNetworkOnCheck(
                e.target.checked,
                item
              )
            }
            checked={
              systemNetworkChecked.includes(item)
                ? true
                : false
            }
          ></input>
          <label
            className="custom_checkbox_label"
            htmlFor={item}
          >
            <span>{item}</span>
          </label>
        </p>
      )
    );
  };

  const [
    systemNetworkETC,
    setSystemNetworkETC,
  ] = useState(null);

  const addSystemNetwork = () => {
    systemNetworkChecked.push(systemNetworkETC);
  };

  /* 서비스 유형 */
  const serviceTypeOption = [
    'WEB',
    'cs',
    '모바일(AND)',
    '모바일(IOS)',
    'IoT(Device)',
    'Cloud(Saas)',
  ];
  const [
    serviceTypeArray,
    setServiceTypeArray,
  ] = useState(['WEB']);

  const serviceTypeChecked = useCallback(
    (checked, item) => {
      if (checked) {
        setServiceTypeArray([item]);
      } else {
        setServiceTypeArray([
          serviceTypeArray.filter(
            (el) => el != item
          ),
        ]);
      }
    },
    [serviceTypeArray]
  );

  const ServiceTypeRadioBox = () => {
    return serviceTypeOption.map(
      (item, index) => (
        <p
          className="custom_checkbox_item"
          key={index}
        >
          <input
            type="radio"
            className="custom_radio"
            name={item}
            id={item}
            value={item || ''}
            onChange={(e) =>
              serviceTypeChecked(
                e.target.checked,
                item
              )
            }
            checked={
              serviceTypeArray.includes(item)
                ? true
                : false
            }
          />
          <label
            className="custom_radio_label"
            htmlFor={item}
          >
            <span>{item}</span>
          </label>
        </p>
      )
    );
  };

  // 서비스 접근 유형 및 위치(대외)
  const serviceInsideOption = [
    'DMZ',
    'AWS(대외)',
  ];
  const [
    serviceInsideState,
    setServiceInsideState,
  ] = useState(['DMZ']);
  const serviceInsideChecked = useCallback(
    (checked, item) => {
      if (checked) {
        setServiceInsideState([
          ...serviceInsideState,
          item,
        ]);
      } else {
        setServiceInsideState(
          serviceInsideState.filter(
            (el) => el !== item
          )
        );
      }
    },
    [serviceInsideState]
  );

  const ServiceInsideCheckbox = () => {
    return serviceInsideOption.map(
      (item, index) => (
        <p
          className="custom_checkbox_item"
          key={index}
        >
          <input
            type="checkbox"
            className="custom_radio"
            name={item}
            id={item}
            value={item || ''}
            onChange={(e) =>
              serviceInsideChecked(
                e.target.checked,
                item
              )
            }
            checked={
              serviceInsideState.includes(item)
                ? true
                : false
            }
          />
          <label
            className="custom_radio_label"
            htmlFor={item}
          >
            <span>{item}</span>
          </label>
        </p>
      )
    );
  };

  // 서비스 접근 유형 및 위치(사내)
  const serviceCompanyOption = [
    'AWS(사내)',
    '상암IDC',
    '오창',
    '대전',
    'ESNJ',
    'ESNA',
    'ESNB',
    'ESWA',
    'ESMI',
    'ESDG',
  ];
  const [
    serviceCompanyState,
    setServiceCompanyState,
  ] = useState(['AWS(사내)']);
  const serviceCompanyChecked = useCallback(
    (checked, item) => {
      if (checked) {
        setServiceCompanyState([
          ...serviceCompanyState,
          item,
        ]);
      } else {
        setServiceCompanyState(
          serviceCompanyState.filter(
            (el) => el !== item
          )
        );
      }
    },
    [serviceCompanyState]
  );

  const ServiceCompanyCheckbox = () => {
    return serviceCompanyOption.map(
      (item, index) => (
        <p
          className="custom_checkbox_item"
          key={index}
        >
          <input
            type="checkbox"
            className="custom_checkbox"
            name={item}
            id={item}
            value={item || ''}
            onChange={(e) =>
              serviceCompanyChecked(
                e.target.checked,
                item
              )
            }
            checked={
              serviceCompanyState.includes(item)
                ? true
                : false
            }
          />
          <label
            className="custom_checkbox_label"
            htmlFor={item}
          >
            <span>{item}</span>
          </label>
        </p>
      )
    );
  };

  // 개발환경
  const developEnviromentOption = [
    'In-House',
    'Cloud',
  ];
  const [
    developEnviromentState,
    setDevelopEnviromentState,
  ] = useState(['In-House']);
  const developEnviromentChecked = useCallback(
    (checked, item) => {
      if (checked) {
        setDevelopEnviromentState([
          ...developEnviromentState,
          item,
        ]);
      } else {
        setDevelopEnviromentState(
          developEnviromentState.filter(
            (el) => el !== item
          )
        );
      }
    },
    [developEnviromentState]
  );

  const DevelopEnviromentCheckbox = () => {
    return developEnviromentOption.map(
      (item, index) => (
        <p
          className="custom_checkbox_item"
          key={index}
        >
          <input
            type="checkbox"
            className="custom_checkbox"
            name={item}
            id={item}
            value={item || ''}
            onChange={(e) =>
              developEnviromentChecked(
                e.target.checked,
                item
              )
            }
            checked={
              developEnviromentState.includes(
                item
              )
                ? true
                : false
            }
          />
          <label
            className="custom_checkbox_label"
            htmlFor={item}
          >
            <span>{item}</span>
          </label>
        </p>
      )
    );
  };

  // 운영 인프라(서버)
  const operatInpraServerOption = [
    'Apache',
    'Nginx',
    'IIS',
    'LENA',
  ];
  const [
    operatInpraServer,
    setOperatInpraServer,
  ] = useState('Apache');
  const operatInpraServerhandle = (e) => {
    setOperatInpraServer(e.target.value);
  };

  // 운영 인프라(WAS)
  const operatInpraWASOption = [
    'Tomcat',
    'Jeus',
    'LENA',
  ];
  const [
    operatInpraWAS,
    setOperatInpraWAS,
  ] = useState('Apache');
  const operatInpraWAShandle = (e) => {
    setOperatInpraWAS(e.target.value);
  };

  // 운영 인프라(DB)
  const operatInpraDBOption = [
    'My-SQL',
    'MS-SQL',
    'Oracle',
    'Postgre',
    '기타',
  ];
  const [
    operatInpraDB,
    setOperatInpraDB,
  ] = useState('Apache');
  const operatInpraDBhandle = (e) => {
    setOperatInpraDB(e.target.value);
  };

  // 개발 인프라(서버)
  const developInpraServerOption = [
    'Apache',
    'Nginx',
    'IIS',
    'LENA',
  ];
  const [
    developInpraServer,
    setDevelopInpraServer,
  ] = useState('Apache');
  const developInpraServerHandle = (e) => {
    setDevelopInpraServer(e.target.value);
  };

  // 개발 인프라(WAS)
  const developInpraWASOption = [
    'Tomcat',
    'Jeus',
    'LENA',
  ];
  const [
    developInpraWAS,
    setDevelopInpraWAS,
  ] = useState('Apache');
  const developInpraWASHandle = (e) => {
    setDevelopInpraWAS(e.target.value);
  };

  // 개발 인프라(DB)
  const developInpraDBOption = [
    'My-SQL',
    'MS-SQL',
    'Oracle',
    'Postgre',
    '기타',
  ];
  const [
    developInpraDB,
    setDevelopInpraDB,
  ] = useState('Apache');
  const developInpraDBhandle = (e) => {
    setDevelopInpraDB(e.target.value);
  };

  // SSO 적용 여부
  const ssoUseOption = ['YES', 'NO'];
  const [ssoUseArray, setSsoUseArray] = useState([
    'YES',
  ]);

  const ssoUseChecked = useCallback(
    (checked, item) => {
      if (checked) {
        setSsoUseArray([item]);
      } else {
        setSsoUseArray([
          serviceTypeArray.filter(
            (el) => el != item
          ),
        ]);
      }
    },
    [ssoUseArray]
  );

  const SsoUseRadioBox = () => {
    return ssoUseOption.map((item, index) => (
      <p
        className="custom_checkbox_item"
        key={index}
      >
        <input
          type="radio"
          className="custom_radio"
          name={item + '_sso'}
          id={item + '_sso'}
          value={item || ''}
          onChange={(e) =>
            ssoUseChecked(e.target.checked, item)
          }
          checked={
            ssoUseArray.includes(item)
              ? true
              : false
          }
        />
        <label
          className="custom_radio_label"
          htmlFor={item + '_sso'}
        >
          <span>{item}</span>
        </label>
      </p>
    ));
  };

  // VPN 권한 여부
  const vpnAuthOption = ['YES', 'NO'];
  const [
    vpnAuthArray,
    setVpnAuthArray,
  ] = useState(['YES']);

  const vpnAuthChecked = useCallback(
    (checked, item) => {
      if (checked) {
        setVpnAuthArray([item]);
      } else {
        setVpnAuthArray([
          serviceTypeArray.filter(
            (el) => el != item
          ),
        ]);
      }
    },
    [vpnAuthArray]
  );

  const VpnAuthRadioBox = () => {
    return vpnAuthOption.map((item, index) => (
      <p
        className="custom_checkbox_item"
        key={index}
      >
        <input
          type="radio"
          className="custom_radio"
          name={item}
          id={item + '_vpn'}
          value={item || ''}
          onChange={(e) =>
            vpnAuthChecked(e.target.checked, item)
          }
          checked={
            vpnAuthArray.includes(item)
              ? true
              : false
          }
        />
        <label
          className="custom_radio_label"
          htmlFor={item + '_vpn'}
        >
          <span>{item}</span>
        </label>
      </p>
    ));
  };

  // 시큐어 코딩 적용 여부
  const secureCodingOption = ['YES', 'NO'];
  const [
    secureCoding,
    setSecureCoding,
  ] = useState(['YES']);

  const secureCodingChecked = useCallback(
    (checked, item) => {
      if (checked) {
        setSecureCoding([item]);
      } else {
        setSecureCoding([
          serviceTypeArray.filter(
            (el) => el != item
          ),
        ]);
      }
    },
    [secureCoding]
  );

  const SecureCodingRadioBox = () => {
    return secureCodingOption.map(
      (item, index) => (
        <p
          className="custom_checkbox_item"
          key={index}
        >
          <input
            type="radio"
            className="custom_radio"
            name={item + '_seq'}
            id={item + '_seq'}
            value={item || ''}
            onChange={(e) =>
              secureCodingChecked(
                e.target.checked,
                item
              )
            }
            checked={
              secureCoding.includes(item)
                ? true
                : false
            }
          />
          <label
            className="custom_radio_label"
            htmlFor={item + '_seq'}
          >
            <span>{item}</span>
          </label>
        </p>
      )
    );
  };

  // 운영 URL
  const [operateURL, setOperateURL] = useState(
    ''
  );

  // 운영 IP
  const [operateIP, setOperateIP] = useState('');

  // 개발 URL
  const [developURL, setDevelopURL] = useState(
    ''
  );

  // 개발 IP
  const [developIP, setDevelopIP] = useState('');

  // 관리자 페이지
  const [adminPage, setAdminPage] = useState('');

  // 관리자 페이지 SSO 권한 분리 적용
  const [
    adminPageSSO,
    setAdminPageSSO,
  ] = useState('SSO');

  // 점검용 계정 ID
  const [
    inspectionAccount,
    setinspectionAccount,
  ] = useState('');

  // 점검용 계정 비밀번호
  const [
    inspectionAccountPw,
    setInspectionAccountPw,
  ] = useState('');

  // 점검용 사용자01 ID
  const [
    inspectionUser01,
    setInspectionUser01,
  ] = useState('');

  // 점검용 사용자01 비밀번호
  const [
    inspectionUser01Pw,
    setInspectionUser01Pw,
  ] = useState('');

  // 점검용 사용자02 ID
  const [
    inspectionUser02,
    setInspectionUser02,
  ] = useState('');

  // 점검용 사용자02 비밀번호
  const [
    inspectionUser02Pw,
    setInspectionUser02Pw,
  ] = useState('');

  // 개인정보 보유 현황
  const personInfomOption = ['YES', 'NO'];
  const [personInfo, setPersonInfo] = useState([
    'YES',
  ]);
  const [
    personInfoMore,
    setPersonInfoMore,
  ] = useState(null);
  const personInfoOnCkeck = useCallback(
    (checked, item) => {
      if (checked) {
        setPersonInfo([item]);
      } else {
        setPersonInfo(
          personInfo.filter((el) => el !== item)
        );
      }
    },
    [personInfo]
  );

  const PersonInfoChekBox = () => {
    return personInfomOption.map(
      (item, index) => (
        <p
          className="custom_checkbox_item"
          key={index}
        >
          <input
            type="radio"
            className="custom_radio"
            name={item + '_person'}
            id={item + '_person'}
            onChange={(e) =>
              personInfoOnCkeck(
                e.target.checked,
                item
              )
            }
            checked={
              personInfo.includes(item)
                ? true
                : false
            }
          ></input>
          <label
            className="custom_radio_label"
            htmlFor={item + '_person'}
          >
            <span>{item}</span>
          </label>
        </p>
      )
    );
  };

  const personInfoEtc = () => {
    personInfo.push(personInfoMore);
  };

  // 고유 식별 및 민감정보 취급여부
  const uniqueIdenOption = ['YES', 'NO'];
  const [
    uniqueIdenState,
    setUniqueIdenState,
  ] = useState(['YES']);
  const uniqueIdenOnCkeck = useCallback(
    (checked, item) => {
      if (checked) {
        setUniqueIdenState([item]);
      } else {
        setUniqueIdenState(
          uniqueIdenState.filter(
            (el) => el !== item
          )
        );
      }
    },
    [uniqueIdenState]
  );

  const UniqueIdenChekBox = () => {
    return uniqueIdenOption.map((item, index) => (
      <p
        className="custom_checkbox_item"
        key={index}
      >
        <input
          type="radio"
          className="custom_radio"
          name={item + '_iden'}
          id={item + '_iden'}
          onChange={(e) =>
            uniqueIdenOnCkeck(
              e.target.checked,
              item
            )
          }
          checked={
            uniqueIdenState.includes(item)
              ? true
              : false
          }
        ></input>
        <label
          className="custom_radio_label"
          htmlFor={item + '_iden'}
        >
          <span>{item}</span>
        </label>
      </p>
    ));
  };

  // DB 암호화 여부
  const dbEncryptionOption = ['YES', 'NO'];
  const [
    dbEncryptionState,
    setDbEncryptionState,
  ] = useState(['YES']);
  const dbEncryptionOnCkeck = useCallback(
    (checked, item) => {
      if (checked) {
        setDbEncryptionState([item]);
      } else {
        setDbEncryptionState(
          dbEncryptionState.filter(
            (el) => el !== item
          )
        );
      }
    },
    [dbEncryptionState]
  );

  const DbEncryptionChekBox = () => {
    return dbEncryptionOption.map(
      (item, index) => (
        <p
          className="custom_checkbox_item"
          key={index}
        >
          <input
            type="radio"
            className="custom_radio"
            name={item + '_db'}
            id={item + '_db'}
            onChange={(e) =>
              dbEncryptionOnCkeck(
                e.target.checked,
                item
              )
            }
            checked={
              dbEncryptionState.includes(item)
                ? true
                : false
            }
          ></input>
          <label
            className="custom_radio_label"
            htmlFor={item + '_db'}
          >
            <span>{item}</span>
          </label>
        </p>
      )
    );
  };

  // 상세 내용
  const [
    detailContent,
    setDetailContent,
  ] = useState('');

  // ****** 점검접수 전체 항목 중간 저장하기 ******

  const [watchItem, setWatch] = useState([]);

  const saveingInspectionRequest = (e) => {
    e.preventDefault();
    // 시스템명
    // localStorage.setItem('savingSyaName', JSON.stringify(systemName));
    // const savingSetItemString = localStorage.getItem('savingSyaName');
    // const savingSetItemArraty = JSON.parse(savingSetItemString);
    // setSytetmName(savingSetItemArraty);

    // console.log(savingitem);
    // setWatch(savingitem);

    // 시스템명

    // let [watchItem, setWatch] = useState([]);
    // let watch = localStorage.getItem('systemName');
    // // const systemNameSavingValue = ocalStorage.getItem("systemNameSavingValue");
    // localStorage.getItem('systemName', JSON.stringify(watch));
    // setWatch(watch);
    // console.log(watch);
  };

  // ****** 점검접수 전체 항목 Springboot로 전달 ******
  const saveInspectionRequest = (e) => {
    e.preventDefault();

    if (linkSystemEtc != null) {
      addLinkSystemEtc();
    }
    if (systemNetworkETC != null) {
      addSystemNetwork();
    }
    if (personInfoMore != null) {
      personInfoEtc();
    }

    // 유효성 검사
    if (systemName == '') {
      alert('시스템명을 입력해주세요.');
      systemNameRef.current.focus();
      return false;
    }

    if (projectName == '') {
      alert('프로젝트명을 입력해주세요.');
      projectNameRef.current.focus();
      return false;
    }

    const linkSystem = JSON.stringify(
      linkSystemIdxArray
    );

    const systemNetwork = JSON.stringify(
      systemNetworkChecked
    );
    const serviceType = JSON.stringify(
      serviceTypeArray
    );

    const serviceInside = JSON.stringify(
      serviceInsideState
    );

    const serviceCompany = JSON.stringify(
      serviceCompanyState
    );

    const developEnviroment = JSON.stringify(
      developEnviromentState
    );

    const serviceURL = JSON.stringify(
      serviceURLOption
    );

    const ssoUse = JSON.stringify(ssoUseArray);

    const vpnAuth = JSON.stringify(vpnAuthArray);

    const secureCode = JSON.stringify(
      secureCoding
    );

    const personInfoData = JSON.stringify(
      personInfo
    );

    const uniqueIden = JSON.stringify(
      uniqueIdenState
    );

    const dbEncryption = JSON.stringify(
      dbEncryptionState
    );

    const requestForm = {
      systemName,
      projectName,
      workAreaLarge,
      workAreaMediumn,
      workAreaSmall,
      builderPM,
      businessPM,
      smManager,
      type,
      updateContent,
      systemExplanation,
      serviceURL,
      toDayDateState,
      openDate,
      inspectionRequester,
      checker,
      cooperation,
      systemCriticality,
      linkSystem,
      systemNetwork,
      serviceType,
      serviceInside,
      serviceCompany,
      developEnviroment,
      operatInpraServer,
      operatInpraWAS,
      operatInpraDB,
      developInpraServer,
      developInpraWAS,
      developInpraDB,
      ssoUse,
      vpnAuth,
      secureCode,
      operateURL,
      operateIP,
      developURL,
      developIP,
      adminPage,
      inspectionAccount,
      inspectionAccountPw,
      inspectionUser01,
      inspectionUser01Pw,
      inspectionUser02,
      inspectionUser02Pw,
      personInfoData,
      uniqueIden,
      dbEncryption,
      detailContent,
      adminPageSSO,
    };

    alert('접수가 완료되었습니다.');

    // 점검 접수 완료 후 리스트 페이지로 이동
    InspectionService.createInspectionRequest(
      requestForm
    )
      .then((response) => {
        console.log(response.data);
        navigate('/index');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [isOpen, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleModal1Cancel = () => {
    // 모달1 비지니스 로직
    setOpen(false);
  };

  // 페이지 스크롤 이벤트
  const [ScrollY, setScrollY] = useState(0); // window 의 pageYOffset값을 저장
  const [
    ScrollActive,
    setScrollActive,
  ] = useState(false);
  const handleScroll = () => {
    if (ScrollY > 50) {
      setScrollY(window.pageYOffset);
      setScrollActive(true);
    } else {
      setScrollY(window.pageYOffset);
      setScrollActive(false);
    }
    if (ScrollY > 2700) {
      setScrollY(window.pageYOffset);
      setScrollActive(false);
    }
  };

  useEffect(() => {
    const scrollListener = () => {
      window.addEventListener(
        'scroll',
        handleScroll
      );
    }; //  window 에서 스크롤을 감시 시작
    scrollListener(); // window 에서 스크롤을 감시
    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll
      );
    }; //  window 에서 스크롤을 감시를 종료
  });

  return (
    <>
      <RequestCompleteModal
        isOpen={isOpen}
        onCancel={handleModal1Cancel}
      />
      <div className="container">
        <div className="page_wrap">
          <div className="page_contents">
            <h2 className="pageTitle">
              점검 접수 신청하기
            </h2>
          </div>
          <form>
            {/* S :: 점검 점수 신청하기 */}
            <div className="project_request_page">
              <ul className="request_form_ul">
                <li>
                  <dl className="request_form_dl">
                    <dt>
                      시스템명
                      <span className="essential_check">
                        *
                      </span>
                    </dt>
                    <dd>
                      <input
                        className="form_input"
                        type="text"
                        placeholder="시스템명을 입력해주세요."
                        value={systemName || ''}
                        onChange={(e) =>
                          setSytetmName(
                            e.target.value
                          )
                        }
                        ref={systemNameRef}
                      />
                      {/* <p className="essential_text">
                        필수 입력 사항입니다.
                      </p> */}
                    </dd>
                  </dl>
                </li>
                <li>
                  <dl className="request_form_dl">
                    <dt>
                      프로젝트명
                      <span className="essential_check">
                        *
                      </span>
                    </dt>
                    <dd>
                      <input
                        className="form_input"
                        type="text"
                        placeholder="연계프로젝트명을 입력해주세요."
                        value={projectName || ''}
                        onChange={(e) =>
                          setProjectName(
                            e.target.value
                          )
                        }
                        ref={projectNameRef}
                      />
                    </dd>
                  </dl>
                </li>
                <li>
                  <dl className="request_form_dl">
                    <dt>점검 요청일</dt>
                    <dd>
                      <input
                        className="form_input"
                        type="text"
                        value={
                          toDayDateState || ''
                        }
                        onChange={
                          toDayDateStateOnChange
                        }
                      />
                    </dd>
                  </dl>
                </li>
                <li className="request_form_expansion_area">
                  <dl className="request_form_dl request_form_expansion_dl">
                    <dt>업무영역</dt>
                    <dd>
                      <div className="request_form_work_area">
                        <div className="request_form_work_type">
                          <label className="work_type_title">
                            · 대분류
                          </label>
                          <select
                            className="form_select"
                            name=""
                            value={
                              workAreaLarge || ''
                            }
                            onChange={
                              handleSelect
                            }
                          >
                            {workAreaOption.map(
                              (item) => (
                                <option
                                  value={
                                    item || ''
                                  }
                                  key={item}
                                >
                                  {item}
                                </option>
                              )
                            )}
                          </select>
                        </div>

                        <div className="request_form_work_type">
                          <span className="work_type_title">
                            · 중분류
                          </span>
                          <select
                            className="form_select"
                            name=""
                            value={
                              workAreaMediumn
                            }
                            onChange={
                              handleMedium
                            }
                          >
                            {workAreaMediumOption.map(
                              (item) => (
                                <option
                                  value={
                                    item || ''
                                  }
                                  key={item}
                                >
                                  {item}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                        <div className="request_form_work_type">
                          <span className="work_type_title">
                            · 소분류
                          </span>
                          <select
                            className="form_select"
                            name=""
                            value={
                              workAreaSmall || ''
                            }
                            onChange={handleSmall}
                          >
                            {workAreaSmallOption.map(
                              (item) => (
                                <option
                                  value={
                                    item || ''
                                  }
                                  key={item}
                                >
                                  {item}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      </div>
                    </dd>
                  </dl>
                </li>
                <li>
                  <dl className="request_form_dl">
                    <dt>협업주관부서</dt>
                    <dd>
                      <input
                        className="form_input"
                        type="text"
                        placeholder="협업주관부서를 입력해주세요."
                        value={cooperation || ''}
                        onChange={(e) =>
                          setCooperation(
                            e.target.value
                          )
                        }
                      />
                    </dd>
                  </dl>
                </li>
                <li>
                  <dl className="request_form_dl">
                    <dt>점검 요청자</dt>
                    <dd>
                      <input
                        className="form_input"
                        type="text"
                        placeholder="점검요청자를 입력해주세요."
                        value={
                          inspectionRequester ||
                          ''
                        }
                        onChange={
                          inspectionRequesterOnChange
                        }
                      />
                    </dd>
                  </dl>
                </li>
                <li>
                  <dl className="request_form_dl">
                    <dt>구축 PM</dt>
                    <dd>
                      <p className="request_form_input_area">
                        <span>
                          <input
                            className="form_input form_search_input"
                            type="text"
                            placeholder="구축 PM를 입력해주세요."
                            value={
                              builderPM || ''
                            }
                            onChange={(e) =>
                              setbuilderPM(
                                e.target.value
                              )
                            }
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
                    <dt>현업 PM</dt>
                    <dd>
                      <p className="request_form_input_area">
                        <span>
                          <input
                            className="form_input form_search_input"
                            type="text"
                            placeholder="현업 PM를 입력해주세요."
                            value={businessPM}
                            onChange={(e) =>
                              setBusinessPM(
                                e.target.value
                              )
                            }
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
                    <dt>SM담당자</dt>
                    <dd>
                      <p className="request_form_input_area">
                        <span>
                          <input
                            className="form_input form_search_input"
                            type="text"
                            placeholder="SM담당자를 입력해주세요."
                            value={
                              smManager || ''
                            }
                            onChange={(e) =>
                              setSmManager(
                                e.target.value
                              )
                            }
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
                    <dt>오픈예정일</dt>
                    <dd>
                      <div className="request_form_dateSelect">
                        <span>
                          <DatePicker
                            locale={ko}
                            dateFormat="yyyy년 MM월 dd일"
                            selected={startDate}
                            onChange={(date) =>
                              setStartDate(date)
                            }
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                          />
                        </span>
                        <span className="request_form_date_line">
                          -
                        </span>
                        <span>
                          <DatePicker
                            locale={ko}
                            dateFormat="yyyy년 MM월 dd일"
                            selected={endDate}
                            onChange={(date) =>
                              setEndDate(date)
                            }
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                          />
                        </span>
                      </div>
                    </dd>
                  </dl>
                </li>
                <li>
                  <dl className="request_form_dl">
                    <dt>개발형태</dt>
                    <dd>
                      <select
                        className="form_select"
                        name=""
                        value={type || ''}
                        onChange={handleType}
                      >
                        {typeOption.map(
                          (item) => (
                            <option
                              value={item || ''}
                              key={item}
                            >
                              {item}
                            </option>
                          )
                        )}
                      </select>
                    </dd>
                  </dl>
                </li>
                <li>
                  <dl className="request_form_dl">
                    <dt>변경내용</dt>
                    <dd>
                      <textarea
                        className="request_form_textarea"
                        value={
                          updateContent || ''
                        }
                        onChange={(e) =>
                          setUpdateContent(
                            e.target.value
                          )
                        }
                      ></textarea>
                    </dd>
                  </dl>
                </li>
                <li>
                  <dl className="request_form_dl">
                    <dt>
                      시스템 용도
                      <br /> 및 설명
                    </dt>
                    <dd>
                      <textarea
                        className="request_form_textarea"
                        value={
                          systemExplanation || ''
                        }
                        onChange={(e) =>
                          setSystemExplanation(
                            e.target.value
                          )
                        }
                      ></textarea>
                    </dd>
                  </dl>
                </li>
                <li>
                  <dl className="request_form_dl">
                    <dt>서비스 URL</dt>
                    <dd>
                      <div className="request_form_url_area">
                        <div className="request_form_url_option_management">
                          <ServiceURLItemList
                            serviceURL={
                              serviceURLOption
                            }
                            onRemove={onRemove}
                          />
                          <input
                            type="text"
                            className="form_input form_url_input"
                            value={
                              serviceURLValue
                            }
                            onChange={(e) =>
                              setServiceURLValue(
                                e.target.value
                              )
                            }
                            ref={serviceURLRef}
                          />
                          <button
                            className="url_addBtn"
                            onClick={createUrl}
                          >
                            추가
                          </button>

                          {/* <ServiceUrlComponent /> */}
                        </div>
                      </div>
                    </dd>
                  </dl>
                </li>
              </ul>
            </div>
            {/* E :: 점검 점수 신청하기 */}

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
                        <input
                          className="form_input"
                          type="text"
                          placeholder="시스템중요도에 대해 입력해주세요."
                          value={
                            systemCriticality ||
                            ''
                          }
                          onChange={(e) =>
                            setSystemCriticality(
                              e.target.value
                            )
                          }
                        />
                      </dd>
                    </dl>
                  </li>
                  <li className="request_form_expansion_area02">
                    <dl className="request_form_dl">
                      <dt className="service_access">
                        연계시스템
                      </dt>
                      <dd>
                        <div className="custom_checkbox_area">
                          <LinkSystemChekBox />
                          <p className="custom_checkbox_item">
                            <input
                              className="form_input"
                              type="text"
                              value={
                                linkSystemEtc ||
                                ''
                              }
                              placeholder="직접입력"
                              onChange={(e) =>
                                setlinkSystemEtc(
                                  e.target.value
                                )
                              }
                            />
                          </p>
                        </div>
                      </dd>
                    </dl>
                  </li>
                  <li className="request_form_expansion_area02">
                    <dl className="request_form_dl">
                      <dt className="service_access">
                        시스템 네트워크 위치
                      </dt>
                      <dd>
                        <div className="custom_checkbox_area">
                          <SystemNetworkCheckbox />
                          <p className="custom_checkbox_item">
                            <input
                              className="form_input"
                              type="text"
                              value={
                                systemNetworkETC ||
                                ''
                              }
                              placeholder="직접입력"
                              onChange={(e) =>
                                setSystemNetworkETC(
                                  e.target.value
                                )
                              }
                            />
                          </p>
                        </div>
                      </dd>
                    </dl>
                  </li>
                </ul>
              </div>
            </div>
            {/* E :: 비지니스 영향도  */}
            {/* S :: 구축 및 개발 환경 */}
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
                        <div className="custom_checkbox_area">
                          <ServiceTypeRadioBox />
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
                            · 대외
                          </span>
                          <ServiceInsideCheckbox />
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
                          <ServiceCompanyCheckbox />
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
                        <div className="custom_checkbox_area">
                          <DevelopEnviromentCheckbox />
                        </div>
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
                            <label className="service_access_subArea_midume">
                              · 서버
                            </label>
                            <select
                              className="form_select"
                              name=""
                              value={
                                operatInpraServer ||
                                ''
                              }
                              onChange={
                                operatInpraServerhandle
                              }
                            >
                              {operatInpraServerOption.map(
                                (item) => (
                                  <option
                                    value={
                                      item || ''
                                    }
                                    key={item}
                                  >
                                    {item}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                          <div className="request_form_work_type">
                            <label className="service_access_subArea_midume">
                              · WAS
                            </label>
                            <select
                              className="form_select"
                              name=""
                              value={
                                operatInpraWAS ||
                                ''
                              }
                              onChange={
                                operatInpraWAShandle
                              }
                            >
                              {operatInpraDBOption.map(
                                (item) => (
                                  <option
                                    value={
                                      item || ''
                                    }
                                    key={item}
                                  >
                                    {item}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                          <div className="request_form_work_type">
                            <label className="service_access_subArea_midume">
                              · DB
                            </label>
                            <select
                              className="form_select"
                              name=""
                              value={
                                operatInpraDB ||
                                ''
                              }
                              onChange={
                                operatInpraDBhandle
                              }
                            >
                              {operatInpraServerOption.map(
                                (item) => (
                                  <option
                                    value={
                                      item || ''
                                    }
                                    key={item}
                                  >
                                    {item}
                                  </option>
                                )
                              )}
                            </select>
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
                            <label className="service_access_subArea_midume">
                              · 서버
                            </label>
                            <select
                              className="form_select"
                              name=""
                              value={
                                developInpraServer ||
                                ''
                              }
                              onChange={
                                developInpraServerHandle
                              }
                            >
                              {developInpraServerOption.map(
                                (item) => (
                                  <option
                                    value={
                                      item || ''
                                    }
                                    key={item}
                                  >
                                    {item}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                          <div className="request_form_work_type">
                            <label className="service_access_subArea_midume">
                              · WAS
                            </label>
                            <select
                              className="form_select"
                              name=""
                              value={
                                developInpraWAS ||
                                ''
                              }
                              onChange={
                                developInpraWASHandle
                              }
                            >
                              {developInpraWASOption.map(
                                (item) => (
                                  <option
                                    value={
                                      item || ''
                                    }
                                    key={item}
                                  >
                                    {item}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                          <div className="request_form_work_type">
                            <label className="service_access_subArea_midume">
                              · DB
                            </label>
                            <select
                              className="form_select"
                              name=""
                              value={
                                developInpraDB ||
                                ''
                              }
                              onChange={
                                developInpraDBhandle
                              }
                            >
                              {developInpraDBOption.map(
                                (item) => (
                                  <option
                                    value={
                                      item || ''
                                    }
                                    key={item}
                                  >
                                    {item}
                                  </option>
                                )
                              )}
                            </select>
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
                          <SsoUseRadioBox />
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
                        <div className="custom_checkbox_area">
                          <VpnAuthRadioBox />
                        </div>
                      </dd>
                    </dl>
                  </li>
                  <li className="request_form_expansion_area02">
                    <dl className="request_form_dl">
                      <dt className="service_access">
                        시큐어 코딩 적용 여부
                      </dt>
                      <dd>
                        <div className="custom_checkbox_area">
                          <SecureCodingRadioBox />
                        </div>
                      </dd>
                    </dl>
                  </li>
                </ul>
              </div>
            </div>
            {/* E :: 구축 및 개발 환경 */}

            {/* S :: 점검 대상 정보 */}
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
                        <input
                          className="form_input"
                          type="text"
                          placeholder="내용을 입력해주세요."
                          value={operateURL || ''}
                          onChange={(e) =>
                            setOperateURL(
                              e.target.value
                            )
                          }
                        />
                      </dd>
                    </dl>
                  </li>
                  <li>
                    <dl className="request_form_dl">
                      <dt>운영 IP</dt>
                      <dd>
                        <input
                          className="form_input"
                          type="text"
                          placeholder="내용을 입력해주세요."
                          value={operateIP || ''}
                          onChange={(e) =>
                            setOperateIP(
                              e.target.value
                            )
                          }
                        />
                      </dd>
                    </dl>
                  </li>
                  <li>
                    <dl className="request_form_dl">
                      <dt>개발 URL</dt>
                      <dd>
                        <input
                          className="form_input"
                          type="text"
                          placeholder="내용을 입력해주세요."
                          value={developURL || ''}
                          onChange={(e) =>
                            setDevelopURL(
                              e.target.value
                            )
                          }
                        />
                      </dd>
                    </dl>
                  </li>
                  <li>
                    <dl className="request_form_dl">
                      <dt className="admin_manage">
                        개발 IP
                      </dt>
                      <dd>
                        <input
                          className="form_input"
                          type="text"
                          placeholder="내용을 입력해주세요."
                          value={developIP || ''}
                          onChange={(e) =>
                            setDevelopIP(
                              e.target.value
                            )
                          }
                        />
                      </dd>
                    </dl>
                  </li>
                  <li className="request_form_expansion_area">
                    <dl className="request_form_dl request_form_expansion_dl">
                      <dt className="admin_manage">
                        관리자 페이지
                      </dt>
                      <dd>
                        <input
                          className="form_input"
                          type="text"
                          placeholder="내용을 입력해주세요."
                          value={adminPage || ''}
                          onChange={(e) =>
                            setAdminPage(
                              e.target.value
                            )
                          }
                        />
                        {/* <span className="sso_apply_area">
                          <input
                            type="checkbox"
                            className="sso_checkbox"
                            id="adminsso"
                            value="SSO 권한 분리 적용"
                            name="SSO 권한 분리 적용"
                            onChange={(e) =>
                              setAdminPageSSO(
                                e.target.checked,
                                'SSO'
                              )
                            }
                          />
                          <label
                            htmlFor="adminsso"
                            className="sso_checkboxclassName"
                          >
                            <span className="sso_checkbox_span"></span>
                            SSO 권한 분리 적용
                          </label>
                        </span> */}
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
                            <input
                              className="form_input"
                              type="text"
                              placeholder="내용을 입력해주세요."
                              value={
                                inspectionAccount ||
                                ''
                              }
                              onChange={(e) =>
                                setinspectionAccount(
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="request_form_work_type check_info_form_type">
                            <span className="check_check_password">
                              · 비밀번호
                            </span>
                            <input
                              className="form_input"
                              type="password"
                              placeholder="내용을 입력해주세요."
                              value={
                                inspectionAccountPw ||
                                ''
                              }
                              onChange={(e) =>
                                setInspectionAccountPw(
                                  e.target.value
                                )
                              }
                            />
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
                            <input
                              className="form_input"
                              type="text"
                              placeholder="내용을 입력해주세요."
                              value={
                                inspectionUser01 ||
                                ''
                              }
                              onChange={(e) =>
                                setInspectionUser01(
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="request_form_work_type check_info_form_type">
                            <span className="check_check_password">
                              · 비밀번호
                            </span>
                            <input
                              className="form_input"
                              type="password"
                              placeholder="내용을 입력해주세요."
                              value={
                                inspectionUser01Pw ||
                                ''
                              }
                              onChange={(e) =>
                                setInspectionUser01Pw(
                                  e.target.value
                                )
                              }
                            />
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
                            <input
                              className="form_input"
                              type="text"
                              placeholder="내용을 입력해주세요."
                              value={
                                inspectionUser02 ||
                                ''
                              }
                              onChange={(e) =>
                                setInspectionUser02(
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="request_form_work_type check_info_form_type">
                            <span className="check_check_password">
                              · 비밀번호
                            </span>
                            <input
                              className="form_input"
                              type="password"
                              placeholder="내용을 입력해주세요."
                              value={
                                inspectionUser02Pw ||
                                ''
                              }
                              onChange={(e) =>
                                setInspectionUser02Pw(
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                      </dd>
                    </dl>
                  </li>
                </ul>
              </div>
            </div>
            {/* E :: 점검 대상 정보 */}

            {/* S :: 상세 정보 */}
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
                        <input
                          className="form_file_input"
                          type="file"
                          placeholder="운영 URL명을 입력해주세요."
                        />
                      </dd>
                    </dl>
                  </li>
                  <li className="request_form_expansion_area02">
                    <dl className="request_form_dl">
                      <dt className="policy_usage">
                        화면설계서
                      </dt>
                      <dd>
                        <input
                          className="form_file_input"
                          type="file"
                          placeholder="운영 URL명을 입력해주세요."
                        />
                      </dd>
                    </dl>
                  </li>
                  <li className="request_form_expansion_area02">
                    <dl className="request_form_dl">
                      <dt className="policy_usage">
                        개인정보 보유 현황
                      </dt>
                      <dd>
                        <div className="custom_checkbox_area">
                          <PersonInfoChekBox />
                          <p className="custom_checkbox_item">
                            <input
                              className="form_input"
                              type="text"
                              value={
                                personInfoMore ||
                                ''
                              }
                              placeholder="직접입력"
                              onChange={(e) =>
                                setPersonInfoMore(
                                  e.target.value
                                )
                              }
                            />
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
                          <UniqueIdenChekBox />
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
                          <DbEncryptionChekBox />
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
                        <textarea
                          className="request_form_textarea"
                          value={
                            detailContent || ''
                          }
                          onChange={(e) =>
                            setDetailContent(
                              e.target.value
                            )
                          }
                        ></textarea>
                      </dd>
                    </dl>
                  </li>
                </ul>
              </div>
            </div>
            {/* E :: 상세 정보 */}

            {/* S :: 상세 정보 */}
            <div className="page_list_contents">
              <h2 className="pageTitle">
                기타 보고서
                <span className="resut_subTxt">
                  점검 결과 보고서가 있는 경우
                  해당 파일을 등록해주세요.
                </span>
              </h2>
              <div className="project_request_page">
                <ul className="request_form_ul">
                  <li className="request_form_expansion_area02">
                    <dl className="request_form_dl">
                      <dt className="result_report">
                        모의 해킹/ 인프라 점검
                        결과 보고서
                      </dt>
                      <dd>
                        <input
                          className="form_file_input"
                          type="file"
                          placeholder="운영 URL명을 입력해주세요."
                        />
                      </dd>
                    </dl>
                  </li>
                </ul>
              </div>
            </div>
            {/* E :: 상세 정보 */}

            <div
              className={
                ScrollActive
                  ? 'inspection_request_area addFixed'
                  : 'inspection_request_area'
              }
            >
              <p>
                <button
                  className="writeing_saveBtn"
                  onClick={(e) =>
                    saveingInspectionRequest(e)
                  }
                >
                  중간 저장
                </button>
                <button
                  onClick={(e) =>
                    saveInspectionRequest(e)
                  }
                  className="check_requestBtn"
                >
                  점검 요청
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default InspectionRequest;
