import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CommentService } from "./comment.service";
import { AuthService } from "../services/auth.service";
import { UserService } from "../user/user.service";
import { DatePipe } from '@angular/common';
import { Comment } from "./comment";
import { User } from "../user/user";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from "../login/login.component";
import {ModaldangnhapComponent} from "../pages/modaldangnhap/modaldangnhap.component";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  providers: [DatePipe]
})
export class CommentComponent implements OnInit {
  @Input() level: number = 0;
  @Input() hotelId!: number;

  comments: Comment[] = [];
  user: User | null = null;
  replyCommentId: number | null = null;
  users: { [key: string]: User } = {};
  UserIdByComment: { [UserID: string]: User } = {};
  commentForm: FormGroup;
  replyForm: FormGroup;
  currentUser: User | null = null;
  userId: string = '';
  showChildComments: boolean = false;

  constructor(
    private commentService: CommentService,
    private authService: AuthService,
    private fb: FormBuilder,
    private userService: UserService,
    private datePipe: DatePipe,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
  ) {
    this.commentForm = this.fb.group({
      CommentText: ['', Validators.required]
    });
    this.replyForm = this.fb.group({
      CommentText: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      this.userId = this.currentUser.id;
    }
    this.loadComments();
    this.isLoggedIn = this.authService.isAuthenticated();

  }
  loadComments(): void {
    this.commentService.getComment().subscribe({
      next: (comments) => {
        // Initialize an empty array for root comments
        const rootComments: Comment[] = [];
        this.loadUsers();
        // Build the tree structure using recursion
        comments.forEach(comment => {
          if (!comment.ParentCommentID) {
            // If it's a root comment (no ParentCommentID), add to rootComments
            rootComments.push(this.buildCommentTree(comment, comments));
          }
        });

        // Assign root comments to component property
        this.comments = rootComments;
      },
      error: (error) => {
        console.error('Error loading comments:', error);
      },
    });
  }

  buildCommentTree(comment: Comment, allComments: Comment[]): Comment {
    const children = allComments.filter(c => c.ParentCommentID === comment.Id);

    if (children && children.length > 0) {
      // Recursively build child comments
      comment.ChildComments = [];
      children.forEach(child => {
        comment.ChildComments.push(this.buildCommentTree(child, allComments));
      });
    }

    return comment;
  }
  isLoggedIn: boolean = false;
  submitComment(): void {

    if (!this.isLoggedIn) {
      this.authService.savePreviousUrl(this.router.url);
      const dialogRef = this.dialog.open(ModaldangnhapComponent);
      return;
    }


    if (this.commentForm.valid) {
      const newComment: Comment = {
        CommentText: this.commentForm.value.CommentText,
        CreatedAt: new Date().toISOString(),
        UserID: this.userId,
        HotelID: this.hotelId,
        ParentCommentID: null,
        ChildComments: []|| null
      };


      console.log("test comment", newComment)
      this.commentService.addcomment(newComment).subscribe({
        next: (response) => {
          console.log('Comment added successfully:', response);
          // Optionally, update your UI or reset form here
          this.commentForm.reset();
          this.loadComments(); // Reload comments after adding new comment
        },
        error: (error) => {
          console.error('Error adding comment:', error);
          // Handle error as needed
        }
      });
    }
  }





  submitReply(): void {
    if (!this.isLoggedIn) {
      this.authService.savePreviousUrl(this.router.url);
      const dialogRef = this.dialog.open(ModaldangnhapComponent);
      return;
    }

    if (this.replyForm.valid) {
      const newReply: Comment = {
        CommentText: this.replyForm.value.CommentText,
        CreatedAt: new Date().toISOString(),
        UserID: this.userId,
        HotelID: this.hotelId,
        ParentCommentID: this.replyCommentId,
        ChildComments: []
      };

      console.log("test rely commentn", newReply)
      this.commentService.addcomment(newReply).subscribe({
        next: (response) => {
          console.log('Reply added successfully:', response);
          // Optionally, update your UI or reset form here
          this.replyForm.reset();
          this.replyCommentId = null;
          this.loadComments(); // Reload comments after adding new reply
        },
        error: (error) => {
          console.error('Error adding reply:', error);
          // Handle error as needed
        }
      });
    }
  }
  replyToComment(commentId: number): void {
    this.replyCommentId = commentId;
  }
  getUserName(userId: string): string {
    const user = this.users[userId];
    return user ? user.userName || user.name : 'Unknown User';
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users: User[]) => {
        users.forEach(user => {
          this.users[user.id] = user;
        });
      },
      error: (error) => {
        console.error('Error loading users:', error);
      }
    });
  }

  getTimeAgo(createdAt: string): string {
    const currentDate = new Date();
    const createdDate = new Date(createdAt);
    const difference = currentDate.getTime() - createdDate.getTime();
    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return `${hours} giờ trước`;
    } else if (minutes > 0) {
      return `${minutes} phút trước`;
    } else {
      return `${seconds} giây trước`;
    }
  }

  toggleChildComments() {
    this.showChildComments = !this.showChildComments;
  }

  openLoginModal(): void {
    this.modalService.open(LoginComponent);
  }





}


