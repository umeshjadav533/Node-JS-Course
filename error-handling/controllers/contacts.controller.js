import mongoose from "mongoose";
import contact from "../models/contact.model.js";

const getContacts = async (req, res) => {
    const contacts = await contact.find();
    res.render("home", { contacts });
};

const showSingleContact = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.render('404', { message: "Invalid Id" });
    }

    try {
        const singleContact = await contact.findById(req.params.id);
        if (!singleContact) return res.render('404', { message: "Contact nnot found" })
        res.render("show-contact", { singleContact });
    } catch (error) {
        res.redner('500', { message: error })
    }

};

const addContact = async (req, res) => {
    try {
        // await contact.insertOne({
        //     first_name: req.body.first_name,
        //     last_name: req.body.last_name,
        //     email: req.body.email,
        //     phone: req.body.phone,
        //     address: req.body.address
        // });
        await contact.create(req.body)
        res.redirect("/")
    } catch (error) {
        res.render('500', { message: error })
    }

};

const showupdatedContact = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.render('404', { message: "Invalid Id" });
    }

    try {
        const singleContact = await contact.findById(req.params.id);
        if (!singleContact) return res.render('404', { message: "Contact nnot found" })
        res.render("update-contact", { singleContact });
    } catch (error) {
        res.redner('500', { message: error })
    }
};

const updateContact = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.render('404', { message: "Invalid Id" });
    }

    try {
        const singleContact = await contact.findByIdAndUpdate(req.params.id, req.body);
        if (!singleContact) return res.render('404', { message: "Contact nnot found" })
        res.redirect('/');
    } catch (error) {
        res.redner('500', { message: error })
    }
};

const deleteContact = async (req, res) => {
    try {
        const singleContact = await contact.findByIdAndUpdate(req.params.id, req.body);
        if (!singleContact) return res.render('404', { message: "Contact nnot found" })
        res.redirect('/');
    } catch (error) {
        res.redner('500', { message: error })
    }

};

export { getContacts, showSingleContact, addContact, showupdatedContact, updateContact, deleteContact }