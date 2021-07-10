/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function RedirectPage() {
  const { id } = useParams();
  useEffect(() => {
    async function makeItHappen() {
      window.document.title = 'redirect';
      const res = await axios.get(`/api/v1/url/redirect/${id}`);
      if (res) {
        window.location.href = `${res.data.url}`;
      }
    }
    makeItHappen();
  }, []);
  return <div></div>;
}

export default RedirectPage;
