import React from 'react'

const ServiceURLItemList = ({ serviceURL, onRemove }) => {
  return (
    <div>
      <ul>
        {serviceURL.map((item, index) => (
          <li
            class="serviceURL_item_li"
            key={index}
            id={index}
          >
            <span className="serviceURL_item">
              {item}
            </span>
            <button
              className="url_addBtn url_delBtn "
              onClick={onRemove}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceURLItemList;