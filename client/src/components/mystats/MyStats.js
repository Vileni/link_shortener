/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchLinks } from '../../redux';

import './mystats.scss';
function MyStats({ fetchMyLinks, links }) {
  useEffect(() => {
    fetchMyLinks();
  }, []);
  return (
    <>
      <div className="stats-cnt">
        <div className="created-links">
          <h3>Links Created</h3>
          <ul>
            {links.length > 0 ? (
              links.map((e, i) => (
                <li key={i}>
                  <div>
                    <div>{e.shortUrl} </div>
                    <div>
                      Unique visits: {e.uniqueVisitors} visits: {e.visits}
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li>
                <div>
                  <div>You have no created links </div>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = state => {
  return {
    links: state.link.links,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMyLinks: () => dispatch(fetchLinks()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MyStats);
