import React from 'react';
import ReactModal from 'react-modal';

const RequestCompleteModal = ({
  isOpen,
  onCancel,
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
          height: '600px',
          // overflow: 'hidden',
        },
      }}
    >
      <div className="member_add_modal">
        <h2>점검 시작 알림 </h2>
        <button
          class="modal_closeBtn"
          onClick={onCancel}
        >
          닫기
        </button>
        <p class="inspection_start_subTxt">
          ※ 각 담당자에게 점검 시작 알림 메일을
          발송합니다.
        </p>
        <div class="model_inspection_scroll_wrap">
          <div>
            <dl class="model_inspection_dl">
              <dt>제목</dt>
              <dd>
                <input
                  className="form_input model_input"
                  type="text"
                  placeholder="제목을 입력해주세요."
                />
              </dd>
            </dl>
            <dl class="model_inspection_dl">
              <dt>수신</dt>
              <dd>
                <p class="model_inspection_email_address">
                  <input
                    className="form_input model_input"
                    type="text"
                    placeholder="이메일 주소를 입력해주세요."
                  />
                  <button class="url_deleteBtn">
                    삭제
                  </button>
                </p>
                <p class="model_inspection_email_address">
                  <input
                    className="form_input model_input"
                    type="text"
                    placeholder="이메일 주소를 입력해주세요."
                  />
                  <button class="url_deleteBtn">
                    삭제
                  </button>
                </p>
                <p class="model_inspection_email_address">
                  <input
                    className="form_input model_input"
                    type="text"
                    placeholder="이메일 주소를 입력해주세요."
                  />
                  <button class="url_deleteBtn">
                    삭제
                  </button>
                </p>
                <p class="model_inspection_email_address">
                  <input
                    className="form_input model_input"
                    type="text"
                    placeholder="이메일 주소를 입력해주세요."
                  />
                  <button class="url_addBtn">
                    추가
                  </button>
                  <button class="url_deleteBtn">
                    삭제
                  </button>
                </p>
              </dd>
            </dl>
            <dl class="model_inspection_dl">
              <dt>내용</dt>
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
              onClick={onCancel}
              class="writeing_saveBtn"
            >
              취소 하기
            </button>
            <button class="check_requestBtn">
              발송 하기
            </button>
          </p>
        </div>
      </div>
    </ReactModal>
  );
};

export default RequestCompleteModal;
