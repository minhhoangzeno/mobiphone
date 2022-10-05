import axios from "axios";
import React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Controller, useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import { apiUrl } from "../../enviroment";
const access_token = localStorage.getItem("token");

export default ({ show, handleClose }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let { addToast } = useToasts();
  let addFeedback = async (form) => {
    axios({
      method: "POST",
      url: `${apiUrl}/Feedbacks`,
      params: {
        access_token,
      },
      data: form,
    })
      .then(() => {
        addToast("Phản hồi của bạn đã được ghi nhận.", {
          appearance: "success",
          autoDismiss: 1000,
        });
        handleClose();
      })
      .catch((err) => {
        console.log(err);
        handleClose();
      });
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Gửi phản hồi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Controller
            control={control}
            name="content"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputGroup
                style={{
                  border: errors.title?.type === "required" && "1px solid red",
                }}
              >
                <Form.Control
                  as="textarea"
                  rows={3}
                  autoFocus
                  required
                  type="text"
                  onChange={(e) => onChange(e.target.value)}
                  onBlur={onBlur}
                  value={value}
                />
              </InputGroup>
            )}
            rules={{
              required: true,
            }}
          />
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
          <Button variant="primary" onClick={handleSubmit(addFeedback)}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
