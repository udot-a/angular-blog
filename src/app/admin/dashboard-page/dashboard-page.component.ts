import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PostService} from "../../shared/post.service";
import {Post} from "../../shared/interfaces";
import {Subscription} from "rxjs";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  pSub: Subscription;
  rSub: Subscription;
  isLoading: boolean;
  searchStr = "";

  constructor(
    public postService: PostService,
    private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.pSub = this.postService.getAll().subscribe(posts => {
      this.posts = posts;
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
    if (this.rSub) {
      this.rSub.unsubscribe();
    }
  }

  remove(post: Post) {
    this.rSub = this.postService.deleteItem(post.id).subscribe((resp) => {
      this.alertService.success("Пост был удален!!!")
      this.ngOnInit();
    });
  }
}
