import React, { Component } from 'react';
import { SearchService } from '../../utils/SearchService';

export class SearchBar extends Component {

   constructor(props) {
      super(props);

      this.searchService = new SearchService(props.fetchResults);
      this.state = { results: [] };
   }

   componentDidMount() {
      this.searchService
         .getResults()
         .subscribe(res => {
            res = res ? res : []
            if (res.length === 0) {
               this.props.onNoResults()
            }
            this.setState({ results: res });
         });
   }

   search(event) {
      this.searchService.search(this.props.makeSearchTerm(event.target.value.trim()));
   }

   render() {

      let results = this.state.results.map(res => (
         <li className="list-group-item" key={this.props.keyForResult(res)}>
            {this.props.renderResult(res)}
         </li>
      ));

      return (
         <div className="form-group">
            <h4>{this.props.title || "Search"}</h4>
            <input className="form-control" placeholder={this.props.searchPlaceholder || "Search Term"} type="text" onChange={this.search.bind(this)} />
            <ul className="list-group">
               {results}
            </ul>
         </div>
      );
   }
}
