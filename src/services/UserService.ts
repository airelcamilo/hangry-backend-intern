import { User } from '../models/User';
import { UserRepository } from '../data/UserRepository';
import { v4 as uuidv4 } from 'uuid';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  getAllUsers(): User[] {
    return this.userRepository.getAllUsers();
  }

  getUserById(id: string): User | undefined {
    return this.userRepository.getUserById(id);
  }

  createUser(name: string, email: string, dateOfBirth: string): User {
    const newUser = new User(uuidv4(), name, email, dateOfBirth);
    this.userRepository.addUser(newUser);
    return newUser;
  }

  updateUser(id: string, updatedUser: Partial<User>): boolean {
    return this.userRepository.updateUser(id, updatedUser);
  }

  deleteUser(id: string): boolean {
    return this.userRepository.deleteUser(id);
  }
}