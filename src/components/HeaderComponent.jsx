import React from 'react'
import { NavLink } from 'react-router-dom';

const HeaderComponent = () => {
  return (
    <div>
      <header>
        <h1 className="logo">
          <NavLink to="/index">
            <span className="red_color">V</span>
            .PORTAL
          </NavLink>
        </h1>
        <ul className="header_gnbMenu">
          <li>
            <NavLink to="/index">
              점검 접수
            </NavLink>
          </li>
          <li>
            <NavLink to="/result/list">
              점검 결과
            </NavLink>
          </li>
          <li>
            <NavLink to="/inspection">
              이행 점검
            </NavLink>
          </li>
          <li>
            <NavLink to="/other2">
              진척관리
            </NavLink>
          </li>
          <li>
            <NavLink to="/other3">
              기준정보
            </NavLink>
          </li>
          <li>
            <NavLink to="/other4">
              User 관리
            </NavLink>
          </li>
        </ul>
        <span className="user_name">
          홍길동 책임
        </span>
      </header>
    </div>
  );
}

export default HeaderComponent