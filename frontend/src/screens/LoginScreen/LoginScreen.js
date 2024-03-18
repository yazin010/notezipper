import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import "./LoginScreen.css";
import {  useState } from "react";
import axios from "axios";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";

function LoginScreen() {

  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [error,setError ]=useState(false)
  const [loading,setLoading]=useState(false)
 
  const submitHandler =async(e)=>{
    e.preventDefault();
  
  try{
    const config = {
      headers:{
        "Content-type":"application/json",
      },
    };
    setLoading(true);
    const {data}=await axios.post(
      "/api/users/login",
      {
        email,
        password,
      },
      config
    );
    setLoading(false);
    console.log(data)
    localStorage.setItem("userInfo",JSON.stringify(data));

  }catch(error){
    setError(error.response.data.message);
    setLoading(false);

  }
}

  return (
    <MainScreen title="LOGIN">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            New Customer ? <Link to="/register">Register Here</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
}

export default LoginScreen;
