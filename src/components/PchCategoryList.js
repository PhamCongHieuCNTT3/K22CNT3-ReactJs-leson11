import React from 'react';

export default function PchCategoryList({ renderpchCategories, onDelete, onEdit }) {
  const pchHandleDelete = (pchCategory) => {
    if (window.confirm(`Bạn có thực sự muốn xóa Category có mã ${pchCategory.pchId} không ?`)) {
      onDelete(pchCategory.pchId);
    }
  };

  const pchCategoryElement = renderpchCategories.map((pchCategory, index) => (
    <tr key={index}>
      <th>{index + 1}</th>
      <td>{pchCategory.pchId}</td>
      <td>{pchCategory.pchCategoryName}</td>
      <td>{pchCategory.pchCategoryStatus ? 'Hiển thị' : 'Tạm khóa'}</td>
      <td>
        <button className="btn btn-warning" onClick={() => onEdit(pchCategory)}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={() => pchHandleDelete(pchCategory)}>
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <div className="container m-2">
      <h2>Danh Sách Loại Sản Phẩm</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Mã loại</th>
            <th>Tên loại</th>
            <th>Trạng thái</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>{pchCategoryElement}</tbody>
      </table>
      <button className="btn btn-primary" onClick={() => onEdit(null)}>
        Thêm Mới
      </button>
    </div>
  );
}
