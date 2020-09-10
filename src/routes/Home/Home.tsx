import * as React from 'react';
import Layout from '../../components/Layout/Layout';
import Result from '../../components/Result/Result';
import styles from './Home.module.scss';

interface Result {
  created: string;
  episode: string[];
  gender: string;
  id: number;
  image: string;
  location: {
    name: string;
    url: string;
  };
  name: string;
  origin: {
    name: string;
    url: string;
  };
  species: string;
  status: string;
  type: string;
  url: string;
}

const Home = () => {
  const [search, setSearch] = React.useState<string>('');
  const [results, setResults] = React.useState<Result[]>([]);
  const [selected, setSelected] = React.useState<Result | undefined>(undefined);
  const [errorMessage, setErroMessage] = React.useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${search}`
      ).then((res) => {
        if (res.status === 200) {
          setErroMessage(''); // clear error message
          return res.json();
        } else {
          // console.log('Specific error handling depending on status text');
          switch (res.statusText) {
            case 'Not Found':
              setErroMessage('Name not found, Please insert a valid name');
              break;
            default:
              setErroMessage('Something went wrong, Please try again');
              break;
          }
          throw new Error();
        }
      });

      setResults(result.results);
    } catch (err) {
      // console.log('Generic error handling here');
    }
  };

  const handleClick = (index: number) => {
    const selected = { ...results[index] };
    setSelected(selected);
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.search}>
          <form className={styles.searchBar} onSubmit={handleSubmit}>
            <input
              className={styles.input}
              onChange={handleChange}
              value={search}
              type='text'
              name=''
              id=''
            />
            <button className={styles.button}>Search</button>
          </form>
          <div className={styles.results}>
            {errorMessage.length > 0 ? (
              <div className={styles.error}>
                <p className={styles.errorText}>{errorMessage}</p>
              </div>
            ) : (
              results.map(({ image, name, id }, index) => {
                return (
                  <Result
                    key={id}
                    imgSrc={image}
                    name={name}
                    onClick={() => handleClick(index)}
                  />
                );
              })
            )}
          </div>
        </div>
        <div className={styles.info}>
          {results.length > 0 ? (
            selected ? (
              <>
                <div
                  style={{
                    backgroundImage: `url(${selected.image})`,
                    height: '100px',
                    width: '100px',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                  }}></div>
                <p>{selected.name}</p>
                <p>Status : {selected.status}</p>
                <p>Species: {selected.species}</p>
                <p>Location: {selected.location?.name}</p>
              </>
            ) : (
              <p>Select a character for more details</p>
            )
          ) : (
            <p>Search for a character</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
