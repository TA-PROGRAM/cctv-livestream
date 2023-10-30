const GROBAL = {

  BASE_SERVER: {
    URL: 'http://localhost:6203/',
  },

  // -----------------------------------------------------------------------------------
  

  ACCESS_TOKEN: {
    'x-access-token': localStorage.getItem("x-access-token"),
  },
  PERMISSION:{
    'permission': localStorage.getItem("permission"),
    'temp_permission': localStorage.getItem("temp_permission")
  }
}

export default GROBAL