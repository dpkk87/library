exports.default = function User(user){
    this.name = user.name || "";
    this.author = user.address || "";
    this.id = user.id || null
}