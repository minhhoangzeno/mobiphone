import { Button, Container, Form, InputGroup, Row } from '@themesberg/react-bootstrap';
import React from 'react';
import { Controller, useForm } from "react-hook-form";
import { useHistory, useLocation } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { request } from '../../helper/request.helper';
import { Routes } from '../../routes';


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
      url: `Shippers/${data.id}`,
      data: form
    }).then(() => {
      history.push(Routes.Shipper.path);
      addToast("Edit Success", { appearance: 'success', autoDismiss: 1000 });
    }).catch(error => {
      addToast("Error", { appearance: 'error', autoDismiss: 2000 });
    })
  }
  return (
    <Container>
      <Row>
        <h3 className="mb-3">Chỉnh sửa shipper</h3>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Tên</Form.Label>
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
            <Form.Label>Số điện thoại</Form.Label>
            <Controller
              control={control}
              name="phone"
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
              defaultValue={data?.phone}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Địa chỉ</Form.Label>
            <Controller
              control={control}
              name="address"
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
              defaultValue={data?.address}
            />
          </Form.Group>
          <Button variant="secondary" type="button" className="m-3"
            onClick={() => history.push(Routes.Shipper.path)}>
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