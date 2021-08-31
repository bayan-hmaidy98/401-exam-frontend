import React from 'react';

import {Modal, Form, Button} from 'react-bootstrap';

export class UpdateForm extends React.Component {
    render() {
        return (
            <div>
                <Modal show = {this.props.show} onHide ={this.props.showingModal} >
                    <Modal.Header closeButton>
                        <Modal.Title>Update the coin</Modal.Title>
                    </Modal.Header>

                    <Form onSubmit={(e) => this.props.updateModal(e)} >
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" defaultValue= {this.props.coinsObj.title}  name="title"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" defaultValue= {this.props.coinsObj.description}  name="description"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="text" defaultValue= {this.props.coinsObj.image_url}  name="image_url" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Price in Usd</Form.Label>
                            <Form.Control type="text" defaultValue= {this.props.coinsObj.toUSD}  name="toUSD" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.showingModal} >Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default UpdateForm
