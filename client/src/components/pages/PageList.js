import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from 'react-router-dom';

class PageList extends Component {
  componentDidMount() {
    this.props.fetchPages();
  }
  render() {
    console.log('pages props', this.props);
    return (
      <div>
        PageList<ul>
          {this.props.pages.map(page => {
            return (
              <li key={page.id}>
                <Link
                  to={`/pages/${page.id}`}
                  onClick={this.props.fetchPage.bind(this, page.id)}
                >
                  {page.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ page }) {
  return { pages: page.list };
}

export default connect(mapStateToProps, {
  fetchPages: actions.pageActions.fetchPages,
  fetchPage: actions.pageActions.fetchPage
})(PageList);
