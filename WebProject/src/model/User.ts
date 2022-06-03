import {UserRole} from './UserRole';
import {Order} from './Order';
import {UserState} from './UserState';
export class User{
    id: number = 0;
    username: string = '';
    email: string = '';
    password: string = '';
    name: string = '';
    lastname: string = '';
    birthdate: string = '';
    address: string = '';
    role: UserRole = UserRole.GUEST;
    state: UserState = UserState.created;
    orders: Order[] = [];
    image: string = "";
    public ToString(user: User) {
      return (
        'ID: ' +
        user.id +
        'Name: ' +
        user.name +
        'Lastname: '+
        user.lastname+
        'Username: ' +
        user.username+
        'Birthdate: '+
        user.birthdate+
        'Address: '+
        user.address+
        'Role: '+
        user.role+
        'State: '+
        user.state
      );
    }
}