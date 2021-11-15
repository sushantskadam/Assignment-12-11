import React, { useState, useEffect } from "react";
import axios from "axios";
import {

  Button,
  Row,
  Container,
  Col,
  Table,
  Modal,
  Form,
  
} from "react-bootstrap";

const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForName = /^[a-zA-Z ]{2,100}$/;
const regForContact = RegExp(/^(\+\d{1,3}[- ]?)?\d{10}$/);
const client = axios.create({
  baseURL: "http://localhost:3002/cources",
});

function CourceList() {
  const [cources, setCources] = useState([]);
  const [selectedc, setSelectedc] = useState();
//   const selectedref = useRef(null);
  const [show, setShow] = useState(false);
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
  const handleClose = () => setShow(false);
  const handleShow = (cname) => {
    setShow(true);
    setSelectedc(cname);
    console.log(cname);
  };

  useEffect(() => {
    client
      .get()
      .then((res) => {
        setCources(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
      cource: selectedc,
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
      setShow(false);
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
      <Container>
        <Table striped bordered hover>
          <thead className="bg-warning bg-gradient">
            <tr>
              <th>Cources</th>
              <th>Duration</th>
              <th>Enquiry</th>
            </tr>
          </thead>
          <tbody>
            {cources.map((cource, i) => (
              <tr className="bg-info bg-gradient" key={i}>
                <td>
                  <b>{cource.cname}</b>
                </td>
                <td>{cource.duration}</td>
                <td>
                  {" "}
                  <Button
                    variant="success"
                    onClick={() => handleShow(cource.cname)}
                  >
                    Enquiry
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Modal show={show} onHide={handleClose}>
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

              {selectedc && (
                <Form.Group className="mb-3">
                  <Form.Label>Selected Cource</Form.Label>
                  <Form.Control
                    placeholder="Disabled input"
                    value={selectedc}
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
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={formSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default CourceList;
