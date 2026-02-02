import express from 'express'
import { getContacts, showSingleContact, addContact,  showupdatedContact, updateContact, deleteContact } from '../controllers/contacts.controller.js'

const router = express.Router();

router.get("/", getContacts)

router.get("/show-contact/:id", showSingleContact)

router.get("/add-contact", (req, res) => { res.render("add-contact") })

router.post("/add-contact", addContact)

router.get("/update-contact/:id", showupdatedContact)

router.post("/update-contact/:id", updateContact)

router.get("/delete-contact/:id", deleteContact)

export default router;