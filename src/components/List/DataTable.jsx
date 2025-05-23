import React from "react";
import formatAmount from "../../utils/formatAmount";
import { useNavigate } from "react-router-dom";


const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const isTamil = (text) => /[\u0B80-\u0BFF]/.test(text);
const renderName = (name) => {
  return name.split(" ").map((word, index) => {
    const isTamilWord = isTamil(word);
    return isTamilWord ? (
      <span key={index} className="tamil-text">
        {word}{" "}
      </span>
    ) : (
      <span key={index} className="english-text">
        {word}{" "}
      </span>
    );
  });
};

const DataTable = ({ data, indexOfFirstRecord, onDelete}) => {
  const navigate = useNavigate();

  const handleEdit = (record) => {
    navigate("/add", { state: { editData: record, isEdit: true } });
  };
  
  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Name</th>
            <th>Cultivator</th>
            <th>Time/Trip</th>
            <th>Phone</th>
            <th>Amount</th>
            <th>Paid Amount</th>
            <th>Cash Type</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + indexOfFirstRecord + 1}</td>
                <td>{formatDate(item.date)}</td>
                <td>{renderName(item.name)}</td>
                <td>
                  {item.cultivator_type_image && (
                    <img src={item.cultivator_type_image} alt="cultivator" />
                  )}
                </td>
                <td>
                  {item.time_used
                    ? `${item.time_used.hours}h - ${item.time_used.minutes}m`
                    : item.trips
                    ? `${item.trips} trips`
                    : "-"}
                </td>
                <td>{item.phone_number || "-"}</td>
                <td>{formatAmount(item.total_amount)} /-</td>
                <td>
                  {item.paid_amount == "0" || item.paid_amount === null
                    ? "-"
                    : `${formatAmount(item.paid_amount)} /-`}
                </td>
                <td>
                  {item.modeofpayment_image === null
                    ? "-"
                    : <img src={item.modeofpayment_image} alt="payment mode" />}
                </td>
                <td className="notes-cell">
                  {item.notes ? (
                    <div className="notes-wrapper">
                      <span className="short-notes">
                        {item.notes.length > 5
                          ? `${item.notes.slice(0, 5)}...`
                          : item.notes}
                      </span>
                      <div className="full-notes-popup">{item.notes}</div>
                    </div>
                  ) : (
                    "-"
                  )}
                </td>
                <td>
                <button className="edit-btn" onClick={() => handleEdit(item)}>Edit</button>
                <button className="delete-btn" onClick={() => onDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="no-data">
                No Data Available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
