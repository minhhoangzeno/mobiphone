import { faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Button,
    Col,
    Container,
    Form,
    InputGroup,
    Row
} from "@themesberg/react-bootstrap";
import axios from "axios";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import { apiUrl } from "../../enviroment";

const access_token = localStorage.getItem("token");
export default () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let { addToast } = useToasts();
  const changePassword = (form) => {
    if (form.newPassword !== form.repeatPassword) {
      addToast("Mật khẩu bạn nhập lại sai!", {
        appearance: "warning",
        autoDismiss: true,
      });
    } else {
      axios({
        method: "POST",
        url: `${apiUrl}/Accounts/change-password`,
        data: {
          oldPassword: form.oldPassword,
          newPassword: form.newPassword,
        },
        params: {
          access_token,
        },
      }).then(() => {
        addToast("Thay đổi mật khẩu thành công!", {
          appearance: "success",
          autoDismiss: true,
        });
      });
    }
  };

  return (
    <>
      <Header />
      <main>
        <section className="bg-soft d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
          <Container>
            <Row className="justify-content-center">
              <Col
                xs={12}
                className="d-flex align-items-center justify-content-center"
              >
                <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                  <h3 className="mb-4">Change password</h3>
                  <Form>
                    <Form.Group id="newPassword" className="mb-4">
                      <Form.Label>Your Old Password</Form.Label>
                      <Controller
                        control={control}
                        name="oldPassword"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <InputGroup>
                            <InputGroup.Text
                              style={{
                                borderColor:
                                  errors.newPassword?.type === "required" &&
                                  "red",
                              }}
                            >
                              <FontAwesomeIcon icon={faUnlockAlt} />
                            </InputGroup.Text>
                            <Form.Control
                              autoFocus
                              required
                              type="password"
                              onChange={(e) => onChange(e.target.value)}
                              onBlur={onBlur}
                              style={{
                                borderColor:
                                  errors.newPassword?.type === "required" &&
                                  "red",
                              }}
                            />
                          </InputGroup>
                        )}
                        rules={{ required: true }}
                      />
                      <span style={{ color: "red", fontSize: 12 }}>
                        {errors.oldPassword?.type === "minLength" &&
                          "* Mật khẩu cần ít nhất là 8 ký tự"}
                      </span>
                    </Form.Group>
                    <Form.Group id="newPassword" className="mb-4">
                      <Form.Label>Your New Password</Form.Label>
                      <Controller
                        control={control}
                        name="newPassword"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <InputGroup>
                            <InputGroup.Text
                              style={{
                                borderColor:
                                  errors.newPassword?.type === "required" &&
                                  "red",
                              }}
                            >
                              <FontAwesomeIcon icon={faUnlockAlt} />
                            </InputGroup.Text>
                            <Form.Control
                              autoFocus
                              required
                              type="password"
                              onChange={(e) => onChange(e.target.value)}
                              onBlur={onBlur}
                              style={{
                                borderColor:
                                  errors.newPassword?.type === "required" &&
                                  "red",
                              }}
                            />
                          </InputGroup>
                        )}
                        rules={{ required: true }}
                      />
                      <span style={{ color: "red", fontSize: 12 }}>
                        {errors.newPassword?.type === "minLength" &&
                          "* Mật khẩu cần ít nhất là 8 ký tự"}
                      </span>
                    </Form.Group>
                    <Form.Group id="confirmPassword" className="mb-4">
                      <Form.Label>Confirm Password</Form.Label>
                      <Controller
                        control={control}
                        name="repeatPassword"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <InputGroup>
                            <InputGroup.Text
                              style={{
                                borderColor:
                                  errors.confirmPassword?.type === "required" &&
                                  "red",
                              }}
                            >
                              <FontAwesomeIcon icon={faUnlockAlt} />
                            </InputGroup.Text>
                            <Form.Control
                              autoFocus
                              required
                              type="password"
                              onChange={(e) => onChange(e.target.value)}
                              onBlur={onBlur}
                              style={{
                                borderColor:
                                  errors.confirmPassword?.type === "required" &&
                                  "red",
                              }}
                            />
                          </InputGroup>
                        )}
                        rules={{ required: true }}
                      />
                      <span style={{ color: "red", fontSize: 12 }}>
                        {errors.confirmPassword?.type === "minLength" &&
                          "* Mật khẩu cần ít nhất là 8 ký tự"}
                      </span>
                    </Form.Group>
                    <Button
                      variant="primary"
                      type="button"
                      className="w-100"
                      onClick={handleSubmit(changePassword)}
                    >
                      Reset password
                    </Button>
                  </Form>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
};
