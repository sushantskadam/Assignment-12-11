import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table } from "react-bootstrap";
function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const URL = "http://localhost:3003/user";
    axios.get(URL).then((res) => {
      setUsers(res.data);
    });
  }, []);

  return (
    <div>
      <Container>
        <Table striped bordered hover>
          <thead className="bg-warning bg-gradient">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Contact No</th>
              <th>Selected Cource</th>
              <th>Query</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr className="bg-info bg-gradient" key={i}>
                <td>{`${user.fname} ${user.lname} `}</td>
                <td>{user.email}</td>
                <td>{user.contact}</td>
                <td>{user.selectedcource}</td>
                <td>{user.query}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default Users;
