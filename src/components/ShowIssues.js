import React from 'react'
import './ShowIssues.css'
import {Container,Row,Col} from 'react-bootstrap'
import Label from './Label'

import "bootstrap/dist/css/bootstrap.min.css";


const ReactMarkdown = require('react-markdown')

export default function ShowIssues(props) {
    console.log('pp',props.getissues)
    return (
        <div>
            {props.getissues && props.getissues.map((item,index) =>{
                return  <>
                <Container>
                    <Row>
                        <Col sm={8}>
                            <div className="issuebody">
                         <h2><a href="#" onClick={()=>props.toggleModal(item.number)}>#{item && item.number} {item && item.title}</a></h2>
                         <div><ReactMarkdown source={item && item.body}/></div>
                         <div>date:{item && item.created_at}</div>
                    </div>
                        </Col>

                    <Col sm={4}>
                         <div className="user">
                        <img src={item && item.user.avatar_url}/>
                        <span>ID: {item && item.user.login}</span>
                        {/* <Label label={item&&item.labels}/> */}
                        <Label label={item && item.state}/>
                       </div>
                    </Col>
                   
                    </Row>
                </Container>               
                </>
            
        })}
            
        </div>
    )
}
