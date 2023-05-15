import React, { useEffect } from 'react';
import { axiosModule } from '../../api/axios.js';

export default function PlaceRecommend() {
  useEffect(() => {
    axiosModule.get('/places').then((res) => {
      console.log(res);
    });
  }, []);

  return <div>PlaceRecommend</div>;
}
