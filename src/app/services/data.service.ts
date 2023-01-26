import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable, of } from 'rxjs';
import { Blog } from '../interfaces/blog';
import { HttpResponse } from '../interfaces/httpResponse';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient) { }

  blog? : Blog;
  blogs : Blog[] = [];
  baseUri: string = `https://ibrapi.net/`
  // baseUri: string = `http://localhost:5000/`
  
  async fetchBlogs() : Promise<Blog[] | undefined>{
    const uri = `${this.baseUri}blogs`;
    await lastValueFrom(this.http.get<HttpResponse>(uri)).then(res => {
      this.blogs = res.data;
    }).catch(err=>{
      alert(JSON.stringify(err));
    })
    return this.blogs;
  }

  async fetchBlog(id : string) : Promise<Blog | undefined>{
    const uri = `${this.baseUri}blogs/${id}`;
    await lastValueFrom(this.http.get<HttpResponse>(uri)).then(res => {
      this.blog = res.data;
    }).catch(err=>{
      alert(JSON.stringify(err));
    })
    return this.blog;
  }

  async saveBlog(blog:Blog, img?: any) : Promise<Blog | undefined>{
    const uri = `${this.baseUri}blogs`;    
    const uploadCareUri = `https://upload.uploadcare.com/base/`;
    let uploadRes;
    try {      
      if(img){
        var data = new FormData();
        data.append('UPLOADCARE_PUB_KEY', '1c384e965ee7455d52c5');
        data.append('UPLOADCARE_STORE', ' 1');
        data.append('myFile', img);
  
        uploadRes = await lastValueFrom(this.http.post<any>(uploadCareUri, data));
        const imgUrl = `https://ucarecdn.com/${uploadRes.myFile}/`;
        blog['imgUrl'] = imgUrl;        
      }
      this.http.post<HttpResponse>(uri,blog).subscribe(res => this.blog = res.data);
      return this.blog;
    } catch (error) {
      // console.table(error);
      // handle error, add error interface, error dialog? HttpRequest
      return 
    }
    
    // .subscribe({
    //   next:(res)=>alert("Saved Blog :" + JSON.stringify(res)),
    //   error:(err)=>alert(err),
    //   complete:()=>console.log('Saved new Blog'),
    // })
  }

  async deleteBlog(blogID:any){
    const uri = `${this.baseUri}blogs/${blogID}`;
    this.http.delete<HttpResponse>(uri).subscribe({
      next:(res)=>alert("Deleted Blog :" + blogID + JSON.stringify(res)),
      error:(err)=>alert(err),
      complete:()=>console.log('Deleted Blog', blogID),
    })
  }

  async editBlog(blog:any, img?: any) : Promise<Blog | undefined>{
    const uri = `${this.baseUri}blogs/${blog._id}`;
    const uploadCareUri = `https://upload.uploadcare.com/base/`;
    let uploadRes;

    try {
      this.deleteOldImage(blog.imgUrl)
      if(img){
        var data = new FormData();
        data.append('UPLOADCARE_PUB_KEY', '1c384e965ee7455d52c5');
        data.append('UPLOADCARE_STORE', ' 1');
        data.append('myFile', img);
  
        uploadRes = await lastValueFrom(this.http.post<any>(uploadCareUri, data));
        const imgUrl = `https://ucarecdn.com/${uploadRes.myFile}/`;
        blog['imgUrl'] = imgUrl;        
      }
    this.http.put<HttpResponse>(uri,blog).subscribe(res => this.blog = res.data);
      return this.blog;
    } catch (error) {
      // console.table(error);
      // handle error, add error interface, error dialog? HttpRequest
      return 
    }

  }

  
  async deleteOldImage(imgUrl: any){
    const splitUrl:any = imgUrl.split('/');
    const uuid = splitUrl[splitUrl.length-2];
    console.log(uuid);
    
    const uri = `https://api.uploadcare.com/files/${uuid}/storage/`;
    const headers = new HttpHeaders({
      'Accept': 'application/vnd.uploadcare-v0.7+json', 
      'Authorization': 'Uploadcare.Simple 1c384e965ee7455d52c5:0b447a39aa222f454217', 
    })
    this.http.delete(uri,{
      headers: headers
    }).subscribe(obs => console.log(obs))
  }

  // Local Storage Funtions:
  
  saveBlogs(){
    localStorage.setItem('blogs', JSON.stringify(this.blogs))
    alert("Blogs Updated!")
  }

  populateBackupBlogs(){
    this.blogs = this.backupBlogs;
    this.saveBlogs();
  }

  backupBlogs : any[] = [
    {"id":"123",
    "category":"Design",
    "image_url":"../../../assets/imgs/blog.jpg",
    "post_date":"July 21, 2021",
    "title":"From Sketch to Figma",
    "body":"lorem ipsum is a computer generated text that has absolutley no meaning what so ever",
    "author":"Luis Monteiro",
    "author_title":"Design Director",
    "author_image":"../../assets/account.svg"},
    {"id":"321",
    "category":"Design",
    "image_url":"../../../assets/imgs/blog.jpg",
    "post_date":"June 19, 2022",
    "title":"PhotoShop Essentials",
    "body":"lorem ipsum is a computer generated text that has absolutley no meaning what so ever",
    "author":"Luis Monteiro",
    "author_title":"Design Director",
    "author_image":"../../assets/account.svg"}
  ]
}
