import { Component, signal } from '@angular/core';
import { User } from '../../types/user';
import { UserService } from '../../user/user.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private userService: UserService , private toastr:ToastrService) {}

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
        this.toastr.success('User role updated successfully!', 'Success');
      },
      error: (error) => {
        console.error('Failed to update role:', error);
        this.toastr.error('Failed to update user role', 'Error');
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
            this.toastr.success('User role updated successfully!', 'Success');
          },
          error: (err) => {
            console.error('Error updating user role:', err);
            this.toastr.error('Error saving user role update', 'Error');
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
          this.toastr.success('User deleted successfully!', 'Success');
          console.log(`User with ID ${userId} deleted.`);
        },
        error: (err) => {
          this.toastr.error('Failed to delete user', 'Error');
          console.error('Error deleting user:', err);
        },
      });
    }
  }
}
