exports.default = function Book(book){
    this.name = book.name || "";
    this.author = book.author || "";
    this.id = book.id || null
    this.userId = book.userId || null;
}