import React, { useEffect, useState } from 'react'
import {Button} from "react-bootstrap";
import {ReactModal} from "react-modal"; 
import {Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const apiURL = `https://api.github.com`;

export default function AddNewIssue(props) {
    const [isShow, setIsShow]= useState(false);
    const [title, setTitle]=useState("");
    const [details,setDetails]=useState("");
    

    const toggle= () =>{
        setIsShow(!isShow);

    }


    const handleSubmitNewIssues = async () => { 
        console.log("ddddd",props.owner, props.repos,props.token)
        if(!title){
            alert("title is required")
            return false;
        }
        const issue= { "title":title, "body":details};
        const url = `${apiURL}/repos/${props.owner}/${props.repos}/issues`;
        const response = await fetch(url,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": `token ${props.token}`
                },
                body: JSON.stringify(issue),
            }
        );
        setTitle("");
        setDetails("");
        toggle();

        
    }

    return (
       
        <div>
            <Button variant="primary" onClick={()=>toggle()}>Add New Issue</Button>

            <Modal isOpen={isShow} style={{
                overlay: {  // 부모 (배경)
                  backgroundColor: "rgb(0,255,255,0.2)", // 네번째는 투명도 0에서 1 사이
                  display:"flex",
                  justifyContent:"center",
                  
                  alignItems: "center"
                },
                content: { // 자식 (비디오)
                  color: "black",
                  width:"70%",
                  height:"70%",
                  position: "relative"
                
                }
    
              }}>

                <ModalHeader closeButton >Modal title</ModalHeader>
                <ModalBody>
                <div>
                            Title:
                        <input type="text" name="title" onChange={e=>setTitle(e.target.value)} />
                        </div>
                        <div>
                            Description:
                        <textarea name="body" onChange={e=>setDetails(e.target.value)} ></textarea>
                        </div>
                </ModalBody>
                <ModalFooter>
                        <Button color="primary" onClick={handleSubmitNewIssues}>Add</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>

            </Modal>
            {/* <Modal  show={isShow} contentLabel="Add New Issue"
              style={{
                overlay: {  // 부모 (배경)
                  backgroundColor: "rgb(0,255,255,0.2)", // 네번째는 투명도 0에서 1 사이
                  display:"flex",
                  justifyContent:"center",
                  
                  alignItems: "center"
                },
                content: { // 자식 (비디오)
                  color: "black",
                  width:"70%",
                  height:"70%",
                  position: "relative"
                
                }
    
              }}>
               <Modal.Header closeButton>Modal title</Modal.Header>
            </Modal> */}
        </div>
    )
}
