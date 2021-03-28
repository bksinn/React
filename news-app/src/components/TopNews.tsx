import * as React from 'react';
import './TopNews.scss';
import NewsItem from './NewsItem';
import { NewsSearchResponse, newsApiUrl } from "../common/common";
import {NewsSearchService} from '../common/NewsSearchService';
interface TopNewsProps {}
interface TopNewsState {
  name: string;
  newsSearchResponse: NewsSearchResponse[];
}

class TopNews extends React.Component<TopNewsProps, TopNewsState> {
  newsItemsFromCache: any = sessionStorage.getItem("topUsNews");
  newsSearchService: any = new NewsSearchService();
  interval: any;
  constructor(props: any) {
    super(props);

    this.updateNewsSearch = this.updateNewsSearch.bind(this);

    this.newsItemsFromCache = JSON.parse(this.newsItemsFromCache);
    
    this.state = {
        name: "You",
        newsSearchResponse: this.newsItemsFromCache
      };

      //Update every 10 minutes
    this.interval = setInterval(() => {
      this.updateNewsSearch();
    }, 600000)

  }

  componentDidMount() {
    if (!this.newsItemsFromCache) {
      this.getTopNews();
    }

  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getTopNews() {
      //Need to encode uri before fetching
      this.newsSearchService.getTopUsNews()
        .then((res:any) => {
          const articles: NewsSearchResponse[] = res.articles;
          this.setState({
            newsSearchResponse: articles
          })
          sessionStorage.setItem("topUsNews", JSON.stringify(articles));
        })
        .catch((err:any) => {
          console.error(err);
        });
  }

  updateNewsSearch() {
    sessionStorage.removeItem("topUsNews");
    this.getTopNews();
  }

    render() { 
        const { newsSearchResponse } = this.state;

        return (
            <div>
                {newsSearchResponse && newsSearchResponse.map(newsItem => 
                    <NewsItem  key={newsItem.source.id + newsItem.publishedAt}  item={newsItem} />
                )}
            </div>  
            
        );
    }
}
 
export default TopNews;