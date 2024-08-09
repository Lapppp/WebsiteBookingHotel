import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../user.service";
import { Image, User } from "../user";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
})
export class UserComponent implements OnInit {
  users: User[] = [];
  temp: User[] = [];
  userImagesMap: { [key: string]: Image[] } = {}; // Để lưu trữ hình ảnh cho mỗi người dùng
  entries: number = 10;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      (data: User[]) => {
        this.users = data;
        this.temp = [...data];

        // Lặp qua danh sách người dùng để lấy hình ảnh cho từng người dùng
        this.users.forEach((user) => {
          this.getUserImages(user.id.toString());
        });
      },
      (error) => {
        console.log("Error fetching users:", error);
      }
    );
  }

  entriesChange(event: any) {
    this.entries = event.target.value;
  }

  filterTable(event: any) {
    const val = event.target.value ? event.target.value.toLowerCase() : "";
    const temp = this.users.filter((d) => {
      const userName = d.userName ? d.userName.toLowerCase() : "";
      return userName.indexOf(val) !== -1 || !val;
    });
    this.temp = temp;
  }

  onActivate(event: any) {
    // Handle row activation events here if necessary
  }

  editUser(userId: string): void {
    this.router.navigate(["/users/editUser", userId]);
  }

  getUserImages(userId: string) {
    this.userService.getUserImages(userId).subscribe(
      (images: Image[]) => {
        this.userImagesMap[userId] = images; // Lưu danh sách hình ảnh vào userImagesMap theo userId
      },
      (error) => {
        console.error(
          "Error fetching user images for userId",
          userId,
          ":",
          error
        );
      }
    );
  }

  getUserImagesForDisplay(userId: string): Image[] {
    return this.userImagesMap[userId] || []; // Trả về danh sách hình ảnh cho người dùng có userId tương ứng
  }
}
