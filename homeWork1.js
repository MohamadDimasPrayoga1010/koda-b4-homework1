const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");

const rl = readline.createInterface({ input, output });

//Fungsi untuk validasi angka
const isValidNumber = (value) =>
  typeof value === "number" &&
  value === value &&
  value !== Infinity &&
  value !== -Infinity;

//Fungsi untuk validasi string
const isValidString = (value) => typeof value === "string";

//Fungsi konversi string ke number
function parseToNumber(value) {
  if (typeof value !== "string") return null;

  let result = 0;
  let isNegative = false;
  let startIndex = 0;

  if (value[0] === "-") {
    isNegative = true;
    startIndex = 1;
  }

  for (let i = startIndex; i < value.length; i++) {
    const char = value[i];
    if (char < "0" || char > "9") return null;
    result = result * 10 + (char - "0");
  }

  return isNegative ? -result : result;
}

//fungsi cek index ke dalam array
function isValidIndex(array, index) {
  return (
    array &&
    array instanceof Array &&
    isValidNumber(index) &&
    index >= 0 &&
    index < array.length
  );
}

//fungsi untuk ulang string tanpa repeat
function repeatString(str, times) {
  let res = "";
  for (let i = 0; i < times; i++) res += str;
  return res;
}

//Data menu
const menu = [
  { nama: "Bangor Pitik Lava", harga: 29000 },
  { nama: "Bangor Pitik Lava Premium", harga: 29000 },
  { nama: "Bangor Cheese Lava", harga: 31000 },
  { nama: "Bangor Lava Sausage", harga: 27500 },
  { nama: "Bangor Jelata Cheese", harga: 24700 },
  { nama: "Bangor Juragan Cheese", harga: 31700 },
  { nama: "Bangor Ningrat Cheese", harga: 49200 },
  { nama: "Bangor Juragan", harga: 29000 },
  { nama: "Bangor Ningrat", harga: 44200 },
  { nama: "Bangor Sultan", harga: 55500 },
  { nama: "Bangor Fish", harga: 27500 },
  { nama: "Tea", harga: 9500 },
  { nama: "Soft Drink", harga: 10500 },
];

//variabel penyimpanan
let storageProduct = [];
let historiPesanan = [];
let invoiceCounter = 1000;

//Fungsi generate invoice
function generateInvoice() {
  return `INV${invoiceCounter++}`;
}

//fungsi mengambil tanggal dan waktu saat ini
function getCurrentDate() {
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  return `${day}/${month}/${year} ${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;
}

//fungsi menampilkan menu utama
function homeMenu() {
  console.log("\n=== Burger Bangor ===");
  console.log("1. Menu");
  console.log("2. Keranjang");
  console.log("3. Histori");
  console.log("4. Exit");

  rl.question("\nMasukan Angka Yang Ingin Dipilih: ", (input) => {
    const pilihan = parseToNumber(input);
    if (!isValidNumber(pilihan)) {
      console.log("\n Input harus berupa angka!");
      rl.question("\nTekan enter untuk melanjutkan...", homeMenu);
      return;
    }

    switch (pilihan) {
      case 1:
        tambahMenu();
        break;
      case 2:
        bayar();
        break;
      case 3:
        histori();
        break;
      case 4:
        console.log("\n Terimakasih Sudah Berbelanja!");
        rl.close();
        break;
      default:
        console.log("\n Pilihan tidak tersedia! Pilih 1-4");
        rl.question("\nTekan enter untuk melanjutkan...", homeMenu);
    }
  });
}

//fungsi menampilkan keranjang dan melakukan pembayaran
function bayar() {
  console.log("\n=== KERANJANG BELANJA ===\n");
  if (storageProduct.length === 0) {
    console.log("Keranjang kosong!");
    rl.question("\nTekan enter untuk kembali...", homeMenu);
    return;
  }

  let total = 0;
  for (let i = 0; i < storageProduct.length; i++) {
    const { nama, harga, jumlah, subTotal } = storageProduct[i];
    console.log(
      `${
        i + 1
      }. ${nama}\n   Harga: Rp ${harga}\n   Jumlah: ${jumlah}\n   Subtotal: Rp ${subTotal}`
    );
    total += subTotal;
  }

  console.log("\n" + repeatString("=", 40));
  console.log(`TOTAL BELANJA: Rp ${total}`);
  console.log(repeatString("=", 40));

  rl.question("\nCheckout Pesanan (y/n/0 untuk kembali): ", (bayarPesanan) => {
    if (!isValidString(bayarPesanan)) {
      console.log("\n Input tidak valid!");
      rl.question("\nTekan enter untuk melanjutkan...", bayar);
      return;
    }

    switch (bayarPesanan) {
      case "y":
      case "Y":
        const invoice = generateInvoice();
        const tanggal = getCurrentDate();
        const transaksi = {
          invoice,
          tanggal,
          items: [...storageProduct],
          total,
        };

        storageProduct = [];
        historiPesanan = [...historiPesanan, transaksi];

        console.log("\n Pembayaran Berhasil!");
        console.log(`Invoice: ${invoice}`);
        console.log(`Tanggal: ${tanggal}`);
        rl.question("\nTekan enter untuk kembali...", homeMenu);
        break;

      case "n":
      case "N":
      case "0": // Tambahan 0 untuk kembali
        homeMenu();
        break;

      default:
        console.log("\n Input tidak sesuai! Ketik 'y', 'n' atau '0'");
        rl.question("\nTekan enter untuk melanjutkan...", bayar);
    }
  });
}

//fungsi menampilkan histori transaksi
function histori() {
  console.log("\n=== HISTORI PESANAN ===\n");
  if (historiPesanan.length === 0) {
    console.log("Belum ada histori pembelian.");
    rl.question("\nTekan enter untuk kembali...", homeMenu);
    return;
  }

  for (let t = 0; t < historiPesanan.length; t++) {
    const { invoice, tanggal, items, total } = historiPesanan[t];
    console.log("\n" + repeatString("=", 50));
    console.log(`TRANSAKSI #${t + 1}`);
    console.log(`Invoice: ${invoice}`);
    console.log(`Tanggal: ${tanggal}`);
    console.log(repeatString("-", 50));

    for (let i = 0; i < items.length; i++) {
      const { nama, harga, jumlah, subTotal } = items[i];
      console.log(
        `${
          i + 1
        }. ${nama}\n   Harga: Rp ${harga}\n   Jumlah: ${jumlah}\n   Subtotal: Rp ${subTotal}`
      );
    }

    console.log(repeatString("-", 50));
    console.log(`TOTAL: Rp ${total}`);
    console.log(repeatString("=", 50));
  }

  rl.question("\nTekan enter untuk kembali...", homeMenu);
}

//fungsi menampilkan daftar menu dan menambahkan ke keranjang
function tambahMenu() {
  console.log("\n=== DAFTAR MENU ===\n");
  for (let i = 0; i < menu.length; i++) {
    const { nama, harga } = menu[i];
    console.log(`${i + 1}. ${nama} - Rp ${harga}`);
  }
  console.log("0. Kembali"); // Tambahan 0 untuk kembali

  rl.question("\nPilih Menu (Masukkan Angka): ", (inputProduk) => {
    const pilihan = parseToNumber(inputProduk);
    if (!isValidNumber(pilihan)) {
      console.log("\n Input harus berupa angka!");
      rl.question("\nTekan enter untuk melanjutkan...", tambahMenu);
      return;
    }

    if (pilihan === 0) {
      // Tambahan cek 0 untuk kembali
      homeMenu();
      return;
    }

    const indexMenu = pilihan - 1;
    if (!isValidIndex(menu, indexMenu)) {
      console.log(`\n Pilihan tidak valid! Pilih 0-${menu.length}`);
      rl.question("\nTekan enter untuk melanjutkan...", tambahMenu);
      return;
    }

    const { nama, harga } = menu[indexMenu];

    rl.question("Jumlah Pesanan (0 untuk kembali): ", (quantity) => {
      // Tambahan keterangan 0
      const jumlah = parseToNumber(quantity);
      if (!isValidNumber(jumlah) || jumlah < 0) {
        console.log("\n Jumlah harus angka positif");
        rl.question("\nTekan enter untuk melanjutkan...", tambahMenu);
        return;
      }

      if (jumlah === 0) {
        // Tambahan cek 0 untuk kembali
        homeMenu();
        return;
      }

      const produkLengkap = { nama, harga, jumlah, subTotal: jumlah * harga };
      storageProduct = [...storageProduct, produkLengkap];

      console.log("\n Produk ditambahkan ke keranjang!\n");
      console.log("=== KERANJANG ===");
      for (let i = 0; i < storageProduct.length; i++) {
        const { nama, harga, jumlah, subTotal } = storageProduct[i];
        console.log(
          `${
            i + 1
          }. ${nama}\n   Harga: Rp ${harga}\n   Jumlah: ${jumlah}\n   Subtotal: Rp ${subTotal}`
        );
      }

      rl.question("\nTambah Menu Lagi (y/n): ", (inputMenu) => {
        if (!isValidString(inputMenu)) {
          console.log("\n Input tidak valid!");
          rl.question("\nTekan enter untuk melanjutkan...", tambahMenu);
          return;
        }

        switch (inputMenu) {
          case "y":
          case "Y":
            tambahMenu();
            break;
          case "n":
          case "N":
            homeMenu();
            break;
          default:
            console.log("\n Input tidak sesuai! Ketik 'y' atau 'n'");
            rl.question("\nTekan enter untuk melanjutkan...", tambahMenu);
        }
      });
    });
  });
}

homeMenu();
