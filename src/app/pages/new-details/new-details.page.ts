import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx'
import { newsModal } from '../../core/modals/news';

@Component({
  selector: 'app-new-details',
  templateUrl: './new-details.page.html',
  styleUrls: ['./new-details.page.scss'],
})
export class NewDetailsPage implements OnInit {

  news: newsModal;
  constructor(
    private router: Router,
    private socialSharing: SocialSharing
  ) {
    const navigationState = this.router.getCurrentNavigation().extras.state;
    if (navigationState) {
      this.news = navigationState.newsData;
    } else {
      // window.location.reload();
    }
  }

  ngOnInit() {
  }

  shareModule(){
    console.log(this.news.title);
    this.socialSharing.share(`Checkout here ${this.news.title}`, this.news.title, this.news.url);
  }

  AddorRemoveBookmark(url){
    let existingBookmarkedUrls = localStorage.getItem('bookmarked');
    console.log(existingBookmarkedUrls);

    if (existingBookmarkedUrls) {
       let parsed:Array<any> = JSON.parse(existingBookmarkedUrls);
       if (parsed.find(x => x == url)) {
         localStorage.setItem('bookmarked', JSON.stringify(parsed.filter(x => x != url)));
        } else {
          parsed.push(url);
          localStorage.setItem('bookmarked', JSON.stringify(parsed));
        }
    } else {
      const arr = [url];
      localStorage.setItem('bookmarked', JSON.stringify(arr));
    }
  }

  checkIsBookMarked(url)  {
    let arr:Array<any> = JSON.parse(localStorage.getItem('bookmarked'))
    return arr ? arr.find(a => url) : false;
  }
}
