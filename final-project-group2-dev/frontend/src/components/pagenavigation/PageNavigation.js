import Pagination from 'react-bootstrap/Pagination';

function PageNavigation(props) {
    //console.log(props.setPage);
    return (
        <Pagination>
            {props.currentPageNumber !== 1 && (
                <Pagination.First onClick={() => {props.setPage(1); window.scroll(0, 0);}} />
            )}

            {props.currentPageNumber > 1 && (
                <Pagination.Prev onClick={() => {props.setPage(props.currentPageNumber - 1); window.scroll(0, 0);}} />
            )}

            <Pagination.Item onClick={() => props.setPage(props.currentPageNumber)} active>{props.currentPageNumber}</Pagination.Item>

            {props.currentPageNumber + 1 <= props.totalPages && (
                <Pagination.Item onClick={() => {props.setPage(props.currentPageNumber + 1); window.scroll(0, 0);}}>{props.currentPageNumber + 1}</Pagination.Item>
            )}

            {props.currentPageNumber + 2 <= props.totalPages && (
                <Pagination.Item onClick={() => {props.setPage(props.currentPageNumber + 2); window.scroll(0, 0);}}>{props.currentPageNumber + 2}</Pagination.Item>
            )}

            {props.currentPageNumber + 3 <= props.totalPages && (
                <Pagination.Item onClick={() => {props.setPage(props.currentPageNumber + 3); window.scroll(0, 0);}}>{props.currentPageNumber + 3}</Pagination.Item>
            )}

            {props.currentPageNumber + 4 <= props.totalPages && (
                <Pagination.Item onClick={() => {props.setPage(props.currentPageNumber + 4); window.scroll(0, 0);}}>{props.currentPageNumber + 4}</Pagination.Item>
            )}

            {props.currentPageNumber + 5 <= props.totalPages && (
                <Pagination.Item onClick={() => {props.setPage(props.currentPageNumber + 5); window.scroll(0, 0);}}>{props.currentPageNumber + 5}</Pagination.Item>
            )}

            {props.currentPageNumber + 6 <= props.totalPages && (
                <Pagination.Item onClick={() => {props.setPage(props.currentPageNumber + 6); window.scroll(0, 0);}}>{props.currentPageNumber + 6}</Pagination.Item>
            )}

            {props.currentPageNumber + 7 <= props.totalPages && (
                <Pagination.Item onClick={() => {props.setPage(props.currentPageNumber + 7); window.scroll(0, 0);}}>{props.currentPageNumber + 7}</Pagination.Item>
            )}

            {props.currentPageNumber + 8 <= props.totalPages && (
                <Pagination.Item onClick={() => {props.setPage(props.currentPageNumber + 8); window.scroll(0, 0);}}>{props.currentPageNumber + 8}</Pagination.Item>
            )}

            {props.totalPages !== props.currentPageNumber && (
                <Pagination.Next onClick={() => {props.setPage(props.currentPageNumber + 1); window.scroll(0, 0);}} />
            )}

            {props.totalPages - props.currentPageNumber >= 9 && (
                <Pagination.Last onClick={() => {props.setPage(props.totalPages); window.scroll(0, 0);}} />
            )}
        </Pagination>
    );
}

export default PageNavigation;