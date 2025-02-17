function userNameExist( username, users ){
    for( let  i = 0; i < users.length; i++){
      if( users[i].username == username){
        return true;
      }
    }
    return false;
  }

  function findBook( key, userValue, books) {
    for( book in books ){
      if( books[book][key].toLowerCase() == userValue ){
          return books[book];
      }
      continue
  }
    return false;
  }

  module.exports = {userNameExist, findBook}