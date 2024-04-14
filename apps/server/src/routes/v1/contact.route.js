const express = require('express');

const { contactController } = require('../../controllers');

const router = express.Router();

router.route('/').post(contactController.createContact).get(contactController.getContacts);

router.route('/:contactId').patch(contactController.updateContact).delete(contactController.deleteContact);

module.exports = router;
