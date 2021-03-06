import { Button, Container, Form, InputGroup, Row } from '@themesberg/react-bootstrap';
import React from 'react';
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { editCategoryThunk } from '../../redux/categorySlice';
import { Routes } from '../../routes';

export default () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const location = useLocation();
  let category = location.state;
  let { addToast } = useToasts();
  let history = useHistory()
  let dispatch = useDispatch();
  let addData = async (form) => {
    dispatch(editCategoryThunk(category._id, { title: form.title }))  // thực hiện action editCategoryThunk ( sửa danh mục) 
                                                                      // và cần truyền id danh mục cần sửa và tiêu đề sửa mới

    addToast("Success", { appearance: 'success', autoDismiss: 1000 });
    history.push(Routes.Category.path)
  }
  return (
    <Container>
      <Row>
        <h3 className="mb-3">Sửa danh mục</h3>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Title</Form.Label>
            <Controller
              control={control}
              name="title"
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
              defaultValue={category.title}
            />
          </Form.Group>
          <Button variant="primary" type="button" onClick={handleSubmit(addData)} >
            Submit
          </Button>
          <Button variant="secondary" type="button" className="m-3"
            onClick={() => history.push(Routes.Category.path)}
          >
            Cancel
          </Button>
        </Form>
      </Row>
    </Container>
  )
}