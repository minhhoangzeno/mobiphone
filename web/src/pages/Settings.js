import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  Row,
} from "@themesberg/react-bootstrap";
import axios from "axios";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { SERVER } from "../apis/API";
import Profile3 from "../assets/img/team/profile-picture-3.jpg";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { apiUrl } from "../enviroment";
import uploadFile from "../helper/uploadFile";
import { login } from "../redux/authSlice";
const access_token = localStorage.getItem("token");

export default () => {
  const user = useSelector((state) => state.auth.data);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let { addToast } = useToasts();
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  let updateProfile = async (form) => {
    if (file) {
      let fileUrl = await uploadFile(file);
      axios({
        method: "PATCH",
        url: `${apiUrl}/Accounts/${user.id}`,
        data: {
          ...form,
          avatar: fileUrl,
        },
        params: {
          access_token: access_token,
        },
      })
        .then((result) => {
          dispatch(login(result.data));
          addToast("Thay đổi thông tin thành công!", {
            appearance: "success",
            autoDismiss: true,
          });
        })
        .catch(() => {
          addToast("Failed", { appearance: "error", autoDismiss: true });
        });
    } else {
      axios({
        method: "PATCH",
        url: `${apiUrl}/Accounts/${user.id}`,
        data: {
          form,
        },
        params: {
          access_token: access_token,
        },
      })
        .then((result) => {
          dispatch(login(result.data));
          addToast("Thay đổi thông tin thành công!", {
            appearance: "success",
            autoDismiss: true,
          });
        })
        .catch(() => {
          addToast("Failed", { appearance: "error", autoDismiss: true });
        });
    }
  };
  return (
    <>
      <Header />
      <Row className="mt-5 mb-5">
        <Col xs={12} xl={8}>
          <Card border="light" className="bg-white shadow-sm mb-4 ">
            <Card.Body>
              <h5 className="mb-4">General information</h5>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group id="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Controller
                      control={control}
                      name="firstName"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Form.Control
                          required
                          type="text"
                          placeholder="Enter your first name"
                          onChange={(e) => onChange(e.target.value)}
                          onBlur={onBlur}
                          value={value}
                          style={{
                            borderColor:
                              errors.firstName?.type === "required" && "red",
                          }}
                        />
                      )}
                      rules={{ required: true }}
                      defaultValue={user?.firstName}
                    />
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group id="firstName">
                    <Form.Label>Last Name</Form.Label>
                    <Controller
                      control={control}
                      name="lastName"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Form.Control
                          required
                          type="text"
                          placeholder="Enter your first name"
                          onChange={(e) => onChange(e.target.value)}
                          onBlur={onBlur}
                          value={value}
                          style={{
                            borderColor:
                              errors.lastName?.type === "required" && "red",
                          }}
                        />
                      )}
                      rules={{ required: true }}
                      defaultValue={user?.lastName}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row></Row>
              <div className="mt-3">
                <Button
                  variant="primary"
                  type="button"
                  onClick={handleSubmit(updateProfile)}
                >
                  Save All
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} xl={4}>
          <Row>
            {/* <Col xs={12}>
              <ProfileCardWidget />
            </Col> */}
            <Col xs={12}>
              <Card border="light" className="bg-white shadow-sm mb-4">
                <Card.Body>
                  <h5 className="mb-4">Select profile photo</h5>
                  <div className="d-xl-flex align-items-center">
                    <div className="user-avatar xl-avatar">
                      {file ? (
                        <img
                          id="target"
                          src={URL.createObjectURL(file)}
                          alt=""
                          className="sizeImage"
                        />
                      ) : user?.avatar ? (
                        <Image fluid rounded src={`${user.avatar}`} />
                      ) : (
                        <Image fluid rounded src={Profile3} />
                      )}
                    </div>
                    <div className="file-field">
                      <div className="d-flex justify-content-xl-center ms-xl-3">
                        <div className="d-flex">
                          <span className="icon icon-md">
                            <FontAwesomeIcon
                              icon={faPaperclip}
                              className="me-3"
                            />
                          </span>
                          <input
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                          />
                          <div className="d-md-block text-start">
                            <div className="fw-normal text-dark mb-1">
                              Choose Image
                            </div>
                            <div className="text-gray small">
                              JPG, GIF or PNG. Max size of 800K
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
      <Footer />
    </>
  );
};
