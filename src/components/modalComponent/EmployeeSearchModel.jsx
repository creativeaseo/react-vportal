import ReactModal from 'react-modal';

const EmployeeSearchComponent = ({
  isOpen,
  onCancel
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          alignItems: 'center',
          justifyContent: 'center',
        },
        content: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          border: '1px solid #ccc',
          background: '#fff',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          borderRadius: '20px',
          outline: 'none',
          padding: '35px 30px 100px 30px',
          width: '680px',
          height: '500px',
          overflow: 'hidden',
        },
      }}
    >
      <div className="member_add_modal">
        <h2>요청자 추가하기</h2>
        <button
          class="modal_closeBtn"
          onClick={onCancel}
        >
          X
        </button>
        <div class="modal_table_wrap">
          <table className="list_table modal_table">
            <thead>
              <tr>
                <th>No</th>
                <th>소속</th>
                <th>이름</th>
                <th>직급</th>
                <th>ID</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>인더포레스트</td>
                <td>김선임</td>
                <td>담당자</td>
                <td>itforest01</td>
                <td>
                  <button className="url_addBtn">
                    추가
                  </button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>인더포레스트</td>
                <td>김선임</td>
                <td>담당자</td>
                <td>itforest01</td>
                <td>
                  <button className="url_addBtn">
                    추가
                  </button>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>인더포레스트</td>
                <td>김선임</td>
                <td>담당자</td>
                <td>itforest01</td>
                <td>
                  <button className="url_addBtn">
                    추가
                  </button>
                </td>
              </tr>
              <tr>
                <td>4</td>
                <td>인더포레스트</td>
                <td>김선임</td>
                <td>담당자</td>
                <td>itforest01</td>
                <td>
                  <button className="url_addBtn">
                    추가
                  </button>
                </td>
              </tr>
              <tr>
                <td>5</td>
                <td>인더포레스트</td>
                <td>김선임</td>
                <td>담당자</td>
                <td>itforest01</td>
                <td>
                  <button className="url_addBtn">
                    추가
                  </button>
                </td>
              </tr>
              <tr>
                <td>5</td>
                <td>인더포레스트</td>
                <td>김선임</td>
                <td>담당자</td>
                <td>itforest01</td>
                <td>
                  <button className="url_addBtn">
                    추가
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </ReactModal>
  );
};

export default EmployeeSearchComponent;
