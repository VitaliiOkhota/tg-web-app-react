import './App.css';
import {useEffect} from 'react'
import {useTelegram} from './hooks/useTelegram'
import Header from './components/Header/Header'
import {Route, Routes} from 'react-router-dom'
import ProductList from './components/ProductList/ProductList'
import Form from './components/Form/Form'
import PostForm from './components/PostForm/Form'


function App() {

    const {tg} = useTelegram();

    useEffect(() => {
        tg.ready();
    }, [])

  return (
    <div className="App">
        <Header />
        <Routes>
            <Route index element={<ProductList/>}/>
            <Route path={'/form'} element={<Form/>}/>
            <Route path={'/post_form'} element={<PostForm />}/>

        </Routes>
    </div>
  );
}

export default App;
