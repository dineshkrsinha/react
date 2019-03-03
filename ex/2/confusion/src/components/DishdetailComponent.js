import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

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

function RenderComments({ comments }) {
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
        </div>
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
                <RenderComments comments={props.comments} />
            </div>
        </div>
        </div>
    );

}

export default DishDetail;