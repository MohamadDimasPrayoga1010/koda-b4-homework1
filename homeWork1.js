const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");
const { log } = require("node:console");

const rl = readline.createInterface({ input, output });
function homeMenu() {
  console.log("Burger Bangor Di jamin ga bikin bangor");
  console.log("1. Menu");
  console.log("2. Keranjang");
  console.log("3. Histori");
  console.log("4. Exit");

  rl.question("Masukan Angka Yang Ingin Dipilih ", (input) => {
    input = parseInt(input);
    switch (input) {
      case 1:
        tambahMenu();
        break;
      case 2:
        console.log(storageProduct);
        bayar();
        break;
      case 3:
        histori();
        break;
      case 4:
        console.log("Terimakasih Sudah Berbelanja");
        rl.close();
        break;
      default:
        rl.question("Input Tidak Sesuai", () => {
          homeMenu();
        });
    }
  });
}

let menu = [
  {
    nama: "Bangor Pitik Lava",
    harga: 29000,
  },
  {
    nama: "Bangor Pitik Lava",
    harga: 29000,
  },
  {
    nama: "Bangor Cheese Lava",
    harga: 31000,
  },
  {
    nama: "Bangor Lava Sausage",
    harga: 27500,
  },
  {
    nama: "Bangor Jelata Cheess",
    harga: 24700,
  },
  {
    nama: "Bangor Juragan Cheese",
    harga: 31700,
  },
  {
    nama: "Bangor Ningrat Cheese",
    harga: 49200,
  },
  {
    nama: "Bangor Juragan",
    harga: 29000,
  },
  {
    nama: "Bangor Ningrat",
    harga: 44200,
  },
  {
    nama: "Bangor Sultan",
    harga: 55500,
  },
  {
    nama: "Bangor Fish",
    harga: 27500,
  },
  {
    nama: "Tea",
    harga: 9500,
  },
  {
    nama: "Soft Drink",
    harga: 10500,
  },
];

let storageProduct = [];
let historiPesanan = [];

function bayar() {
  let jumlahTotalBelanja = 0;
  let i = 0;
  while (storageProduct[i] !== undefined) {
    jumlahTotalBelanja += storageProduct[i].subTotal;
    i++;
  }
  console.log(`Total Belanja :  ${jumlahTotalBelanja}`);
  rl.question("Checkout Pesanan (y/n)", (bayarPesanan) => {
    switch (bayarPesanan) {
      case "y":
        historiPesanan = [...historiPesanan, ...storageProduct];
        storageProduct = [];
        rl.question("Pembayaran Anda Sudah Berhasil", () => {
          homeMenu();
        });
        break;
      case "n":
        homeMenu();
        break;
      default:
        rl.question("Input Tidak Sesuai", () => {
          homeMenu();
        });
    }
  });
}

function histori() {
  console.log(historiPesanan);
  let jumlahHistori = 0;
  while (historiPesanan[jumlahHistori] !== undefined) {
    console.log(
      `${jumlahHistori + 1}. ${historiPesanan[jumlahHistori].nama} ${
        historiPesanan[jumlahHistori].harga
      }`
    );
    jumlahHistori++;
  }
  rl.question("Kembali Ke Home Menu", () => {
    homeMenu();
  });
}
function tambahMenu() {
  let count = 0;
  while (menu[count] !== undefined) {
    console.log(`${count + 1}. ${menu[count].nama}`);
    count++;
  }
  rl.question("Pilih Menu (Masukaan Angka) : ", (inputProduk) => {
    inputProduk = parseInt(inputProduk);
    if (inputProduk > 0 && inputProduk < count + 1) {
      let dataInput = {
        ...menu[inputProduk - 1],
      };
      rl.question("Jumlah Pesanan : ", (quantity) => {
        quantity = parseInt(quantity);
        if (quantity > 0) {
          dataInput = {
            ...dataInput,
            ...{ jumlah: quantity },
            ...{ subTotal: quantity * dataInput.harga },
          };
          storageProduct = [...storageProduct, ...[dataInput]];
          console.log(storageProduct);
          rl.question("Tambah Menu (y/n)", (inputMenu) => {
            switch (inputMenu) {
              case "y":
                tambahMenu();
                break;
              case "n":
                homeMenu();
                break;
              default:
                rl.question("Input Tidak Sesuai", () => {
                  tambahMenu();
                });
            }
          });
        } else {
          rl.question("Input Tidak Sesuai", () => {
            tambahMenu();
          });
        }
      });
    } else {
      rl.question("Input Tidak Sesuai", () => {
        tambahMenu();
      });
    }
  });
}

homeMenu();
