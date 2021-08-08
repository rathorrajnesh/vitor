import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { perPageItem } from '../../core/constants/constant';
import { newsModal } from '../../core/modals/news';
import { NewsService } from '../../core/services/news/news.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;
  slidesOpts = {
    slidesPerView: 3,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  };
  pageNo = 0;
  todayDate = new Date().getTime();
  allnews: newsModal[] = [];
  mainScreenNews: newsModal;
  totalCategories = [];
  selectedCategory: string;
  selectedCategoryNews: newsModal[] = [];
  allText = 'All';
  totalRecord: number;
  constructor(
    private router: Router,
    private newsSrv: NewsService
  ) { }

  ngOnInit() {
    this.getAllliveNews();
  }

  getAllliveNews(infiniteScroll?) {
    const requestParams = {
      languages: 'en',
      sort: `published_desc`,
      offset: this.pageNo,
      limit: perPageItem
    }
    this.newsSrv.fetchAllnews(requestParams).subscribe((res: any) => {
      console.log(res);
      // this.allnews = res.data;
      this.totalCategories = [];
      this.allnews = this.allnews.concat(res.data);

      this.totalRecord = res.pagination.total;

      this.mainScreenNews = res.data[0];
      let categories  = this.allnews.map(x => x.category).filter((value, index, self) => self.indexOf(value) === index);
      this.totalCategories.unshift(this.allText, ...categories);

      console.log(this.totalCategories);
      this.selectedCategory = this.totalCategories[0];
      this.filterNewsByCategory(this.allText)
      if (infiniteScroll) {
        infiniteScroll.target.complete();
      }
    })
  }

  segmentChanged(catName){
    console.log(catName);
    this.pageNo = 0;
    this.filterNewsByCategory(catName)
  }

  filterNewsByCategory(category) {
    if (category === this.allText) {
      this.selectedCategoryNews = this.allnews;
    } else {
      this.selectedCategoryNews = this.allnews.filter(x => x.category === category);
    }
  }

  gotoDetails(item){

    const navigationExtras: NavigationExtras = {
      state: {
        newsData: item,
      }
    };
    this.router.navigate(['news-details'], navigationExtras);
  }


  loadData(infiniteScroll) {
    this.pageNo++;
    this.getAllliveNews(infiniteScroll);

    if (this.allnews.length === this.totalRecord) {
      infiniteScroll.target.disabled = true;
    }
  }


  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }


  /**
   * use Of trackById for performance enhancement
   * @param data data get from for loop
   */
   public trackByid(index, data: any) {
    if (!data) { return null; }
    return index;
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
