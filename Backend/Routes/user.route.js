const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	if (req.session.servicepPoviderid) {
		return res.json({
			type: 'serviceprovider',
			id: req.session.servicepPoviderid,
		});
	}
	if (req.session.customer) {
		return res.json({
			type: 'customer',
			id: req.session.servicepPoviderid,
		});
	}
	if (req.session.admin) {
		return res.json({
			type: 'admin',
			id: req.session.servicepPoviderid,
		});
	}
});

module.exports = router;
