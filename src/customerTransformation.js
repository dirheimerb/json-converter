const data = require('./data/ap-customer.json');
const fs = require('fs');

const phoneRegx = /\D/g;
const regx = /'/gm;
const subst = `"`;
const dataTime = data;
const arrayTime = dataTime[0];
let updatedData = [];
let newData = {};
for (let i = 0; i < arrayTime.length; i++) {
  const address = arrayTime[i].addresses || '';
  const phone = arrayTime[i].phoneNumbers || '';
  const ct = arrayTime[i].createTimeStamp || '';
  const mt = arrayTime[i].modifyTimeStamp || '';

  const year = ct.slice(0, 4);
  const month = ct.slice(4, 6);
  const day = ct.slice(6, 8);
  const hour = ct.slice(8, 10);
  const mins = ct.slice(10, 12);
  const secs = ct.slice(12, 14);
  const end = ct.slice(14, 19);
  const formatedTime = `${year}-${month}-${day}T${hour}:${mins}:${secs}${end}`;

  const yearm = mt.slice(0, 4);
  const monthm = mt.slice(4, 6);
  const daym = mt.slice(6, 8);
  const hourm = mt.slice(8, 10);
  const minsm = mt.slice(10, 12);
  const secsm = mt.slice(12, 14);
  const endm = mt.slice(14, 19);
  const formatedTimem = `${yearm}-${monthm}-${daym}T${hourm}:${minsm}:${secsm}${endm}`;

  let add = address.replace(regx, '');
  let phn = phone.replace(phoneRegx, '');

  newData = {
    federatedID: arrayTime[i].federatedID,
    firstName: arrayTime[i].firstName,
    lastName: arrayTime[i].lastName,
    locale: arrayTime[i].locale,
    createTimeStamp: formatedTime,
    modifyTimeStamp: formatedTimem,
    emails: arrayTime[i].emails,
    street1: add.street || '',
    street2: add.street2 || '',
    locality: add.locality || '',
    region: add.region || '',
    country: add.country || '',
    postalcode: add.postalcode || '',
    mobilePhone: phn || '',
    countryOfResidence: arrayTime[i].countryOfResidence || '',
  };
  updatedData.push(newData);
}

fs.writeFile(
  './updatedAPData.json',
  JSON.stringify(updatedData),
  (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  }
);
