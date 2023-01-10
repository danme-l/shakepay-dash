import React, {useState, useEffect} from 'react';
import { SPTable } from './Components/SPTable';
import { NavBar } from './Components/TopBar';
import { About } from './Components/About';
import { FileInput } from './Components/FileInput';
import { Landing } from './Components/Landing';
import { BtcView } from './Components/BtcView';
import { EthView } from './Components/EthView';
import { PageInProgress } from './Components/Misc/PageInProgress';
import { Err404 } from './Components/Misc/404';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
	const [parsedData, setParsedData] = useState(null);
	const [tableRows, setTableRows] = useState([]);
	const [values, setValues] = useState([]);
	const [purchaseData, setPurchaseData] = useState([]);
    const [purchaseTotal, setPurchaseTotal] = useState(0);
    const [btcBuys, setBtcBuys] = useState([]);
    const [ethBuys, setEthBuys] = useState([]);
	const [btcCashouts, setBtcCashouts] = useState([]);
    const [ethCashouts, setEthCashouts] = useState([]);
    const [cardPurchases, setCardPurchases] = useState([]);
    const [cardCashbacks, setCardCashbacks] = useState([]);
    const [spEarn, setSpEarn] = useState([]); 

    useEffect(() => {
		if (parsedData) {
			setPurchaseData(parsedData.filter(d => d.Direction === 'purchase'));
			setPurchaseTotal(parsedData.filter(d => d.Direction === 'purchase').reduce((t, d) => parseFloat(d["Amount Debited"]) + t, 0));
			setBtcBuys(parsedData.filter(d => d.Direction === 'purchase').filter(d => d['Credit Currency'] === 'BTC'));
			setEthBuys(parsedData.filter(d => d.Direction === 'purchase').filter(d => d['Credit Currency'] === 'ETH'));
			setBtcCashouts(parsedData.filter(d => d['Transaction Type'] === 'crypto cashout').filter(d => d['Debit Currency'] === 'BTC'));
			setEthCashouts(parsedData.filter(d => d['Transaction Type'] === 'crypto cashout').filter(d => d['Debit Currency'] === 'ETH'));
			setCardPurchases(parsedData.filter(d => d['Transaction Type'] === 'card transactions'))
			setCardCashbacks(parsedData.filter(d => d['Transaction Type'] === 'card cashbacks'))
			setSpEarn(parsedData.filter(d => d['Transaction Type'] === 'shakepay earn'));
		}
    }, [parsedData]);

	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<NavBar />
				{/* Conditionally render the input such that it'll disappear once the file is uploaded and switch to app content*/}
				{!parsedData
					&& <FileInput setParsedData={setParsedData} setTableRows={setTableRows} setValues={setValues} />}
				{!parsedData
					&& <About />}
				{parsedData && 
					<Routes>
						<Route index name='home' path='/' element={<Landing 
																		userData={parsedData} purchaseData={purchaseData} purchaseTotal={purchaseTotal}
																		btcBuys={btcBuys} ethBuys={ethBuys}
																		cardPurchases={cardPurchases} cardCashbacks={cardCashbacks} spEarn={spEarn} /> } />
						<Route name='table' path='/table' element={<SPTable data={parsedData} tableRows={tableRows} values={values} />} />
						<Route name='about' path='/about' element={<About />} />
						<Route name='btc' path='/btc' element={<BtcView btcBuys={btcBuys} btcCashouts={btcCashouts} />} />
						<Route name='eth' path='/eth' element={<EthView ethBuys={ethBuys} ethCashouts={ethCashouts} />} />
              			<Route name="error" path="*" element={<Err404 />} /> 
					</Routes>
				}
			</BrowserRouter>
		</ThemeProvider>
		);
	} 

export default App;