import ReactModal from 'react-modal';

const RewriteModal = ({ isOpen02, onCancel02 }) => {
  return (
    <ReactModal
      isOpen02={isOpen02}
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
          height: '600px',
          overflow: 'hidden',
        },
      }}
    >
      <div className="member_add_modal">
        <h2>재작성 요청</h2>
        <button
          class="modal_closeBtn"
          onClick={onCancel02}
        >
          닫기
        </button>
        <p class="inspection_start_subTxt">
          ※ 신청 내용을 재작성 요청 합니다
        </p>
        <div class="model_inspection_scroll_wrap">
          <div>
            <dl class="model_inspection_dl">
              <dt>Comment 작성</dt>
              <dd>
                <textarea
                  class="model_form_textarea"
                  placeholder="상세 내용을 입력해주세요."
                ></textarea>
              </dd>
            </dl>
          </div>
        </div>
        <div class="inspection_request_area">
          <p>
            <button
              onClick={onCancel02}
              class="writeing_saveBtn"
            >
              취소 하기
            </button>
            <button class="check_requestBtn">
              요청 하기
            </button>
          </p>
        </div>
      </div>
    </ReactModal>
  );
};

export default RewriteModal;
