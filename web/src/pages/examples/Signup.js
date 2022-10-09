import {
  faEnvelope,
  faPhoneAlt,
  faUnlockAlt,
  faUser,
  faUserCog
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormCheck,
  InputGroup,
  Row
} from "@themesberg/react-bootstrap";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import BgImage from "../../assets/img/illustrations/signin.svg";
import { apiUrl } from "../../enviroment";
// import { signupThunk } from "../../redux/authSlice";
import { Routes } from "../../routes";

const ProgressBar = require("react-progress-bar-plus");

export default () => {
  let history = useHistory();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    searchLocation();
  }, []);
  const [check, setCheck] = useState(false);
  let { addToast } = useToasts();
  let signup = async (form) => {
    if (!check) {
      addToast("Bạn cần đồng ý với điều khoản của chúng tôi", {
        appearance: "warning",
        autoDismiss: true,
      });
    } else {
      if (form.password !== form.confirmPassword) {
        addToast("Mật khẩu nhập lại chưa đúng", {
          appearance: "warning",
          autoDismiss: true,
        });
      } else {
        let { confirmPassword, ...other } = form;
        axios
          .post(`${apiUrl}/Accounts`, {
            city: Number(citySelect),
            district: Number(districtSelect),
            ...other,
          })
          .then(() => {
            addToast("Signup success", {
              appearance: "success",
              autoDismiss: true,
            });
            history.push(Routes.Signin.path);
          })
          .catch(function (error) {
            console.log(error);
            addToast("Signup failed", {
              appearance: "error",
              autoDismiss: true,
            });
          });
      }
    }
  };
  const [city, setCity] = useState([]);
  const [district, setDistrict] = useState([]);
  const [citySelect, setCitySelect] = useState();
  const [districtSelect, setDistrictSelect] = useState();

  let searchLocation = async () => {
    let responsive = await axios.get(
      "https://provinces.open-api.vn/api/?depth=2"
    );
    if (responsive.status === 200) {
      setCity(responsive.data);
      setCitySelect(responsive.data[0].code);
      setDistrict(responsive.data[0].districts);
      setDistrictSelect(responsive.data[0]?.districts?.[0]?.code);
    }
  };
  let searchDistrict = async (code) => {
    let cityDistricts = city.filter((item) => item.code == code)?.[0];
    console.log("cityDistricts", cityDistricts);
    setDistrict(cityDistricts?.districts);
    setDistrictSelect(cityDistricts?.districts?.[0]?.code);
  };
  return (
    <>
      <main>
        <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
          <Container>
            <Row
              className="justify-content-center form-bg-image"
              style={{ backgroundImage: `url(${BgImage})` }}
            >
              <Col
                xs={12}
                className="d-flex align-items-center justify-content-center"
              >
                <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                  <div className="text-center text-md-center mb-4 mt-md-0">
                    <h3 className="mb-0">Đăng ký</h3>
                  </div>
                  <Form className="mt-4">
                    <Form.Group id="email" className="mb-4">
                      <Form.Label>Email</Form.Label>
                      <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <InputGroup>
                            <InputGroup.Text
                              style={{
                                borderColor:
                                  errors.email?.type === "required" && "red",
                              }}
                            >
                              <FontAwesomeIcon icon={faEnvelope} />
                            </InputGroup.Text>
                            <Form.Control
                              autoFocus
                              required
                              type="email"
                              placeholder="example@company.com"
                              onChange={(e) => onChange(e.target.value)}
                              onBlur={onBlur}
                              style={{
                                borderColor:
                                  errors.email?.type === "required" && "red",
                              }}
                            />
                          </InputGroup>
                        )}
                        rules={{
                          required: true,
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          },
                        }}
                      />
                      <span style={{ color: "red", fontSize: 12 }}>
                        {errors.email?.type === "pattern" &&
                          "* Chưa đúng định dạng email"}
                      </span>
                    </Form.Group>
                    <Form.Group id="username" className="mb-4">
                      <Form.Label>Tài khoản</Form.Label>
                      <Controller
                        control={control}
                        name="username"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <InputGroup>
                            <InputGroup.Text
                              style={{
                                borderColor:
                                  errors.email?.type === "required" && "red",
                              }}
                            >
                              <FontAwesomeIcon icon={faUserCog} />
                            </InputGroup.Text>
                            <Form.Control
                              autoFocus
                              required
                              type="text"
                              placeholder="minhvu"
                              onChange={(e) => onChange(e.target.value)}
                              onBlur={onBlur}
                              style={{
                                borderColor:
                                  errors.email?.type === "required" && "red",
                              }}
                            />
                          </InputGroup>
                        )}
                        rules={{ required: true }}
                      />
                    </Form.Group>
                    <Form.Group id="phoneNumber" className="mb-4">
                      <Form.Label>Số điện thoại</Form.Label>
                      <Controller
                        control={control}
                        name="phoneNumber"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <InputGroup>
                            <InputGroup.Text
                              style={{
                                borderColor:
                                  errors.email?.type === "required" && "red",
                              }}
                            >
                              <FontAwesomeIcon icon={faPhoneAlt} />
                            </InputGroup.Text>
                            <Form.Control
                              autoFocus
                              required
                              type="text"
                              onChange={(e) => onChange(e.target.value)}
                              onBlur={onBlur}
                              style={{
                                borderColor:
                                  errors.email?.type === "required" && "red",
                              }}
                            />
                          </InputGroup>
                        )}
                        rules={{ required: true }}
                      />
                    </Form.Group>
                    <Form.Group id="email" className="mb-4">
                      <Form.Label>Họ</Form.Label>
                      <Controller
                        control={control}
                        name="firstName"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <InputGroup>
                            <InputGroup.Text
                              style={{
                                borderColor:
                                  errors.email?.type === "required" && "red",
                              }}
                            >
                              <FontAwesomeIcon icon={faUser} />
                            </InputGroup.Text>
                            <Form.Control
                              autoFocus
                              required
                              type="text"
                              placeholder="Minh"
                              onChange={(e) => onChange(e.target.value)}
                              onBlur={onBlur}
                              style={{
                                borderColor:
                                  errors.email?.type === "required" && "red",
                              }}
                            />
                          </InputGroup>
                        )}
                        rules={{ required: true }}
                      />
                    </Form.Group>
                    <Form.Group id="email" className="mb-4">
                      <Form.Label>Tên</Form.Label>
                      <Controller
                        control={control}
                        name="lastName"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <InputGroup>
                            <InputGroup.Text
                              style={{
                                borderColor:
                                  errors.email?.type === "required" && "red",
                              }}
                            >
                              <FontAwesomeIcon icon={faUser} />
                            </InputGroup.Text>
                            <Form.Control
                              autoFocus
                              required
                              type="text"
                              placeholder="Vu"
                              onChange={(e) => onChange(e.target.value)}
                              onBlur={onBlur}
                              style={{
                                borderColor:
                                  errors.email?.type === "required" && "red",
                              }}
                            />
                          </InputGroup>
                        )}
                        rules={{ required: true }}
                      />
                    </Form.Group>

                    <Col className="col-12 mt-3">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: 10,
                        }}
                      >
                        <label htmlFor="username">
                          <b>Tỉnh/Thành phố:</b>
                        </label>
                        <select
                          onChange={(e) => {
                            setCitySelect(e.target.value);
                            searchDistrict(e.target.value);
                          }}
                          value={citySelect}
                        >
                          {city.map((item, index) => {
                            return (
                              <option key={index} value={item.code}>
                                {item.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </Col>
                    <Col className="col-12 mt-3">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: 10,
                        }}
                      >
                        <label htmlFor="username">
                          <b>Huyện:</b>
                        </label>
                        <select
                          onChange={(e) => {
                            setDistrictSelect(e.target.value);
                          }}
                          value={districtSelect}
                        >
                          {district?.map((item, index) => {
                            return (
                              <option key={index} value={item.code}>
                                {item.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </Col>
                    <div style={{ height: 20 }}></div>
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>Mật khẩu</Form.Label>
                      <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <InputGroup>
                            <InputGroup.Text
                              style={{
                                borderColor:
                                  errors.email?.type === "required" && "red",
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
                                  errors.email?.type === "required" && "red",
                              }}
                            />
                          </InputGroup>
                        )}
                        rules={{ required: true }}
                      />
                      <span style={{ color: "red", fontSize: 12 }}>
                        {errors.password?.type === "minLength" &&
                          "* Mật khẩu cần ít nhất là 8 ký tự"}
                      </span>
                    </Form.Group>
                    <Form.Group id="confirmPassword" className="mb-4">
                      <Form.Label>Xác nhận mật khẩu</Form.Label>
                      <Controller
                        control={control}
                        name="confirmPassword"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <InputGroup>
                            <InputGroup.Text
                              style={{
                                borderColor:
                                  errors.email?.type === "required" && "red",
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
                                  errors.email?.type === "required" && "red",
                              }}
                            />
                          </InputGroup>
                        )}
                        rules={{ required: true }}
                      />
                      <span style={{ color: "red", fontSize: 12 }}>
                        {errors.password?.type === "minLength" &&
                          "* Mật khẩu cần ít nhất là 8 ký tự"}
                      </span>
                    </Form.Group>
                    <FormCheck type="checkbox" className="d-flex mb-4">
                      <FormCheck.Input
                        required
                        id="terms"
                        className="me-2"
                        checked={check}
                        onChange={() => setCheck(!check)}
                      />

                      <FormCheck.Label htmlFor="terms">
                        Tôi đồng ý với{" "}
                        <Card.Link>điều khoản và điều lệ</Card.Link>
                      </FormCheck.Label>
                    </FormCheck>
                    <Button
                      variant="primary"
                      type="submit"
                      className="w-100"
                      onClick={handleSubmit(signup)}
                    >
                      Đăng ký
                    </Button>
                  </Form>
                  <div className="d-flex justify-content-center align-items-center mt-4">
                    <span className="fw-normal">
                      <Card.Link
                        as={Link}
                        to={Routes.Signin.path}
                        className="fw-bold"
                      >
                        Bạn đã có tài khoản?
                      </Card.Link>
                    </span>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </>
  );
};
