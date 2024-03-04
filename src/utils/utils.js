export const numberWithCommas = (x) => {
    if (x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
        return ""; // Mengembalikan string kosong jika x tidak terdefinisi
    }
}
