import path from "path";
import createDirname from "./lib/dirname.js";
import fsFunc from "./lib/fsFunc.js";
import shortid from "shortid";

const { __dirname } = createDirname(import.meta.url);
const contactsPath = path.join(`${__dirname}`, "./db/contacts.json");

export async function listContacts() {
    try {
        const list = await fsFunc.readFile(contactsPath);

        console.log("List of contacts:");
        console.table(JSON.parse(list));

        return JSON.parse(list);
    } catch (err) {
        console.log("Error: ", err.message);
    }
}

export async function getContactById(contactId) {
    try {
        const contacts = await listContacts();
        const contactToFind = contacts.find((contact) => contact.id === contactId);

        console.log(`Contact with ID ${contactId}`);
        console.table(contactToFind);
    } catch (err) {
        console.log("Error: ", err.message);
    }
}

export async function removeContact(contactId) {
    try {
        const contacts = await listContacts();
        const newListContacts = contacts.filter(
            (contact) => contact.id !== contactId
        );

        console.log(`Contact with ID ${contactId} deleted`);
        console.table(newListContacts);
    } catch (err) {
        console.log("Error: ", err.message);
    }
}

export async function addContact(name, email, phone) {
    try {
        const contacts = await listContacts();
        const id = shortid();
        const newListContacts = [...contacts, { id, name, email, phone }];

        console.log(`Added contact with name ${name}`);
        console.table(newListContacts);
    } catch (err) {
        console.log("Error: ", err.message);
    }
}