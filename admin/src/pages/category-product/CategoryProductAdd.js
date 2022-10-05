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

  let addCategoryProduct = async (form) => {
    request({
      method: "POST",
      url: `CategoryProducts`,
      data: form,
    })
      .then(() => {
        history.push(Routes.CategoryProduct.path);
        addToast("Add Category Product Success", {
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
        <h3 className="mb-3">Thêm danh mục sản phẩm</h3>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Tiêu đề</Form.Label>
            <Controller
              control={control}
              name="title"
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

          <Button
            variant="secondary"
            type="button"
            className="m-3"
            onClick={() => history.push(Routes.CategoryProduct.path)}
          >
            Hủy
          </Button>
          <Button
            variant="primary"
            type="button"
            onClick={handleSubmit(addCategoryProduct)}
          >
            Xác nhận
          </Button>
        </Form>
      </Row>
    </Container>
  );
};
