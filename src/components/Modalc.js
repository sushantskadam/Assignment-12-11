import React, { useState, useEffect } from "react";
import axios from "axios";
import {

  Button,
  Row,
  Col,
  Modal,
  Form,
  
} from "react-bootstrap";

const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForName = /^[a-zA-Z ]{2,100}$/;
const regForContact = RegExp(/^(\+\d{1,3}[- ]?)?\d{10}$/);

function Modalc(props) {
  
  
    const [user, setUser] = useState({
        fname: "",
        lname: "",
        email: "",
        contact: "",
        cource: "",
        query: "",
      });
      const [errors, setErrors] = useState({
        fname: "",
        lname: "",
        email: "",
        contact: "",
      });
    const handler = (event) => {
        const { name, value } = event.target;
    
        // let errors=state.errors;
        switch (name) {
          case "fname":
            let efname = regForName.test(value) ? "" : "Please Enter Valid Name";
            setErrors({ ...errors, fname: efname });
            break;
          case "lname":
            let elname = regForName.test(value) ? "" : "Please Enter Valid Name";
            setErrors({ ...errors, lname: elname });
            break;
          case "email":
            let eemail = regForEmail.test(value) ? "" : "Enter Valid Email";
            setErrors({ ...errors, email: eemail });
            break;
          case "contact":
            let econtact = regForContact.test(value)
              ? ""
              : "Enter Valid 10 Digit Contact No";
            setErrors({ ...errors, contact: econtact });
            break;
    
          default:
        }
        setUser((prevState) => ({
          ...prevState,
          [name]: value,
          cource: props.selectedc,
        }));
    
        // setState({[name]:value},...state);
    
        // setErrors(errors)
      };
    
      const formSubmit = (event) => {
        event.preventDefault();
        // setUser({ ...user, cource: selectedc });
        if (
          validate(errors) &&
          document.getElementById("fname").value !== "" &&
          document.getElementById("lname").value !== "" &&
          document.getElementById("email").value !== "" &&
          document.getElementById("contact").value !== ""
        ) {
          // securePassword(cred.password)
    
          let formData = {
            fname: user.fname,
            lname: user.lname,
            email: user.email,
            contact: user.contact,
            selectedcource: user.cource,
            query: user.query,
          };
    
          const URL = "http://localhost:3003/user/";
          axios.post(URL, formData)
          .then(res=>{
            setUser(res.data)
          })
          // const res = axios.post(URL, formData);
          // setUser(res.data);
          alert("Submitted Succesfully");
          props.setShow(false);
        } else {
          alert("Please Enter Valid Data");
        }
      };
      const validate = (errors) => {
        let valid = true;
        Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
        return valid;
      };
    
    return (
        <div>
             <Modal show={props.show} onHide={props.handleClose}>
          <Modal.Header className="bg-info" closeButton>
            <Modal.Title>Enter Your Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Row>
                  <Col>
                    <Form.Control
                      placeholder="First name"
                      name="fname"
                      id="fname"
                      onChange={handler}
                      //   className={!errors.fname ? '' : 'red-border'}

                      //   error={errors.fname===''?'':'ajfah'} helperText={errors.email}
                    />

                    {errors.fname && (
                      <Form.Text style={{ color: "red" }}>
                        {errors.fname}
                      </Form.Text>
                    )}
                  </Col>
                  <Col>
                    <Form.Control
                      placeholder="Last name"
                      name="lname"
                      id="lname"
                      onChange={handler}
                    />
                    {errors.lname && (
                      <Form.Text style={{ color: "red" }}>
                        {errors.lname}
                      </Form.Text>
                    )}
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  id="email"
                  onChange={handler}
                />
                {errors.email && (
                  <Form.Text style={{ color: "red" }}>{errors.email}</Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicContact">
                <Form.Label>Contact No</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Contact No"
                  name="contact"
                  id="contact"
                  onChange={handler}
                />
                {errors.contact && (
                  <Form.Text style={{ color: "red" }}>
                    {errors.contact}
                  </Form.Text>
                )}
              </Form.Group>

              {props.selectedc && (
                <Form.Group className="mb-3">
                  <Form.Label>Selected Cource</Form.Label>
                  <Form.Control
                    placeholder="Disabled input"
                    value={props.selectedc}
                    // readOnly
                    disabled
                  />
                </Form.Group>
              )}

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Any Query</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Write here"
                  name="query"
                  id="query"
                  onChange={handler}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={formSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>

        </div>
    )
}

export default Modalc
