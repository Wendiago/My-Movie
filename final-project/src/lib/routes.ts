export const paths = {
  home: {
    getHref: () => "/",
  },
  auth: {
    login: {
      getHref: () => "/login",
    },
    register: {
      getHref: () => "/signup",
    },
    verify: {
      getHref: () => "/verify",
    },
  },
  private: {
    getHref: () => "/private",
  },
  search: {
    getHref: (keyword: string) => `/search?keyword=${keyword}`,
  },
  details: {
    getHref: (id: string) => `/details/${id}`,
  }
};
