import React, { useState } from 'react';
import AddLocation from './AddLocation';
import ServicesToLocation from './ServicesToLocation';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import '../Styles/Nav.css';
import AddServices from './AddServices';
import { Link } from 'react-router-dom';

function Nav() {
	const [addLocationModal, setLocationModal] = useState(false);
	const [mapLocationModal, setMapLocationModal] = useState(false);
	const [addServices, setAddServices] = useState(false);

	const toggleAddLocation = () => setLocationModal(!addLocationModal);
	const toggleMAPLocation = () => setMapLocationModal(!mapLocationModal);
	const toggleAddServices = () => setAddServices(!addServices);
	const closeModal = () => {
		setLocationModal(false);
		setMapLocationModal(false);
		setAddServices(false);
	};

	const renderModal = (isOpen, toggle, headerText, ModalName) => (
		<Modal isOpen={isOpen} toggle={toggle} className="modal_custom">
			<ModalHeader toggle={toggle}>{headerText}</ModalHeader>
			<ModalBody>{ModalName}</ModalBody>
		</Modal>
	);

	const renderButton = (toggle, buttonText) => (
		<button color="danger" onClick={toggle}>
			{buttonText}
		</button>
	);

	return (
		<div className="Nav">
			<div className="nav__content">
				<div className="nav__name">
					<h2>Dunzo</h2>
				</div>

				<div className="nav__links">
					<Link className="toregisterstore" to="/registerstore">
						Become our partner
					</Link>
					{renderButton(toggleAddLocation, 'Add Location')}
					{renderModal(
						addLocationModal,
						toggleAddLocation,
						'Add your Location!',
						<AddLocation onClick={closeModal} />
					)}

					{renderButton(toggleMAPLocation, 'Map Location')}
					{renderModal(
						mapLocationModal,
						toggleMAPLocation,
						'Map your Locations',
						<ServicesToLocation onClick={closeModal} />
					)}

					{renderButton(toggleAddServices, 'Add Services')}
					{renderModal(
						addServices,
						toggleAddServices,
						'Add your Services',
						<AddServices onClick={closeModal} />
					)}
				</div>
			</div>
		</div>
	);
}

export default Nav;
