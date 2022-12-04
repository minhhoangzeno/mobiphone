import { Button, Container, Form, InputGroup, Row } from '@themesberg/react-bootstrap';
import axios from 'axios';
import React from 'react';
import { Controller, useForm } from "react-hook-form";
import { useHistory, useLocation } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { apiUrl } from '../../enviroment';
import { request } from '../../helper/request.helper';
import { Routes } from '../../routes';

const access_token = localStorage.getItem("token")

export default () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const location = useLocation();  
  const data = location.state; 
  let { addToast } = useToasts();
  let history = useHistory();
  let editData = (form) => {
    // form : {title: form.title}
    request({
      method: 'PATCH',
      url: `Fees/${data.id}`,
      data: form
    }).then(() => {
      history.push(Routes.Fee.path);
      addToast("Edit Success", { appearance: 'success', autoDismiss: 1000 });
    }).catch(error => {
      addToast("Error", { appearance: 'error', autoDismiss: 2000 });
    })
  }
  return (
    <Container>
      <Row>
        <h3 className="mb-3">Chỉnh sửa phí</h3>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Mô tả</Form.Label>
            <Controller
              control={control}
              name="name"
              render={({
                field: { onChange, onBlur, value }
              }) => (
                <InputGroup style={{ border: errors.title?.type === "required" && '1px solid red' }}>
                  <Form.Control autoFocus required type="text" onChange={e => onChange(e.target.value)}
                    onBlur={onBlur}
                    value={value}
                  />
                </InputGroup>
              )}
              rules={{
                required: true
              }}
              defaultValue={data?.name}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Giá</Form.Label>
            <Controller
              control={control}
              name="price"
              render={({
                field: { onChange, onBlur, value }
              }) => (
                <InputGroup style={{ border: errors.title?.type === "required" && '1px solid red' }}>
                  <Form.Control autoFocus required type="text" onChange={e => onChange(e.target.value)}
                    onBlur={onBlur}
                    value={value}
                  />
                </InputGroup>
              )}
              rules={{
                required: true
              }}
              defaultValue={data?.price}
            />
          </Form.Group>
          <Button variant="secondary" type="button" className="m-3"
            onClick={() => history.push(Routes.Fee.path)}>
            Hủy
          </Button>
          <Button variant="primary" type="button" onClick={handleSubmit(editData)} >
            Xác nhận
          </Button>
        </Form>
      </Row>
    </Container>
  )
}