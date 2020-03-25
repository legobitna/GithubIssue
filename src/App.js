import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import ReactModal from "react-modal";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import {
  Nav,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button
} from "react-bootstrap";
import ShowIssues from "./components/ShowIssues";
import AddNewIssue from "./components/AddNewIssue";
import Pagination from "pagination-component";
import { css } from "glamor";

const pageLink = css({
  margin: "2px",
  display: "inline-block",
  padding: "2px",
  WebkitBorderRadius: "20px",
  MozBorderRadius: "20px",
  borderRadius: "20px"
});

const currentLink = css({
  backgroundColor: "#0074c2",
  display: "inline-block",
  color: "#FFFFFF",
  "a:link": { color: "#FFFFFF" },
  "a:visited": { color: "#FFFFFF" },
  "a:active": { color: "#FFFFFF" }
});

const clientId = process.env.REACT_APP_CLIENT_ID;
let owner = "";
let repos = "";
function App() {
  const [token, setToken] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [issues, setIssues] = useState(null);
  const [singleIssue, setSingleIssue] = useState({});
  const [showModal, setShowmodal] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState([]);
  const [issueNumber, setIssueNumber] = useState(null);
  // 토큰 기존에 로컬스토리지에 있으면 그거불러오거나 없으면 서버에서 받은 거 가져와서 로컬스토리지에 세팅하기
  useEffect(() => {
    const existingToken = localStorage.getItem("token");
    console.log("object", window.location);
    const accessToken =
      window.location.search.split("=")[0] === "?access_token"
        ? window.location.search.split("=")[1].split("&")[0]
        : null;

    if (!accessToken && !existingToken) {
      console.log(
        `https://github.com/login/oauth/authorize?scope=user:email,repo&client_id=${clientId}`
      );
      window.location.replace(
        `https://github.com/login/oauth/authorize?scope=user:email,repo&client_id=${clientId}`
      );
    }

    if (accessToken) {
      localStorage.setItem("token", accessToken);
      setToken(accessToken);
    }

    if (existingToken) {
      setToken(existingToken);
    }
  }, []);

  const search = async (keywordfromSearch, pagenum) => {
    const keywordSplit = keywordfromSearch.split("/");
    if (keywordSplit.length == 2) {
      owner = keywordSplit[0];
      repos = keywordSplit[1];

      const url = `https://api.github.com/repos/${owner}/${repos}/issues?page=${pagenum}&per_page=20`;
      const response = await fetch(url);
      const data = await response.json();
      console.log("data", data);
      setIssues(data);
      setPage(pagenum);
    } else {
      alert("wrong");
    }
  };

  const onLoad = i => {
    search(keyword, i + 1);
  };

  const toggleMovie = async id => {
    setIssueNumber(id);
    const url = `https://api.github.com/repos/${owner}/${repos}/issues/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log("single issue", data.comments);
    setSingleIssue(data);
    console.log("comments number", singleIssue.comments);
    if (data.comments > 0) {
      const urlComment = `https://api.github.com/repos/${owner}/${repos}/issues/${id}/comments`;
      const responseComment = await fetch(urlComment);
      const dataComment = await responseComment.json();
      setComments(dataComment);
    }
    setShowmodal(true);
  };

  const postComment = async () => {
    console.log("fkre");
    if (!comment) {
      alert("comment is required");
      return false;
    }
    const issue = { body: comment };
    const url = `https://api.github.com/repos/${owner}/${repos}/issues/${issueNumber}/comments`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `token ${token}`
      },
      body: JSON.stringify(issue)
    });
    setComment("");
    toggleMovie(issueNumber);
  };
  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">GitHub</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form
            inline
            onSubmit={e => {
              e.preventDefault();
              search(keyword, 1);
            }}
            onChange={e => {
              setKeyword(e.target.value);
            }}
          >
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success" type="submit">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>

      <Pagination
        currentPage={page - 1}
        pageCount={50}
        pageLinkClassName={pageLink}
        currentLinkClassName={currentLink}
        onPageClick={i => {
          onLoad(i);
        }}
      />
      <AddNewIssue token={token} owner={owner} repos={repos}></AddNewIssue>
      <ShowIssues getissues={issues} toggleModal={toggleMovie} />
      <ReactModal
        closeTimeoutMS={200}
        isOpen={showModal}
        contentLabel="Inline Styles Modal Example"
        onRequestClose={() => setShowmodal(false)}
        shouldCloseOnOverlayClick={true}
        style={{
          overlay: {
            // 부모 (배경)
            backgroundColor: "rgb(0,255,255,0.2)", // 네번째는 투명도 0에서 1 사이
            display: "flex",
            justifyContent: "center",

            alignItems: "center"
          },
          content: {
            // 자식 (비디오)
            color: "black",
            width: "70%",
            height: "70%",
            position: "relative"
          }
        }}
      >
        <h1>
          #{singleIssue.number} {singleIssue.title}
        </h1>
        <h3>{singleIssue.state}</h3>
        <p>create date: {singleIssue.created_at}</p>
        <p>update date: {singleIssue.updated_at}</p>
        {singleIssue.comments > 0 ? (
          <div>
            <h3 style={{ marginRight: 10 }}>Comments</h3>
            {comments.map(comment => {
              console.log("cccc", comment);
              return (
                <div>
                  {comment.body}
                  {comment.created_at}
                  {comment.user.login}
                </div>
              );
            })}
          </div>
        ) : (
          <div>There is no comment </div>
        )}
        <div style={{ display: "flex" }}>
          <input
            type="text"
            placeholder="input the comment here"
            onChange={e => setComment(e.target.value)}
          />
          <Button onClick={() => postComment()}>Add Comment</Button>{" "}
        </div>
      </ReactModal>
    </div>
  );
}

export default App;
