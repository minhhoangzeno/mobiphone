import {
  Button,
  Container,
  Form,
  InputGroup,
  Row
} from "@themesberg/react-bootstrap";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { request } from "../../helper/request.helper";
import { Routes } from "../../routes";

export default () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let { addToast } = useToasts();
  let history = useHistory();
  let addFee = (form) => {
    request({
      method: "POST",
      url: "Fees",
      data: form,
    })
      .then(() => {
        history.push(Routes.Fee.path);
        addToast("Add Success", {
          appearance: "success",
          autoDismiss: 1000,
        });
      })
      .catch((error) => {
        addToast("Error", { appearance: "error", autoDismiss: 2000 });
      });
  };

  return (
    <Container>
      <Row>
        <h3 className="mb-3">Thêm phí ship</h3>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Mô tả</Form.Label>
            <Controller
              control={control}
              name="name" 
              render={({ field: { onChange, onBlur, value } }) => (
                <InputGroup
                  style={{
                    border:
                      errors.title?.type === "required" && "1px solid red",
                  }}
                >
                  <Form.Control
                    autoFocus
                    required
                    type="text"
                    onChange={(e) => onChange(e.target.value)}
                    onBlur={onBlur}
                  />
                </InputGroup>
              )}
              rules={{
                required: true,
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Giá</Form.Label>
            <Controller
              control={control}
              name="price" 
              render={({ field: { onChange, onBlur, value } }) => (
                <InputGroup
                  style={{
                    border:
                      errors.title?.type === "required" && "1px solid red",
                  }}
                >
                  <Form.Control
                    autoFocus
                    required
                    type="number"
                    onChange={(e) => onChange(e.target.value)}
                    onBlur={onBlur}
                  />
                </InputGroup>
              )}
              rules={{
                required: true,
              }}
            />
          </Form.Group>

          <Button
            variant="secondary"
            type="button"
            className="m-3"
            onClick={() => history.push(Routes.Fee.path)}
          >
            Hủy
          </Button>
          <Button
            variant="primary"
            type="button"
            onClick={handleSubmit(addFee)}
          >
            Xác nhận
          </Button>
        </Form>
      </Row>
    </Container>
  );
};
