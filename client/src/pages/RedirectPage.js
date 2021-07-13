/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import validator from 'validator';
import { useState } from 'react';
import Cookies from 'js-cookie';
import ErrorLink from './../components/errorlink/ErrorLink';

function RedirectPage() {
  const { id } = useParams();
  const [url, SetUrl] = useState('');
  useEffect(() => {
    async function makeItHappen() {
      window.document.title = 'redirect';
      const res = await axios.post(`/api/v1/url/redirect/${id}`, {
        jwt: Cookies.get('jwt'),
      });
      if (res && res.data.url) {
        SetUrl(res.data.url);
        window.location.href = `${res.data.url}`;
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

export default RedirectPage;
