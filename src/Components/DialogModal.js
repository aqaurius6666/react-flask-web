import React, { useEffect, useState } from "react"
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import { checkCID, checkSID } from "../data/superData";
import Button from "react-bootstrap/Button";
import { formatTime } from '../data/superData'

export function MydModalWithGrid(props) {
    console.log(props.value)
    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Details Information
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <Container>
                    <Row>
                        <Col xs={12}>
                            <p>Course's Name: {props.value.name}</p>
                            <p>CID: {props.value.cid}</p>
                            <p>Credits: {props.value.credit}</p>
                            <p>Place: {checkCID(props.value.cid).place}</p>
                            <p>Time: {formatTime(checkCID(props.value.cid).time)}</p>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}