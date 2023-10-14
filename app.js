//CODING LAMA
// rl.question("Masukkan nama anda : ", (nama) => {
//   rl.question("Masukkan no hp anda : ", (hp) => {
//     const contact = { nama, hp };

//     const file = fs.readFileSync("./data/contacts.json", "utf-8");
//     const contacts = JSON.parse(file);

//     contacts.push(contact);

//     fs.writeFileSync("./data/contacts.json", JSON.stringify(contacts));

//     console.log("Terima kasih sudah memasukkan data kamu");

//     rl.close();
//   });
// });

//CODING APP (10)
// const contacts = require("./contacts");

// const main = async () => {
//   const nama = await contacts.pertanyaan("Masukkan nama anda : ");
//   const email = await contacts.pertanyaan("Masukkan email anda : ");
//   const nomor = await contacts.pertanyaan("Masukkan nomor anda : ");

//   contacts.simpanContact(nama, email, nomor)
// };

// main();

//CODING AMBIL ARGUMEN DARI COMMAND LINE
const yargs = require("yargs");
const contact = require("./contacts")

yargs.command({
  command: "add",
  describe: "Menambahkan kontak baru",
  builder: {
    nama: {
      describe: "Nama Lengkap",
      demandOption: true,
      type: "string",
    },
    email: {
      describe: 'Email',
      demandOption: true,
      type: 'string'
    },
    nomor: {
      describe: 'Nomor Hp',
      demandOption: true,
      type: 'string'
    }
  },
  
  handler(argv){
   contact.simpanContact( argv.nama, argv.email, argv.nomor )
  }
}).demandCommand();

//MENAMPILKN NAMA & NOMOR CONTACT
yargs.command({
  command: "list",
  describe: "Menampilkan semua nama & nomor hp",
  handler(){
    contact.listContacts();
  }
})


yargs.parse();
