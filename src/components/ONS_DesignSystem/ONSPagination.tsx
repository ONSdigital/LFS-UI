import React, {Component} from 'react';

interface Props {
    steps: number,
    count: number,
    pageChange: (offset: number, steps: number) => void
}

interface State {
    page: number,
    maxPage: number
}

export class ONSPagination extends Component <Props, State> {
    constructor(props: Props) {
        super(props);
        let maxPage = Math.ceil(props.count / props.steps);
        this.state = {page: 1, maxPage: maxPage}
    }

    static getDerivedStateFromProps(nextProps: Props, prevState: State) {
        let maxPage = Math.ceil(nextProps.count / nextProps.steps);
        if (maxPage !== prevState.maxPage) {
            return {page: 1, maxPage: maxPage};
        } else return null;
    }


    createLinks = () => {

        let prev = [];
        let prevPages = [];
        for (let i = this.state.page - 1; i > 1 && i >= this.state.page - 2; i--) {
            prev.push(this.link(i));
            prevPages.push(i);
        }
        prev = prev.reverse();
        prevPages = prevPages.reverse();
        if (this.state.page !== 1 && this.state.page !== this.state.maxPage) {
            prev.push(this.link(this.state.page));
            prevPages.push(this.state.page)
        }
        let aft = [];
        let aftPages = [];
        for (let i = this.state.page + 1; i < this.state.maxPage && i <= this.state.page + 2; i++) {
            aft.push(this.link(i));
            aftPages.push(i);
        }
        let allPages = prevPages.concat(aftPages);
        let toReturn = prev.concat(aft);

        if (!allPages.includes(2)) {
            toReturn.unshift(<li key={"start_dots"} className="pagination__item pageination__item--gap">&hellip;</li>);
        }
        if (!allPages.includes(this.state.maxPage - 1)) {
            toReturn.push(<li key={"end_dots"} className="pagination__item pageination__item--gap">&hellip;</li>);
        }
        return toReturn
    };

    pageChange = (e: React.MouseEvent, page: number) => {
        if (page !== this.state.page) {
            this.props.pageChange((page - 1) * this.props.steps, this.props.steps);
            this.setState({page: page})
        }
    };

    previous = (e: React.MouseEvent) => {
        this.pageChange(e, this.state.page - 1)
    };

    next = (e: React.MouseEvent) => {
        this.pageChange(e, this.state.page + 1)
    };

    link = (page: number) => {
        return (<li key={page} style={{cursor: "pointer"}}
                    className={"pagination__item " + (this.state.page === page ? "pagination__item--current" : "")}><a
            onClick={(e) => this.pageChange(e, page)} className="pagination__link"
            aria-label={"Go to page " + page}>{page}</a></li>)
    };

    render() {
        return (
            <nav className="pagination "
                 arial-label={"Pagination (Page " + this.state.page + " of " + this.state.maxPage + ")"}>
                <div className="pagination__position" style={{marginBottom:'12px'}}>Page {this.state.page} of {this.state.maxPage}</div>
                <ul className="pagination__items" style={{marginLeft:'0px'}}>
                    {this.state.page > 1 &&
                    <li className="pagination__item pagination__item--previous" style={{backgroundColor:"#c1c9ca2e"}}>
                        <a style={{cursor: "pointer"}} onClick={(e) => this.previous(e)} className="pagination__link"
                           rel="prev" aria-label="Go to the previous page">Previous</a>
                    </li>
                    }
                    {this.link(1)}
                    {this.createLinks()}
                    {this.link(this.state.maxPage)}
                    {this.state.page < this.state.maxPage &&
                    <li className="pagination__item pagination__item--next" style={{backgroundColor:"#c1c9ca2e"}}>
                        <a style={{cursor: "pointer"}} onClick={(e) => this.next(e)} className="pagination__link"
                           rel="next" aria-label="Go to the next page">Next</a>
                    </li>
                    }
                </ul>
            </nav>
        );
    }
}
