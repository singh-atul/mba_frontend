import { Modal } from 'react-bootstrap';
import {useState} from 'react';

function Payment() {
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false)
    }

    const openModal = () => {
        setIsOpen(true)
    }

    return (
       <>
        <button className='btn btn-danger' onClick={openModal}>Proceed to Payment</button>
       <Modal 
       size="sm"
       show={isOpen}
       onHide={closeModal}
       centered
       contentClassName="bg-light"
       backdrop="static"
       >
        <Modal.Header closeButton><Modal.Title className='text-danger fw-lighter'>ORDER SUMMARY</Modal.Title></Modal.Header>
        <Modal.Body>
            <div className='row fw-lighter'>
                <div className="col my-2">
                    <h5>Movie Name</h5>
                    <small>English</small>
                    <br />
                    <small className='fw-bolder'>Theatre Name</small>
                    <br />
                    <small className='text-success'>m-Ticket</small>

                    
                </div>
                <div className="col-3 text-center">
                    <h5>2</h5>
                    <p>Tickets</p>
                </div>
                <hr className='text-muted'/>
                <div className="row">
                <div className="col"> <p className='fw-bolder'>Total</p></div>
                    <div className="col-2"> <p className='fw-bolder'>Rs.300</p></div>

                </div>
                <button className='btn btn-danger'>Confirm Payment</button>
            </div>
        </Modal.Body>
       </Modal>
       </>

    )
}

export default Payment;