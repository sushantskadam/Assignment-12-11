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
import Modalc from "./Modalc"

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
        <Modalc selectedc={selectedc} handleClose={handleClose} show={show} setShow={setShow}/>
             </Container>
    </div>
  );
}

export default CourceList;
