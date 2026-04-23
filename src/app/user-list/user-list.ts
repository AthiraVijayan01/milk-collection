import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.css']
})
export class UserList implements OnInit {

  users: User[] = [];

  showModal = false;
  isEdit = false;

  user: User = {
    id: 0,
    username: '',
    name: '',
    email: '',
    phone: '',
    address: ''
    
  };

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '[]');
  }

  openAddModal(): void {
    this.reset();
    this.isEdit = false;
    this.showModal = true;
  }
  closeModal(): void {
    this.showModal = false;
  }
  saveUser(): void {
    let user: User[] = JSON.parse(localStorage.getItem('user') || '[]');
    if (this.isEdit) {
      user = user.map(u =>
        u.id === this.user.id ? this.user : u
      );
    } else {
      user.push({
        ...this.user,
        id: Date.now()
      });
    }

    localStorage.setItem('user', JSON.stringify(user));
    this.loadUsers();
    this.closeModal();
    this.reset();
  }

  editUser(u: User): void {
    this.user = { ...u };
    this.isEdit = true;
    this.showModal = true;
  }

  deleteUser(id: number): void {
    let user: User[] = JSON.parse(localStorage.getItem('user') || '[]');
    user = user.filter(u => u.id !== id);
    localStorage.setItem('user', JSON.stringify(user));
    this.loadUsers();
  }

  reset(): void {
    this.user = {
      id: 0,
      username: '',
      name: '',
      email: '',
      phone: '',
      address:''
    };
  }
}