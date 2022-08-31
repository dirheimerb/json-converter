const data = require('./data/na-consent.json');
const fs = require('fs');
const sam = {
  consentRecordID: 'd3f6a71e-5096-4dc0-8988-7ae3e3a97365',
  federatedID: 'a01e8f38-ddb3-11eb-9659-0ee0102191c1',
  consentActorID: 'a01e8f38-ddb3-11eb-9659-0ee0102191c1',
  consentDefinitionID: '493c5720-c08a-4848-9c2a-e2379f19ff6c',
  consentType: 'mc',
  consentLocale: 'en_US',
  consentVersion: '1',
  consentChannel: 'fab-cof-gtx1',
  consentDecisionTimeStamp: '20220825172232.729Z',
  consentDecision: 'accepted',
  entryType: 'customer',
  consentDecisionReason: '',
  consentTypeValue: '',
  consentAudience: '',
  consentData: '',
};

const phoneRegx = /\D/g;
const regx = /'/gm;
const subst = `"`;
const dataTime = data;
const arrayTime = dataTime[0];
let updatedData = [];
let newData = {};
for (let i = 0; i < arrayTime.length; i++) {
  const ct = arrayTime[i].consentDecisionTimeStamp || '';
  const year = ct.slice(0, 4);
  const month = ct.slice(4, 6);
  const day = ct.slice(6, 8);
  const hour = ct.slice(8, 10);
  const mins = ct.slice(10, 12);
  const secs = ct.slice(12, 14);
  const end = ct.slice(14, 19);
  const formatedTime = `${year}-${month}-${day}T${hour}:${mins}:${secs}${end}`;
  newData = {
    consentRecordID: arrayTime[i].consentRecordID,
    federatedID: arrayTime[i].federatedID,
    consentActorID: arrayTime[i].consentActorID,
    consentDefinitionID: arrayTime[i].consentDefinitionID,
    consentType: arrayTime[i].consentType,
    consentLocale: arrayTime[i].consentLocale,
    consentVersion: arrayTime[i].consentVersion,
    consentChannel: arrayTime[i].consentChannel,
    consentDecisionTimeStamp: formatedTime,
    consentDecision: arrayTime[i].consentDecision,
    entryType: arrayTime[i].entryType,
    consentDecisionReason: arrayTime[i].consentDecisionReason,
    consentTypeValue: arrayTime[i].consentTypeValue,
    consentAudience: arrayTime[i].consentAudience,
  };
  updatedData.push(newData);
}

fs.writeFile(
  './updatedNAData.json',
  JSON.stringify(updatedData),
  (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  }
);
