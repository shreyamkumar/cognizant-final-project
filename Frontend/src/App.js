import React, { useState } from 'react';
import AddLocation from './Components/addLocation';
import ServicesToLocation from './Components/servicesToLocation';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

function App(props) {
	const { className } = props;

	const [addLocationModal, setLocationModal] = useState(false);
	const [mapLocationModal, setMapLocationModal] = useState(false);

	const toggleAddLocation = () => setLocationModal(!addLocationModal);
	const toggleMAPLocation = () => setMapLocationModal(!mapLocationModal);
	const submit = (values) => {
		alert('submitted');
		console.log(values);
	};
	return (
		<div className="App">
			<Button color="danger" onClick={toggleAddLocation}>
				Add Location
			</Button>
			<Modal isOpen={addLocationModal} toggle={toggleAddLocation} className={className}>
				<ModalHeader toggle={toggleAddLocation}>Add your Location!</ModalHeader>
				<ModalBody>
					<AddLocation onSubmit={submit} />
				</ModalBody>
			</Modal>
			<Button color="danger" onClick={toggleMAPLocation}>
				Map Location to Services
			</Button>
			<Modal isOpen={mapLocationModal} toggle={toggleMAPLocation} className={className}>
				<ModalHeader toggle={toggleMAPLocation}>Add your Location!</ModalHeader>
				<ModalBody>
					<ServicesToLocation />
				</ModalBody>
			</Modal>
		</div>
	);
}

export default App;
