import React, {useState, useEffect} from 'react';
import { CustomDataGrid } from './Components/CustomDataGrid';
import { NavBar } from './Components/NavBar';
import { About } from './Components/About';
import { FileInput } from './Components/FileInput';
import { Landing } from './Components/Landing';
import { BtcView } from './Components/BtcView';
import { EthView } from './Components/EthView';
import { Rewards } from './Components/Rewards';
// eslint-disable-next-line
import { PageInProgress } from './Components/Misc/PageInProgress';
import { Err404 } from './Components/Misc/404';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Paper, Typography } from '@mui/material';

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
					&& <Paper elevation={3} sx={{ padding: 3}}>
							<Typography variant='h3'>I am not affiliated with Shakepay.</Typography>
							<Typography variant='body1'>
								I'm just a guy who likes their product. <br /> 
								See the <Link to='/about'>about page</Link> for more details.
								</Typography>
						</Paper>}
				{parsedData && 
					<Routes>
						<Route index name='home' path='/' element={<Landing 
																		userData={parsedData} purchaseData={purchaseData} purchaseTotal={purchaseTotal}
																		btcBuys={btcBuys} ethBuys={ethBuys}
																		cardPurchases={cardPurchases} cardCashbacks={cardCashbacks} spEarn={spEarn} /> } />
						<Route name='table' path='/table' element={<CustomDataGrid data={parsedData} tableRows={tableRows} values={values} />} />
						<Route name='btc' path='/btc' element={<BtcView btcBuys={btcBuys} btcCashouts={btcCashouts} />} />
						<Route name='eth' path='/eth' element={<EthView ethBuys={ethBuys} ethCashouts={ethCashouts} />} />
						<Route name='about' path='/about' element={<About />} />
						<Route name='rewards' path='/rewards' element={<Rewards cardPurchases={cardPurchases} cardCashbacks={cardCashbacks} spEarn={spEarn}/>} />
              			<Route name="error" path="*" element={<Err404 />} /> 
					</Routes>
				}
			</BrowserRouter>
		</ThemeProvider>
		);
	} 

export default App;