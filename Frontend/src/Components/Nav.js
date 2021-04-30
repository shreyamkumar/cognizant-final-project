import React, { useState } from 'react';
import AddLocation from './AddLocation';
import ServicesToLocation from './ServicesToLocation';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import '../Styles/Nav.css';

function Nav() {
	const [addLocationModal, setLocationModal] = useState(false);
	const [mapLocationModal, setMapLocationModal] = useState(false);

	const toggleAddLocation = () => setLocationModal(!addLocationModal);
	const toggleMAPLocation = () => setMapLocationModal(!mapLocationModal);
	const submit = (values) => {
		alert('submitted');
		console.log(values);
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
					{renderButton(toggleAddLocation, 'Add Location')}
					{renderModal(
						addLocationModal,
						toggleAddLocation,
						'Add your Location!',
						<AddLocation onSubmit={submit} />
					)}

					{renderButton(toggleMAPLocation, 'Map Location')}
					{renderModal(
						mapLocationModal,
						toggleMAPLocation,
						'Map your Locations',
						<ServicesToLocation onSubmit={submit} />
					)}
				</div>
			</div>
		</div>
	);
}

export default Nav;
