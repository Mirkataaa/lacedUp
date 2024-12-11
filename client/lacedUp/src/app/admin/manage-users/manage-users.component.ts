import { Component, signal } from '@angular/core';
import { User } from '../../types/user';
import { UserService } from '../../user/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css',
})
export class ManageUsersComponent {
  users = signal<User[]>([]);
  selectedRole: string = '';
  isModalOpen = false;
  selectedUser: User | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users.set(users);
      },
      error: (error) => {
        console.error('Failed to fetch users:', error);
      },
    });
  }

  updateRole(userId: string, newRole: string): void {
    this.userService.updateUserRole(userId, newRole).subscribe({
      next: (response) => {
        console.log(response.message);
        const updatedUser = response.user;
        const updatedUsers = this.users().map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        );
        this.users.set(updatedUsers);
      },
      error: (error) => {
        console.error('Failed to update role:', error);
      },
    });
  }

  openEditRoleModal(user: User): void {
    this.selectedUser = { ...user };
    this.selectedRole = user.role;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedUser = null;
    this.selectedRole = '';
  }

  saveRoleChange(): void {
    if (this.selectedUser && this.selectedRole) {
      this.userService
        .updateUserRole(this.selectedUser._id, this.selectedRole)
        .subscribe({
          next: (response) => {
            const updatedUser = response.user;
            const currentUsers = this.users();
            const index = currentUsers.findIndex(
              (user) => user._id === updatedUser._id
            );
            if (index > -1) {
              currentUsers[index] = updatedUser;
            }
            this.users.set(currentUsers);
            this.closeModal();
          },
          error: (err) => {
            console.error('Error updating user role:', err);
          },
        });
    }
  }

  deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          const updatedUsers = this.users().filter(
            (user) => user._id !== userId
          );
          this.users.set(updatedUsers);
          console.log(`User with ID ${userId} deleted.`);
        },
        error: (err) => {
          console.error('Error deleting user:', err);
        },
      });
    }
  }
}
