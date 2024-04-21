import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../user.service";
import { User } from "../user.model";

@Component({
  selector: "app-user-details",
  templateUrl: "./user-details.component.html",
  styleUrls: ["./user-details.component.css"],
})
export class UserDetailsComponent implements OnInit {
  userId: number | null = null;
  user: any | null = null;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      if (id) {
        this.userId = +id;
        this.loading = true;
        this.userService.getUser(this.userId).subscribe(
          (user) => {
            this.user = user;
          },
          (error) => {
            console.error(error);
          },
          () => {
            this.loading = false;
          }
        );
      }
    });
  }

  goBack(): void {
    this.router.navigate(["/users"]);
  }
}
