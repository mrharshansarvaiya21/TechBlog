import { BlogService } from './../blog.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Blog } from '../blog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'tb-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit,OnDestroy {

  pageTitle: string = "Blog List" ;
  sub!:Subscription;
  errorMessage: string = '';

  private _listFilter: string = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    console.log('In setter:', value);
    this.filteredBlog = this.performFilter(value);
  }

  blogs: Blog[]=[];
  filteredBlog: Blog[]=[];

  constructor(private blogService: BlogService) { }

  performFilter(filterBy: string): Blog[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.blogs.filter((blog: Blog) =>
      blog.heading.toLocaleLowerCase().includes(filterBy));
  }

  ngOnInit(): void {
    this.sub=this.blogService.getBlogs().subscribe({
      next : val => {
        this.blogs=val;
        this.filteredBlog=val;
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
