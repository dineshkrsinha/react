import React from 'react';
import {
    Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle
} from 'reactstrap';

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

function RenderComments({ dish }) {

    if (dish == null)
        return (
            <div></div>
        );
    if (dish.comments == null)
        return (
            <div>n</div>
        );
    const commentsLayout = dish.comments.map((comment) => {
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
        <div className="row m-1">
            <div className="col-sm-5 m-1">
                <RenderDish dish={selectedDish} />
            </div>
            <div className="col-sm-5 m-1">
                <h4>Comments</h4>
                <RenderComments dish={selectedDish} />
            </div>
        </div>
    );

}

export default DishDetail;