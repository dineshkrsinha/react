import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';
import Dishdetail from './DishdetailComponent';

    class Menu extends Component {

        constructor(props) {
            super(props);
    
            this.state = {
                //selectedDish: this.props.dishes[0]
                selectedDish: null
            }
        }
    
        onDishSelect(dish) {
            this.setState({ selectedDish: dish});
            if(this.state.selectedDish)
                console.log ("onDishSelect selected id  = " + this.state.selectedDish.id);
            else
                console.log ("onDishSelect selected dish is null");
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
            const menu = this.props.dishes.map((dish) => {
                return (
                  <div  className="col-12 col-md-5 m-1">
                    <Card key={dish.id}
                      onClick={() => this.onDishSelect(dish)}>
                      <CardImg width="100%" src={dish.image} alt={dish.name} />
                      <CardImgOverlay>
                          <CardTitle>{dish.name}</CardTitle>
                      </CardImgOverlay>
                    </Card>
                  </div>
                );
            });
    
            return (
                <div className="container">
                    <div className="row">
                        {menu}
                    </div>
                    <Dishdetail selectedDish={this.state.selectedDish} />
                </div>
            );
        }
    }
    

export default Menu;