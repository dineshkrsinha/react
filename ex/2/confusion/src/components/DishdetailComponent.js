import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';

    class Dishdetail extends Component {

        constructor(props) {
            super(props);
            console.log ("......Dishdetail constructor ");
            //console.log ("Dishdetail constructor = " + this.props.id);
            /*this.state = {
                selectedDish: this.props.selectedDish
            }*/
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

    
        render() {
            const { selectedDish } = this.props;
            return (
                <div className="container">
                    {this.renderDish(selectedDish)}
                </div>
            );
        }
    
    }
    

export default Dishdetail;