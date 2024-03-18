import React, { useEffect, useState } from 'react'
import MainScreen from '../../components/MainScreen'
import { Accordion,Badge, Button,Card } from 'react-bootstrap'
import { Link } from "react-router-dom";
import axios from "axios";
const MyNotes = () => {
  const [notes, setNotes] = useState([]);


  const deleteHandler =(id)=>{
    if(window.confirm("Are you sure")){

    }
    }
    const fetchNotes = async ()=> {
      const {data}= await axios.get("/api/notes");
setNotes(data)
};
    useEffect(()=>{
      fetchNotes();
    },[])
  return (
    <MainScreen title="welcome yazin">
      <Link to="createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create New Note
        </Button>
      </Link>

      {notes.map((note) => (
        <Accordion defaultActiveKey="0" key={note._id}>
          <Accordion.Item eventKey="0">
            <Card>
              <Card.Header style={{ display: "flex" }}>
                <span
                  style={{
                    color: "black",
                    textDecoration: "none",
                    flex: 1,
                    cursor: "pointer",
                    alignSelf: "center",
                    fontSize: 18,
                  }}
                >
                  <Accordion.Header>{note.title}</Accordion.Header>
                </span>
                <Button>Edit</Button>
                <Button
                  variant="danger"
                  className="mx-2"
                  onClick={() => deleteHandler(note._id)}
                >
                  Delete
                </Button>
              </Card.Header>
              <Accordion.Body>
                <Card.Body>
                  <h4>
                    <Badge>Category -{note.category}</Badge>
                  </h4>
                  <blockquote className="blockquote mb-0">
                    <p>{note.content}</p>
                    <footer className="blockquote-footer">
                      Created On - date
                    </footer>
                  </blockquote>
                </Card.Body>
              </Accordion.Body>
            </Card>
          </Accordion.Item>
        </Accordion>
      ))}
    </MainScreen>
  );
}

export default MyNotes