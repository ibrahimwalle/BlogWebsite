import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlogDetailsComponent } from './components/blog-details/blog-details.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { EditBlogComponent } from './components/edit-blog/edit-blog.component';
import { AddBlogComponent } from './components/add-blog/add-blog.component';

const routes: Routes = [
  {path: '', redirectTo: 'blogs', pathMatch: 'full'},
  {path:'blogs', component: BlogsComponent},
  {path:'blog/:id', component: BlogDetailsComponent},
  {path:'addBlog', component: AddBlogComponent},
  {path:'editBlog', component: EditBlogComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
