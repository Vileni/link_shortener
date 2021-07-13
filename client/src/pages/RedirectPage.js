/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import validator from 'validator';
import { useState } from 'react';
// import Cookies from 'js-cookie';
import ErrorLink from './../components/errorlink/ErrorLink';

function RedirectPage() {
  const { id } = useParams();
  const [url, SetUrl] = useState('');
  useEffect(() => {
    async function makeItHappen() {
      let res;
      const user = await axios.get(`/api/v1/user/me`);
      window.document.title = 'redirect';
      if (user.data.status === 'success') {
        res = await axios.post(`/api/v1/url/redirect/${id}`, {
          uid: user.data.data._id,
        });
      } else {
        res = await axios.post(`/api/v1/url/redirect/${id}`);
      }
      if (res && res.data.url) {
        SetUrl(res.data.url);
        window.location = `${res.data.url}`;
      } else {
        SetUrl('error');
      }
    }
    makeItHappen();
  }, []);

  if (!validator.isURL(url) && url === 'error') {
    return <ErrorLink />;
  } else {
    return <div></div>;
  }
}

///idddd
export default RedirectPage;
