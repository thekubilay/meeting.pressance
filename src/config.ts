let API = "";

switch (import.meta.env.MODE) {
  case 'development':
    API = import.meta.env.VITE_APP_API;
    break;
  case 'production':
    API = import.meta.env.VITE_APP_API;
    break;
  default:
    break;
}

export {API};
