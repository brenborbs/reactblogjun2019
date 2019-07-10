import React from "react";
import { ApolloConsumer } from "react-apollo";
import { SEARCH_BLOGS } from "../../queries";
import SearchItem from "./SearchItem";

class Search extends React.Component {
  state = {
    searchResults: []
  };

  handleChange = ({ searchBlogs }) => {
    this.setState({
      searchResults: searchBlogs
    });
  };

  render() {
    const { searchResults } = this.state;
    return (
      <ApolloConsumer>
        {client => (
          <div className="main_container">
            <input
              type="search"
              className="form-control form-control-lg"
              placeholder="Search for Blogs"
              onChange={async event => {
                event.persist();
                const { data } = await client.query({
                  query: SEARCH_BLOGS,
                  variables: { searchTerm: event.target.value }
                });
                this.handleChange(data);
              }}
            />

            <div className="row">
              {searchResults.map(blog => (
                <SearchItem key={blog._id} {...blog} />
              ))}
            </div>
          </div>
        )}
      </ApolloConsumer>
    );
  }
}

export default Search;
