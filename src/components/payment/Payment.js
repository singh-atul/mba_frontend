import { Modal } from 'react-bootstrap';
import {useState} from 'react';
import { createBooking } from '../../api/booking';
import {makePayment} from '../../api/payment';
import Loader from '../../assets/simpson.gif'
import { useNavigate } from 'react-router-dom';

function Payment(props) {

    const [isOpen, setIsOpen] = useState(false);
    const [bookingDetail, setBookingDetail] = useState({});
    const [paymentDetail, setPaymentDetail] = useState({});
    const navigate = useNavigate();
    
    const closeModal = () => {
        setIsOpen(false)
        if(paymentDetail.status==="SUCCESS")
            navigate('/'); 
    }

    const finalizePayment = async () =>{
        const data = {
            bookingId: bookingDetail._id,
            amount: bookingDetail.totalCost,
        }        
        const paymentDetail = await makePayment(data);
        setPaymentDetail(paymentDetail.data)
    }
    const openModal = async () => {
        const data = {
            theatreId: props.theater._id,
            movieId: props.movie._id,
            timing: new Date().toLocaleString(),
            noOfSeats: props.noOfSeats,
        }
        const booking = await createBooking(data)
        setBookingDetail(booking.data)
        setIsOpen(true)
    }

    return (
       <>
        <button className='btn btn-danger' onClick={openModal} disabled={props.noOfSeats===0}>Proceed to Payment</button>
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
                    <h5>{props.movie.name}</h5>
                    <small>{props.movie.language}</small>
                    <br />
                    <small className='fw-bolder'>{props.theater.name}</small>
                    <br />
                    <small className='text-success'>m-Ticket</small>

                    
                </div>
                <div className="col-3 text-center">
                    <h5>{props.noOfSeats}</h5>
                    <p>Tickets</p>
                </div>
                <hr className='text-muted'/>
                <div className="row">
                <div className="col"> <p className='fw-bolder'>Total</p></div>
                    <div className="col-2"> <p className='fw-bolder'>Rs.{bookingDetail.totalCost}</p></div>

                </div>
                {
                    paymentDetail.status==="SUCCESS" ? (
                        <>
                        <img src= {Loader} />
                       <div className="bg-success py-1  text-white text-center shadow-lg rounded-3 bg-opacity-75 ">
                       
                        <small className=' fw-bolder'>Booking Confirmed! </small>
                       
                        <div className="row text-center my-2">
                            <div className="col-3">
                            <small className=' fw-bolder'> m-ID:</small>
                            </div>
                            <div className="col-9">
                            <small className='text-uppercase'>{paymentDetail.bookingId}</small>
                            </div>
                            
                           
                        </div>
                       </div>
                       </>
                    ) : (
                        <button className='btn btn-danger' onClick={finalizePayment}>Confirm Payment</button>
                    )
                }
                
            </div>
        </Modal.Body>
       </Modal>
       </>

    )
}

export default Payment;