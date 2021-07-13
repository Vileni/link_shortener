import React, { useState } from 'react';
import validator from 'validator';
import { connect } from 'react-redux';
import axios from 'axios';
import './urlshortener.scss';

function UrlShortener({ userinfo }) {
  const [warn, SetWarn] = useState('Long Story Short');
  const [url, Seturl] = useState('');
  const [err, Seterr] = useState(false);
  const handleSubbmit = async e => {
    e.preventDefault();
    if (userinfo === 'success') {
      if (url.startsWith('http://') || url.startsWith('https://')) {
        if (validator.isURL(url)) {
          const res = await axios.post('/api/v1/url/create', {
            url,
          });

          if (res) {
            Seterr(false);
            Seturl(res.data.link);
            SetWarn('Long Story Short');
          }
        } else {
          Seterr(true);
          SetWarn('Pleas Enter Valid Url');
        }
      } else {
        SetWarn('Valid Url Must starts With "https://" or "http://" ');
        Seterr(true);
      }
    } else {
      SetWarn('Please Authenticate!');
      Seterr(true);
    }
  };

  return (
    <div className="short-cnt">
      <h2>{warn}</h2>
      <form className="in-cnt-f" onSubmit={e => handleSubbmit(e)}>
        <input
          style={{ borderColor: err ? 'red' : '' }}
          type="text"
          name="url"
          id=""
          placeholder="https://"
          onChange={e => {
            Seturl(e.target.value);
          }}
          value={url}
        />
        <button>Shorten</button>
      </form>
    </div>
  );
}
const mapStateToProps = state => {
  return {
    userinfo: state.user.user.status,
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UrlShortener);
