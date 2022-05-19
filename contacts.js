const fs = require("fs/promises");
const path = require("path");
const {nanoid} = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const checkContacts = async(contacts) => {
    const data = JSON.stringify(contacts, null, 3);
    await fs.writeFile(contactsPath, data);
}

const listContacts = async() => {
    try{
        const data = await fs.readFile(contactsPath);
        return JSON.parse(data);
    } catch(error) {
        throw error;
    }
  };
  
  const getContactById = async(id) => {
    const contacts = await listContacts();
    const result = contacts.find((contact) =>contact.id === id);
    if(!result){
        console.log(`There is no contact with id ${id} in this table!`);
        return null;
    }
    return result;
    
  }
  const addContact = async(name, email, phone) => {
      const contacts = await listContacts();
      const newContact = {
          id: nanoid(),
          name,
          email,
          phone,
      };
      contacts.push(newContact);
      await checkContacts(contacts);
      return newContact;
  }
  
  const removeContact = async (id) => {
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === id);
    if(index === -1) {
        return null;
    }
    const [removedContact] = contacts.splice(index, 1);
    await checkContacts(contacts);
    return removedContact;
  };
  

  module.exports = {
      listContacts, getContactById, addContact, removeContact,
  }