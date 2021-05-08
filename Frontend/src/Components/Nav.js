import React, { useState } from 'react';
import AddLocation from './AddLocation';
import ServicesToLocation from './ServicesToLocation';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import '../Styles/Nav.css';
import AddServices from './AddServices';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, logoutUser } from '../features/userSlice';

function Nav() {
	const [addLocationModal, setLocationModal] = useState(false);
	const [mapLocationModal, setMapLocationModal] = useState(false);
	const [addServices, setAddServices] = useState(false);
	const { typeofuser } = useSelector(selectUser);
	const history = useHistory();
	const toggleAddLocation = () => setLocationModal(!addLocationModal);
	const toggleMAPLocation = () => setMapLocationModal(!mapLocationModal);
	const toggleAddServices = () => setAddServices(!addServices);
	const closeModal = () => {
		setLocationModal(false);
		setMapLocationModal(false);
		setAddServices(false);
	};
	const dispatch = useDispatch();

	const renderModal = (isOpen, toggle, headerText, ModalName) => (
		<Modal isOpen={isOpen} toggle={toggle} className="modal_custom">
			<ModalHeader toggle={toggle}>{headerText}</ModalHeader>
			<ModalBody>{ModalName}</ModalBody>
		</Modal>
	);

	const renderButton = (toggle, buttonText) => (
		<button className="nav-button" color="danger" onClick={toggle}>
			{buttonText}
		</button>
	);
	const logout = (e) => {
		dispatch(logoutUser());
		history.push('/');
	};

	return (
		<div className="Nav">
			<div className="nav__content">
				<div className="nav__name">
					<Link className="dunzo" to="/">
						<h2>Dunzo</h2>
					</Link>
				</div>

				<div className="nav__links">
					{typeofuser !== 'admin' && typeofuser !== 'customer' && (
						<Link className="toregisterstore" to="/registerstore">
							Become our partner
						</Link>
					)}

					{typeofuser === 'admin' && renderButton(toggleAddLocation, 'Add Location')}
					{renderModal(
						addLocationModal,
						toggleAddLocation,
						'Add your Location!',
						<AddLocation onClick={closeModal} />
					)}

					{typeofuser === 'admin' && renderButton(toggleMAPLocation, 'Map Location')}
					{renderModal(
						mapLocationModal,
						toggleMAPLocation,
						'Map your Locations',
						<ServicesToLocation onClick={closeModal} />
					)}

					{typeofuser === 'admin' && renderButton(toggleAddServices, 'Add Services')}
					{renderModal(
						addServices,
						toggleAddServices,
						'Add your Services',
						<AddServices onClick={closeModal} />
					)}

					{typeofuser === null && (
						<Link className="signup" to="/signup">
							Become a Customer
						</Link>
					)}
					{typeofuser === null && (
						<Link className="signin" to="/signin">
							Sign in
						</Link>
					)}
					{typeofuser !== null && (
						<button className="nav-button" onClick={(e) => logout(e)}>
							Logout
						</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default Nav;
