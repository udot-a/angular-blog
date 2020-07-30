import { Component, OnInit } from '@angular/core';
import {PostService} from "../shared/post.service";
import {Observable} from "rxjs";
import {Post} from "../shared/interfaces";

@Component({
  selector: 'app-hompe-page',
  templateUrl: './hompe-page.component.html',
  styleUrls: ['./hompe-page.component.scss']
})
export class HomePageComponent implements OnInit {
  posts$: Observable<Post[]>;

  constructor(
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.posts$ = this.postService.getAll();
  }

}
