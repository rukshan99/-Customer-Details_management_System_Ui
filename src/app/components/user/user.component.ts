import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ModalDirective } from 'angular-bootstrap-md';
import { Constants } from 'src/app/Constants';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  // common elements
  mainMessage: string = '';
  filterInPlace: boolean = false;

  // find all users
  usersArray: any = [];
  usersTableHeaders: any = ['ID', 'Username', 'Password', 'First name', 'Last Name', 'Age', 'Country', ''];
  
  // add new user
  @ViewChild('addNewUserModal') addNewUserModal: ModalDirective;

  firstName: string = '';
  lastName: string = '';
  username: string = '';
  password: string = '';
  age: number;
  country: string = '';

  addNewUserInfoMessage: string = '';

  // update user
  @ViewChild('updateUserModal') updateUserModal: ModalDirective;

  // delete user
  @ViewChild('deleteUserModal') deleteUserModal: ModalDirective;

  // find by id
  @ViewChild('findUserByIdModal') findUserByIdModal: ModalDirective;

  // find by criteria
  @ViewChild('findByCriteriaModal') findByCriteriaModal: ModalDirective;

  // update user
  id: number = undefined;

  updateUserInfoMessage: string = '';

  // find by id
  findUserByIdInfoMessage: string = '';

  // find by criteria
  findByCriteriaInfoMessage: string = '';
  criteria: string = '';
  searchItem: string = '';
  criteriaArray: any = ['username', 'firstName', 'lastName', 'age', 'country'];

  ///////////////////////////////////////////////
  constructor(private userService: UserService) { }

  // initial component being loaded
  ngOnInit(): void {
    this.findAllUsers();
  }

  clearData(): void {
    // messages
    this.mainMessage = '';
    this.addNewUserInfoMessage = '';
    this.updateUserInfoMessage = '';
    this.findUserByIdInfoMessage = '';
    this.findByCriteriaInfoMessage = '';

    // fields
    this.id = undefined;
    this.firstName = '';
    this.lastName = '';
    this.username = '';
    this.password = '';
    this.age = undefined;
    this.country = '';
    this.criteria = '';
    this.searchItem = '';
  }

  //////////////// API business logic //////////////
  findAllUsers(): void {
    // clear the array
    this.usersArray = [];

    // call findAllUsers service
    this.userService.findAllUsers()
      .subscribe(data => {
        for (let user of data.content) {
          this.usersArray.push(user);
          console.log(user);
        }
      },
      error => {
        this.mainMessage = error;
      })
  }

  // Add New User //
  addNewUser() {

    if (this.firstName.length === 0 ||
         this.lastName.length === 0 ||
          this.username.length === 0 || 
          this.password.length === 0 ||
          this.age === undefined || 
          this.country.length === 0 ) {

      this.addNewUserInfoMessage = Constants.MANDATORY_FIELDS_ERROR_MESSSAGE;
      return;
    }

    let user = {
      firstName: this.firstName,
      lastName: this.lastName,
      userName: this.username,
      password: this.password,
      age: this.age,
      country: this.country
    }

    this.userService.addNewUser(user).subscribe(data => {
      this.addNewUserModal.hide();
      this.mainMessage = "New user has been added.";
      this.findAllUsers();
    },
      error => {
        this.addNewUserInfoMessage = error;
      }
    )
  }

  // Update user //
  openUpdateUserModal(user: any): void {
    this.clearData();

    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.username = user.userName;
    this.password = '';
    this.age = user.age;
    this.country = user.country;

    this.updateUserModal.show();
  }

  updateUser(): void {
    let user = {
      id: this.id,
      firstName: this.firstName.length !== 0 ? this.firstName:null,
      lastName: this.lastName.length !== 0 ? this.lastName:null,
      userName: this.username.length !== 0 ? this.username:null,
      password: this.password.length !== 0 ? this.password:null,
      age: this.age !== undefined ? this.age:null,
      country: this.country.length !== 0 ? this.country:null
    }

    this.userService.updateUser(user).subscribe(data => {
      this.updateUserModal.hide();
      this.mainMessage = "User has been updated";
      this.findAllUsers();
    },
      error => {
        this.updateUserInfoMessage = error;
      }
    )
  }

  // delete user
  openDeleteUserModal(user): void {
    this.clearData();

    this.id = user.id;

    this.deleteUserModal.show();
  }

  deleteUser(): void {
    this.userService.deleteUser(this.id).subscribe(data => {
        this.deleteUserModal.hide();
        this.mainMessage = `User with id ${this.id} has been removed.`; 
        this.findAllUsers();
    },
    error => {
      this.mainMessage = error;
    })
  }

  // Find By Id //
  findUserById(): void {

    if(isNaN(Number(this.id))) {
      this.findUserByIdInfoMessage = Constants.NOT_A_NUMBER_ERROR_MESSAGE;
      return;
    }

    this.userService.findUserById(this.id).subscribe(user => {
        // clear the array (only if valid data)
        this.usersArray = [];

        this.usersArray.push(user);
        // we have filtered data
        this.filterInPlace = true;

        this.findUserByIdModal.hide();
      },
    error => {
      if (error.status === 404) {
        this.findUserByIdInfoMessage = 'User not found.';
      } else {
        this.findUserByIdInfoMessage = error.message;
      }
    })
  }

  // find by criteria
  findByCriteria(): void {
      this.criteria = (<HTMLSelectElement>document.getElementById('criteria')).value;

      if (this.criteria.length === 0 || this.searchItem.length === 0 ) {
        this.findByCriteriaInfoMessage = Constants.MANDATORY_FIELDS_ERROR_MESSSAGE;
        return;
      }

      if (this.criteria === 'age' && isNaN(Number(this.searchItem))) {
        this.findByCriteriaInfoMessage = Constants.NOT_A_NUMBER_ERROR_MESSAGE;
        return;
      }

      this.userService.findByCriteria(this.criteria, this.searchItem).subscribe(users => {
        // clear the array (only if valid data)
        this.usersArray = [];

        for (let user of users) {
          this.usersArray.push(user);
        }

        // we have filtered data
        this.filterInPlace = true;

        this.findByCriteriaModal.hide();
      },
    error => {
      if (error.status === 404) {
        this.findByCriteriaInfoMessage = 'No data found based on criteria.';
      } else {
        this.findByCriteriaInfoMessage = error.message;
      }
    })
  }


  // resetFilter
  resetFilter(): void {
    this.filterInPlace = false;
    this.findAllUsers();
  }

}
