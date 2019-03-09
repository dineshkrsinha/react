import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem,
    Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label, Row, Col
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
    }

    handleSubmitComment(event) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, event.rating, event.author, event.comment);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    render() {
        return (
            <div className="container">
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.handleSubmitComment}>Submit Comment</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmitComment(values)}>
                    <Row className="form-group">
                        <Label htmlFor="rating" md={10}>Rating</Label>
                        <Col md={10}>
                            <Control.select model=".rating" id="rating" name="rating"
                                placeholder="Rating"
                                className="form-control"
                                validators={{
                                    required
                                }}
                            >
                            <option value=""></option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            </Control.select>
                            <Errors
                                        className="text-danger"
                                        model=".rating"
                                        show="touched"
                                        messages={{
                                            required: 'Required'
                                        }}
                                    />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="yourname" md={10}>Your Name</Label>
                        <Col md={10}>
                            <Control.text model=".yourname" id="yourname" name="yourname"
                                placeholder="Your Name"
                                className="form-control"
                                validators={{
                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                }}
                            />
                            <Errors
                                        className="text-danger"
                                        model=".yourname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="comment" md={10}>Comment</Label>
                        <Col md={10}>
                            <Control.textarea model=".comment" id="comment" name="comment"
                                placeholder="Comment" rows="6"
                                className="form-control"
                            />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Col md={{ size: 10, offset: 2 }}>
                            <Button type="submit" color="primary">
                                Send Feedback
                                    </Button>
                        </Col>
                    </Row>
                </LocalForm>

                    </ModalBody>
                </Modal>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <Button outline onClick={this.toggleModal}><span className="fa fa-edit fa-lg"></span> Submit Comment</Button>
                    </NavItem>
                </Nav>
            </div>
        );
    }
}


class RenderComments extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var comments = this.props.comments;
        if (comments == null)
            return (
                <div></div>
            );
        const commentsLayout = comments.map((comment) => {
            var formattedString =
                new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)));

            return (
                <div className="row">
                    <div className="row">
                        <div className="col m-1">
                            {comment.comment}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col m-1">
                            ---{comment.author}, {formattedString}
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div className="container">
                {commentsLayout}
                <div className="mt-4 container">
                    <CommentForm comments={this.props.comments} 
                                 dishId={this.props.dishId} 
                                 addComment={this.props.addComment} />
                </div>
            </div>
        );
    }
}




function RenderDish({ dish }) {

    if (dish != null)
        return (
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    else
        return (
            <div></div>
        );

}




const DishDetail = (props) => {

    var { selectedDish } = props;
    if (props.dish) {
        selectedDish = props.dish
    }
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>

                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments}
                        addComment={props.addComment}
                        dishId={props.dish.id} />
                </div>
            </div>
        </div>
    );

}

export default DishDetail;