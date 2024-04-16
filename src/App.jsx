import { useState, useEffect } from 'react';
import { IntlProvider } from 'react-intl';

import Header from './components/header';
import Intro from './components/intro';
import Body from './components/body';
import './index.css';

import messages_en from './locales/en.json';
import messages_es from './locales/es.json';

const messages = {
  'en': messages_en,
  'es': messages_es
};

const language = navigator.language.split(/[-_]/)[0];


function App() {
  const [currentLanguage, setCurrentLanguage] = useState(language);

  useEffect(() => {
    console.log(currentLanguage);
  }, [currentLanguage]);

  return (
    <IntlProvider locale={currentLanguage} messages={messages[currentLanguage]}>

    <div className="App p-8 mx-auto bg-[#F0F6FF] min-h-[100vh] max-w-[768px]">

      <Header currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage} />
      <Intro currentLanguage={currentLanguage} />
      <Body />
      
  
    </div>
    </IntlProvider>

  );
}

export default App;
