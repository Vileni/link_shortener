import React, { useState } from 'react';
import validator from 'validator';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import axios from 'axios';
import './urlshortener.scss';

function UrlShortener() {
  const [warn, SetWarn] = useState('Long Story Short');
  const [buttonText, SetButtonText] = useState('Shorten');
  const [url, Seturl] = useState('');
  const [err, Seterr] = useState(false);
  const handleSubbmit = async e => {
    e.preventDefault();
    if (buttonText === 'Copy') {
      return handleButton();
    }
    try {
      if (!url.startsWith('http')) {
        SetWarn('Valid Url Must starts With "http" ');
      } else {
        if (validator.isURL(url)) {
          const res = await axios.post('/api/v1/url/create', {
            url,
          });

          if (res) {
            Seterr(false);
            Seturl(res.data.link);
            SetButtonText('Copy');
            SetWarn('Long Story Short');
          }
        } else {
          Seterr(true);
          SetWarn('Pleas Enter Valid Url');
        }
      }
    } catch (error) {}
  };
  const handleButton = () => {
    if (buttonText === 'Copy') {
      SetButtonText('Shorten');
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
        <CopyToClipboard text={buttonText === 'Copy' ? url : ''}>
          <button>{buttonText}</button>
        </CopyToClipboard>
      </form>
    </div>
  );
}

export default UrlShortener;
