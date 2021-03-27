import { NewsSearchResponse } from "./TopNews";

interface NewsItemProps {
    item: NewsSearchResponse;
}

const NewsItem = (props:NewsItemProps) => {
    const {item} = props;
    const liveClass = item.title.toLowerCase().indexOf("live updates") != -1 ? "live" : ""
    return (
        <div className="news-items">
            <a target="_blank" rel="noreferrer" href={item.url} title={item.title}>
                <div className="image">
                <img alt="News" src={item.urlToImage} />
                </div>
                <div className="info">
                <h2 className={liveClass}>{item.title}</h2>
                <p>{item.description}</p>
                <p>{item.author}</p>
                </div>
            </a>
        </div>
    );
}

export default NewsItem;