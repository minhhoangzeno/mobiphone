import { Dropdown } from "@themesberg/react-bootstrap";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import { request } from "../../helper/request.helper";

export default ({ show, handleClose, order, search }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let { addToast } = useToasts();
  const [listShipper, setListShipper] = useState([]);
  const [shipperId, setShipperId] = useState(
    order.shipperId ? order.shipperId : listShipper[0]?.id
  );

  useEffect(() => {
    setShipperId(order.shipperId);
    request({
      method: "GET",
      url: `Shippers`,
    })
      .then((result) => {
        setListShipper(result.data.data);
      })
      .catch((err) => console.log(err));
  }, [order.id]);

  let changeStatus = async (form) => {
    if (shipperId) {
      request({
        method: "PATCH",
        url: `Payments/${order.id}`,
        data: {
          shipperId,
          status:"Đang giao hàng"
        },
      })
        .then(() => {
          addToast("Success", { appearance: "success", autoDismiss: 1000 });
          search("");
          handleClose();
        })
        .catch((err) => console.log(err));
    } else {
      search("");
      handleClose();
    }
  };

  const displayShipper = () => {
    if (order.shipperId) {
      const shipper = listShipper.filter((el) => el.id === shipperId)[0];
      return `${shipper?.name} - ${shipper?.phone} - ${shipper?.address}`;
    } else {
      const shipper = listShipper[0];
      if (shipper) {
        return `${shipper?.name} - ${shipper?.phone} - ${shipper?.address}`;
      }
    }
    return;
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Chọn người/đơn vị vận chuyển</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {displayShipper()}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {listShipper &&
                listShipper.length > 0 &&
                listShipper.map((item, index) => {
                  return (
                    <Dropdown.Item
                      key={index}
                      onClick={() => setShipperId(item.id)}
                    >
                      {item.name} - {item.phone} - {item.address}
                    </Dropdown.Item>
                  );
                })}
            </Dropdown.Menu>
          </Dropdown>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
            }}
          >
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSubmit(changeStatus)}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
