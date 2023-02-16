export const getAllPokemonData = (url) => {
  //Promise = 約束をしよう
  //resolve = 成功しました
  //reject = 失敗しました
  return new Promise((resolve, reject) => {
    fetch(url) //fetchでurlのデータを取得
      .then((res) => res.json()) //取得したデータをjson形式で返す
      .then((data) => resolve(data)); //thenのpromiseチェーンでdataとして受け取り、resolve関数の引数にdataを入れることによってreturnで返すものはjson形式のものを最終的に返す

    //Promiseは「fetchの処理が成功するまで待っててください」という意味でawaitは待つという意味なのでPromise内の処理が返せるまでgetAllPokemonDataにデータは返ってこないし、App.jsでgetAllPokemonDataのデータを取得するresもPromise内の処理が返せるまでデータを取得できない。
  });
};

export const getPokemon = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        resolve(data);
      });
  });
};
