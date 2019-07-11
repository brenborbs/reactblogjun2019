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
            <div className="jumbotron">
              <h5 className="display-4 text-white">Anything</h5>
              <p className="lead text-white">
                Think again for ideas are always bulletproof.
              </p>
              <input
                type="search"
                className="form-control"
                placeholder="You can use keywords"
                onChange={async event => {
                  event.persist();
                  const { data } = await client.query({
                    query: SEARCH_BLOGS,
                    variables: { searchTerm: event.target.value }
                  });
                  this.handleChange(data);
                }}
              />
            </div>

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
