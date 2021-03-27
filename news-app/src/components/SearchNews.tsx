import * as React from 'react';
import { NewsSearchResponse } from "../common/common";
import { NewsSearchService } from '../common/NewsSearchService';
import NewsItem from './NewsItem';
export interface SearchNewsProps {
    newsSearchResponse: NewsSearchResponse[];
}
 
export interface SearchNewsState {
    name: string;
    newsSearchResponse: NewsSearchResponse[];
}
 
class SearchNews extends React.Component<SearchNewsProps, SearchNewsState> {
    newsItemsFromCache: any = sessionStorage.getItem("searchedNews");
    newsSearchService: any = new NewsSearchService();

    constructor(props: SearchNewsProps) {
        super(props);

        this.newsItemsFromCache = JSON.parse(this.newsItemsFromCache);
    
        this.state = {
            name: "You",
            newsSearchResponse: this.newsItemsFromCache
          };

    }

    getNewsBySearch(userSearch?:string) {
        if (!userSearch) return;

        //Need to encode uri before fetching
        this.newsSearchService.searchNews(userSearch).then((res:any) => {
            const newsArray: NewsSearchResponse[] = res.articles;
            this.setState({
                newsSearchResponse: newsArray
            });
        })
    }


    render() { 
        const {newsSearchResponse} = this.props;
        return (
            <div>
                {newsSearchResponse && newsSearchResponse.map(newsItem => 
                    <NewsItem  key={newsItem.source.id + newsItem.publishedAt}  item={newsItem} />
                )}
            </div>  
            
        );
    }
}
 
export default SearchNews;