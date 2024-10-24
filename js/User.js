// User.js

class User {
  static idCounter = 1;

  constructor(
    fullName,
    password,
    dob,
    streetName,
    townCity,
    provinceState,
    postalCode,
    email,
    mobileNumber,
    username,
    profilePicture
  ) {
    this.id = User.generateUniqueId();
    this.username = username;
    this.email = email;
    this.fullName = fullName;
    this.password = password;
    this.mobileNumber = mobileNumber;
    this.profilePicture = profilePicture;
    this.dob = dob;
    this.streetName = streetName;
    this.postalCode = postalCode;
    this.townCity = townCity;
    this.provinceState = provinceState;
  }

  static generateUniqueId() {
    return User.idCounter++;
  }

  getProfileLink() {
    return `/profile/${this.username}`;
  }
}

export default User;
