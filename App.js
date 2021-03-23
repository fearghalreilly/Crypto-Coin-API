import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import CoinAll from './CoinAll';
import CoinUp from './CoinUp';
import CoinDown from './CoinDown';

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [visable, setVisable] = useState(true);
  const [whichComponentToShow, setWhichComponentToShow] = useState('CoinAll')

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
      )
      .then(res => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );
  

  return (
    <div className='coin-app'>
      <div className='coin-search'>
        <h1 className='coin-text'>Search a currency</h1>
        <form>
          <input
            className='coin-input'
            type='text'
            onChange={handleChange}
            placeholder='Search'
          />
        </form>
      </div>
      <div>
       
        {whichComponentToShow === 'CoinAll' ? 
        ( <button className='coin-percent red' onClick={() => setWhichComponentToShow('CoinAll')}>All Coins</button> ) : (<button className='coin-percent green' onClick={() => setWhichComponentToShow('CoinAll')}>All Coins</button>)}

        {whichComponentToShow === 'CoinUp' ? 
        ( <button className='coin-percent red' onClick={() => setWhichComponentToShow('CoinAll')}>Increased </button> ) : (<button className='coin-percent green' onClick={() => setWhichComponentToShow('CoinUp')}>Increased </button>)}

        {whichComponentToShow === 'CoinDown' ? 
        ( <button className='coin-percent red' onClick={() => setWhichComponentToShow('CoinDown')}>Descreased </button> ) : (<button className='coin-percent green' onClick={() => setWhichComponentToShow('CoinDown')}>Descreased </button>)}
        
     
      
      </div>
      <div>
     
     {whichComponentToShow === 'CoinAll' ? ( 
      <div>
      {filteredCoins.map(coin => {
        return (
          <CoinAll
            key={coin.id}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            marketcap={coin.total_volume}
            volume={coin.market_cap}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
          />
        );
    
      })}
      </div>
      
     ) : null }

</div>
<div>

{whichComponentToShow === 'CoinUp' ? ( 
     <div>
     {filteredCoins.map(coin => {
       return (
         <CoinUp
           key={coin.id}
           name={coin.name}
           price={coin.current_price}
           symbol={coin.symbol}
           marketcap={coin.total_volume}
           volume={coin.market_cap}
           image={coin.image}
           priceChange={coin.price_change_percentage_24h}
         />
       );
   
     })}

</div>
     
    ) : null }

</div>
<div>

{whichComponentToShow === 'CoinDown' ? ( 

  <div>
     
     {filteredCoins.map(coin => {
       return (
         <CoinDown
           key={coin.id}
           name={coin.name}
           price={coin.current_price}
           symbol={coin.symbol}
           marketcap={coin.total_volume}
           volume={coin.market_cap}
           image={coin.image}
           priceChange={coin.price_change_percentage_24h}
         />
       );
   
     })}

     </div>
     
    ) : null }

</div>

    </div>
  );
}

export default App;