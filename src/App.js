import s from './App.module.scss';
import MainPage from './components/Pages/MainPages';

function App() {
  return (
    <div className={s.appWrapper}>
      <MainPage />
    </div>
  );
}

export default App;
