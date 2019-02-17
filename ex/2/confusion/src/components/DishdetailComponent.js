import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';

    class DishDetail extends Component {

        constructor(props) {
            super(props);
            console.log ("......Dishdetail constructor ");
        }

        renderDish(dish) {
            if (dish != null)
                return(
                    <Card>
                        <CardImg top src={dish.image} alt={dish.name} />
                        <CardBody>
                          <CardTitle>{dish.name}</CardTitle>
                          <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                );
            else
                return(
                    <div></div>
                );
        }


        renderComments(dish) {
            if(dish == null)
                return(
                    <div></div>
                );
            if(dish.comments == null)
                return(
                    <div>n</div>
                );
            const commentsLayout =dish.comments.map((comment) => {
                    var formattedDate = new Date(comment.date);
                    var formattedString = formattedDate.toDateString();

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
    
        render() {
            const { selectedDish } = this.props;
            return (
                    <div className="row m-1">
                        <div className="col-sm-5 m-1">
                            {this.renderDish(selectedDish)}
                        </div>
                        <div className="col-sm-5 m-1">
                            <h4>Comments</h4>
                            {this.renderComments(selectedDish)}
                        </div>
                    </div>
            );
        }
    
    }
    

export default DishDetail;