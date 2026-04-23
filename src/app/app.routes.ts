import { Routes } from '@angular/router';
import { Registration } from './registration/registration';
import { Login } from './login/login';
import { Home } from './home/home';
import { Supply } from './supply/supply';
import { UserList } from './user-list/user-list';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  {path:'registration' ,component:Registration},
  {path:'home',component:Home},
  {path:'user-list',component:UserList}
  {path:'supply',component:Supply}
];
