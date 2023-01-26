import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Blog } from 'src/app/interfaces/blog';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {


  constructor(
    private router : Router,
    private formBuilder: FormBuilder,
    private dataService: DataService) { }

  
  addBlogForm = this.formBuilder.group({
    body: '',
    title: '',
    category: '',
    author: '',
    authorTitle: '',
    blogIMG: undefined
  });

  imageForm = this.formBuilder.group({

  })

  img: any;
  fileName = '';
  newBlog? : Blog | undefined;
  popupContainer:string = "popupContainerClose";

  ngOnInit(): void {
  }

  handleSubmit(){
    const newBlog :Blog = {
      body: this.addBlogForm.value['body'],
      title: this.addBlogForm.value['title'],
      category: this.addBlogForm.value['category'],
      author: this.addBlogForm.value['author'],
      authorTitle: this.addBlogForm.value['authorTitle'],
      postdate: new Date().toLocaleDateString(),
      imgUrl: this.addBlogForm.value['blogIMG']? this.addBlogForm.value['blogIMG'] : undefined
    }
    this.dataService.saveBlog(newBlog, this.img)
      .then(blog => {
        if(blog){ 
          this.newBlog = blog,
          this.router.navigate(['/blog', this.newBlog?._id])
          // this.popupContainer = "popupContainerOpen"
        }
      })
  }

  openPopup(){
    this.popupContainer = "popupContainerOpen";
  }
  closePopup(){
    this.popupContainer = "popupContainerClose";
  }

  onFileSelected(event : any){
    const image: File = event.target.files[0];
    const allowedTypes: String[] = ["image/gif", "image/avif", "image/jpeg", "image/png", "image/webp"];
    if(image && allowedTypes.includes(image.type)){
      this.img = image;
      this.fileName = this.img.name
      this.closePopup()
    }
  }

}
