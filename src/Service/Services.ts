import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const MailService = createApi({
  reducerPath: 'mailApi',
  baseQuery: fetchBaseQuery({
    baseUrl: "https://grmapi-v2.infinitisoftware.net/emailapi",
    credentials: 'include',
    prepareHeaders: (headers:any) => {
     // const user = localStorage.getItem('user');
      // if (user) {
        // const token = JSON.parse(user)?.token;
        const token = "0g8DWP5g8w1Sks8kVnpbzBiJqHAt0m9a";
        token && headers.set('X-XSRF-TOKEN', token);
      // }
      return headers;
    },
  }),
  endpoints: () => ({}),
});

const CommonService = createApi({
  reducerPath: 'CommonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
    credentials: 'include',
    prepareHeaders: (headers:any) => {
      // const user = localStorage.getItem('user');
      // if (user) {
        // const token = JSON.parse(user)?.token;
        const token = "0g8DWP5g8w1Sks8kVnpbzBiJqHAt0m9a";
        token && headers.set('X-XSRF-TOKEN', token);
      // }
      return headers;
    },
  }),
  endpoints: () => ({}),
});

export { MailService, CommonService };
