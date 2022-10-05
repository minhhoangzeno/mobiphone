import React from 'react';
export default ({ categories, categoryId, setCategoryId }) => {

  return (
    <>
      <div className="left_sidebar_area">
        <aside className="left_widgets p_filter_widgets">
          <div className="l_w_title">
            <h3>Danh mục</h3>
          </div>
          <div className="widgets_inner">
            <ul className="list">
              {categories.length > 0 && categories.map((item, index) => {
                return (
                  <li key={index} value={categoryId} onClick={() => setCategoryId(item?.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div>{item?.title}</div>
                  </li>
                )
              })}
            </ul>
          </div>
        </aside>
      </div>
    </>
  )
}