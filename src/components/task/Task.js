import React, {Component} from 'react';
import {Container, FormControl, InputGroup} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import generateRandomId from "../../util/AppUtil";
import classes from './task.module.css'
import Card from "react-bootstrap/Card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import AppModal from "../modals/AppModal";
import {faEdit} from "@fortawesome/free-solid-svg-icons/faEdit";


let appModalTitle;
let appModalBody;
let appModalAction;
let appModalCancel;

class Task extends Component {

    state = {
        newTaskName: '',
        isOpenConfirmRemoveTaskModal: false,
        removedTaskId: 0,
        tasks: []

    }

    changeOpenStatus = () => {
        this.setState({
            isOpenConfirmRemoveTaskModal: !this.state.isOpenConfirmRemoveTaskModal
        })
    }
    handleAddTaskKeyDown = (event) => {
        if (event.key === 'Enter')
            this.addTask();
    };

    removeTask = (taskId) => {
        this.setState({
            tasks: this.state.tasks.filter(obj => obj.id !== taskId),
            isOpenConfirmRemoveTaskModal: !this.state.isOpenConfirmRemoveTaskModal

        })
    };


    constructor(props) {
        super(props);
    }

    cancelRemovingTask = () => {
        this.setState({
            isOpenConfirmRemoveTaskModal: !this.state.isOpenConfirmRemoveTaskModal
        })
    }

    addTask = () => {
        const {newTaskName, tasks} = this.state;
        if (newTaskName != '') {
            let allTasks = [{taskName: newTaskName, id: generateRandomId()}, ...tasks]
            this.setState({
                'tasks': allTasks,
                newTaskName: ''
            })
        }
    };

    handleAddTaskInputChange = (event) => {
        if (event.target.value != '')
            this.setState({
                newTaskName: event.target.value,
            })
    };

    setRemovedTaskIdAndOpenModal = (taskId) => {
        return (event)=>{
            appModalTitle='Confirmation';
            appModalBody='Do you want to remove the task?';
            appModalAction=this.removeTask
            appModalCancel=this.cancelRemovingTask;
            this.changeOpenStatus()
            this.setState(
                {
                    removedTaskId: taskId
                })
        }

    }

    // editTaskModalBody=(task)=>{
    //     return
    // }

    editTask=(task)=> {

        return  (event) =>{
            let body = <input key={task.id} value={task.taskName} />;
            appModalTitle='Edit task';
            appModalBody=body;
            appModalAction=this.removeTask
            appModalCancel=this.cancelRemovingTask;
            this.changeOpenStatus()
        };
    }

    render() {
        let {removedTaskId, isOpenConfirmRemoveTaskModal} = this.state;
        const tasks = this.state.tasks.map((task, index) =>
            <Col
                key={task.id}>
                <Card style={{width: '16rem', margin: '10px auto'}}>
                    <Card.Body>
                        <Card.Title style={{color: 'red'}}>Task N{this.state.tasks.length - index}</Card.Title>
                        {/*<Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>*/}
                        <Card.Text>
                            {task.taskName}
                        </Card.Text>
                        <Button
                            onClick={this.setRemovedTaskIdAndOpenModal(task.id)}
                            variant={"danger"}>
                            <FontAwesomeIcon icon={faTrash}/> Remove
                        </Button>
                        <Button style={{
                            margin: 'auto 15px',
                            backgroundColor: '#007bff',
                            border:'#007bff'
                        }}
                                onClick={this.editTask(task)}
                                variant={"danger"}>
                            <FontAwesomeIcon icon={faEdit}/> Edit
                        </Button>
                    </Card.Body>
                </Card>
            </Col>
        )
        return (
            <Container fluid={true}>
                <Row>
                    <Col md={{span: 6, offset: 2}}>
                        <InputGroup
                            className="my-3">
                            <FormControl
                                value={this.state.newTaskName}
                                onChange={this.handleAddTaskInputChange}
                                onKeyDown={this.handleAddTaskKeyDown}
                                placeholder="Task name"
                                aria-label="Task name"
                                aria-describedby="basic-addon2"
                            />
                            <InputGroup.Append>
                                <Button className={classes.add_btn}
                                        onClick={this.addTask}
                                        variant="outline-secondary">Add Task</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    {tasks}
                </Row>
                {/*{isOpenConfirmRemoveTaskModal && <AppModal*/}
                {/*    title={'Confirmation'}*/}
                {/*    body={'Do you want to remove the task?'}*/}
                {/*    action={this.removeTask}*/}
                {/*    cancel={this.cancelRemovingTask}*/}
                {/*    show={isOpenConfirmRemoveTaskModal}*/}

                {/*    removedTaskId={removedTaskId}/>}*/}

                {isOpenConfirmRemoveTaskModal && <AppModal
                    title={appModalTitle}
                    body={appModalBody}
                    action={appModalAction}
                    cancel={appModalCancel}
                    show={isOpenConfirmRemoveTaskModal}

                    removedTaskId={removedTaskId}/>}
            </Container>
        );
    }

}

export default Task;