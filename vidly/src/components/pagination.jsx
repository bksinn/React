import './pagination.css';

const Pagination = () => {
    return (
        <nav aria-label="..." className="center">
            <ul className="pagination">
                <li className="page-item active">
                    <button className="page-link">1</button>
                    </li>
                <li className="page-item" aria-current="page">
                    <button className="page-link">2</button>
                </li>
                <li className="page-item">
                    <button className="page-link">3</button>
                    </li>
            </ul>
      </nav>
      );
}
 
export default Pagination;