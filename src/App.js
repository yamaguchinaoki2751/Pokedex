import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card/Card";
import Navbar from "./components/Navbar/Navbar";
import { getAllPokemonData, getPokemon } from "./utils/pokemon";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  //最初からポケモンデータを取得しようとしているのでデフォルトはtrueでOK
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");

  useEffect(() => {
    const fetchPokemonData = async () => {
      // 全てのポケモンデータを取得
      // awaitは待つという意味
      let res = await getAllPokemonData(initialURL);
      // 各ポケモンの詳細なデータの取得
      loadPokemon(res.results);
      // console.log(res);
      setNextURL(res.next);
      setPrevURL(res.previous);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  const returnTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const loadPokemon = async (data) => {
    // Promise.all() = 複数データがある場合、全てのデータのfetchが終わるまで待っててもらう意味
    // all()の()の中には配列を入れる
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        // console.log(pokemon);
        // pokemon.urlにはポケモンの詳細データが入ったURL
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  // console.log(pokemonData);

  const handlePrevPage = async () => {
    if (!prevURL) return;
    setLoading(true);
    let prevData = await getAllPokemonData(prevURL);
    await loadPokemon(prevData.results);
    setNextURL(prevData.next);
    setPrevURL(prevData.previous);
    setLoading(false);
  };

  const handleNextPage = async () => {
    setLoading(true);
    let nextData = await getAllPokemonData(nextURL);
    // console.log(data);
    await loadPokemon(nextData.results);
    setNextURL(nextData.next);
    setPrevURL(nextData.previous);
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <>
            <h1>ロード中・・・</h1>
          </>
        ) : (
          <>
            <div className="pokemonCardContainer">
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />;
              })}
            </div>
            <div className="btn">
              <button onClick={handlePrevPage}>前へ</button>
              <button
                onClick={() => {
                  returnTop();
                  handleNextPage();
                }}
              >
                次へ
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
