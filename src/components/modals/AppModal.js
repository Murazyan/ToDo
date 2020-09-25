import React, {Component} from 'react';
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap"


class AppModal extends Component {

    constructor(props) {
        super(props);
        this.removedTaskId=props.removedTaskId;
        this.show = props.show
        this.action=props.action
        this.cancel= props.cancel
        this.title = props.title
        this.body = props.body
    }


    render(){

        return(
            <Modal
                show={this.show}
                onHide={()=>this.cancel()}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{this.body}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={()=>this.cancel()}>
                        No
                    </Button>
                    <Button
                        onClick={()=>this.action(this.removedTaskId)}
                        variant="danger">
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
export default AppModal;