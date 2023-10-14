const { rejects } = require("assert");
const fs = require("fs");
const { resolve } = require("path");
const chalk = require("chalk");
const validator = require("validator");

//MENULISKAN STRING KE FILE
// try {
//   fs.writeFileSync("data/test.tsx", "Hellow World secara synchronus!");
// } catch (e) {
//     console.log(e)
// }

//MENULISKAN STRING KE FILE (ASYNCHRONUS)
// fs.writeFile('data/test.txt', 'Hello world secara Asynchronus!', (e) => {
//     console.log(e)
// })

//MEMBACA FILE
// const data = fs.readFileSync('data/test.txt', 'utf-8')
// console.log(data)

//MEMBACA FILE (ASYNCHRONUS)
// fs.readFile('data/test.txt', 'utf-8', (e, data)=>{
//     if (e) throw e
//     console.log(data)
// })

//Readline
// const readline = require("readline");
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

//membuat folder data
if (!fs.existsSync("./data")) {
  fs.mkdirSync("./data");
}

//membuat file contacs.json jiak blm ada
if (!fs.existsSync("./data/contacts.json")) {
  fs.writeFileSync("./data/contacts.json", "[]", "utf-8");
}

// const pertanyaan = (tanya) => {
//   return new Promise((resolve, reject) => {
//     rl.question(tanya, (data) => {
//       resolve(data);
//     });
//   });
// };

// const pertanyaan2 = () => {
//   return new Promise((resolve, reject) => {
//     rl.question("Masukkan email anda: ", (email) => {
//       resolve(email);
//     });
//   });
// };

// const pertanyaan3 = () => {
//   return new Promise((resolve, reject) => {
//     rl.question("Masukkan nomor anda: ", (nomor) => {
//       resolve(nomor);
//     });
//   });
// };

const loadContact = () => {
  const file = fs.readFileSync("./data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);
  return contacts;
};

const simpanContact = (nama, email, nomor) => {
  const contact = { nama, email, nomor };
  const contacts = loadContact();

  //cek duplikat
  const duplikat = contacts.find((contact) => contact.nama === nama);

  if (duplikat) {
    console.log(
      chalk.red.inverse.bold("Kontak sudah terdaftar, gunakan nama lainnya!")
    );
    return false;
  }

  //cek email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(
        chalk.red.inverse.bold("Email yang anda masukukan tidak valid!")
      );
      return false;
    }
  }

  //cek nomor
  if (nomor) {
    if (!validator.isMobilePhone(nomor, "id-ID")) {
      console.log(
        chalk.red.inverse.bold("Nomor yang anda masukukan tidak valid!")
      );
      return false;
    }
  }

  contacts.push(contact);

  fs.writeFileSync("./data/contacts.json", JSON.stringify(contacts));

  console.log(
    chalk.green.inverse.bold("Terima kasih sudah memasukkan data kamu")
  );
};

const listContacts = () => {
  const contacts = loadContact();
  console.log(chalk.blue.inverse.bold("Daftar Kontak : "));
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.nama} - ${contact.nomor}`);
  });
};

const detailContact = (nama) => {
  const contacts = loadContact();

  const contact = contacts.find(
    (contact) => {return contact.nama.toLowerCase() === nama.toLowerCase()}
  );

  if (!contact) {
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan`));
    return false;
  }

  console.log(chalk.blue.inverse.bold(contact.nama));
  console.log(contact.email);
  console.log(contact.nomor);
};

const hapusContact = (nama) => {
  const contacts = loadContact();

  const newContact = contacts.filter((contact) => { return contact.nama.toLowerCase() !== nama.toLowerCase() })

  if( contacts.length === newContact.length ){
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan`));
    return false
  }

  fs.writeFileSync("./data/contacts.json", JSON.stringify(newContact));

  console.log(
    chalk.green.inverse.bold(`Data ${nama} berhasil dihapus`)
  );

}

module.exports = { simpanContact, listContacts, detailContact, hapusContact };
