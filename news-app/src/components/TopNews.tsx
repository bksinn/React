import * as React from 'react';
import './TopNews.scss';
import NewsItem from './NewsItem';

interface TopNewsProps {}
interface TopNewsState {
  name: string;
  newsSearchResponse: NewsSearchResponse[];
}
export interface NewsSearchResponse {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: {
    id: string;
    name: string;
  }
  title: string;
  url: string;
  urlToImage: string;
}
 
class TopNews extends React.Component<TopNewsProps, TopNewsState> {
    newsSearchApiKey = "077a127d61454dadb8571ef07cc9231b";
  newsSearchUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${this.newsSearchApiKey}`;
  newsItemsFromCache: any = localStorage.getItem("newsSearchResponse");
  interval: any;
  constructor(props: any) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.getNewsBySearch = this.getNewsBySearch.bind(this);
    this.updateNewsSearch = this.updateNewsSearch.bind(this);

    var sampleNewsItem = {
      author: "CBS News",
      content: "AstraZeneca may have used 'outdated information' when it released data from a late-stage trial of its COVID-19 vaccine early Monday, federal officials say. The Data and Safety Monitoring Board (DSMB)… [+4232 chars]",
      description: "As U.S. raises concerns over AstraZeneca's data reporting, drug company says preliminary info was 'consistent with the interim analysis,' but full review coming within 2 days.",
      publishedAt: "2021-03-23T12:19:00Z",
      source: {id: "cbs-news", name: "CBS News"},
      title: "AstraZeneca may have 'included outdated information' in COVID-19 vaccine trial report, U.S. says - CBS News",
      url: "https://www.cbsnews.com/news/astrazeneca-covid-vaccine-results-incomplete-view-outdated/",
      urlToImage: "https://cbsnews1.cbsistatic.com/hub/i/r/2021/01/04/83550d61-0136-485a-82a4-a91c575641c4/thumbnail/1200x630/ae5d4a0e81f7f6d91621a4c0494a8ffd/oxford-andrew-pollard-covid-vaccine.jpg",

    }

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
      this.getNewsBySearch();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleClick() {
    console.log("CLICKED");
    this.setState({
      name: "Sir Williams"
    });

    this.getNewsBySearch();
  }

  getNewsBySearch() {
    //Need to encode uri before fetching
    var req = new Request(this.newsSearchUrl);
    fetch(req)
      .then(response => response.json())
      .then(res => {
        const articles: NewsSearchResponse[] = res.articles;
        this.setState({
          newsSearchResponse: articles
        })
        localStorage.setItem("newsSearchResponse", JSON.stringify(articles));
      })
      .catch(err => {
        console.error(err);
      });
  }

  updateNewsSearch() {
    localStorage.removeItem("newsSearchResponse");
    this.getNewsBySearch();
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