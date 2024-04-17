import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import arrowLeft from '../../assets/arrow-left.svg';
import close from '../../assets/close.svg';
import { useIntl, FormattedMessage } from 'react-intl';



const Body = ({currentLanguage}) => {
  const intl = useIntl();
  const namePlaceholder = intl.formatMessage({ id: 'name-select' });
  const agePlaceholder = intl.formatMessage({ id: 'age-select' });
  const friendPlaceholder = intl.formatMessage({ id: 'friend-select' });
  const themePlaceholder = intl.formatMessage({ id: 'theme-select' });

  const durationPlaceholder = intl.formatMessage({ id: 'duration-select' });
  const shortPlaceholder = intl.formatMessage({ id: 'short-placeholder' });
  const mediumPlaceholder = intl.formatMessage({ id: 'medium-placeholder' });
  const longPlaceholder = intl.formatMessage({ id: 'long-placeholder' });


  

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [friendName, setFriendName] = useState('');

  const [theme, setTheme] = useState(themePlaceholder);
  useEffect(() => {
    setTheme(themePlaceholder);
  }, [themePlaceholder]);

  const [length, setLength] = useState(durationPlaceholder);

  useEffect(() => {
    setLength(durationPlaceholder);
  }, [durationPlaceholder]);

  const [story, setStory] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [hasStory, setHasStory] = useState(false);

  const generateStory = async (e) => {

    e.preventDefault();
    setIsLoading(true);
    let maxTokens = length === 'short' ? 250 : length === 'medium' ? 500 : length === 'long' ? 1000 : 0;

    const prompt =
        currentLanguage === 'es' ? `Crea una encantadora historia para dormir adaptada a la imaginación de un niño de ${age} años, incorporando los siguientes elementos, con un total de ${maxTokens} palabras:

        1. Nombre del personaje principal: ${name}
        ${friendName ? ` 2. Nombre del mejor amigo: ${friendName}` : ''}
        3. Tema de la aventura: ${theme}
        Tu tarea es crear una narrativa que transporte las mentes jóvenes a mundos mágicos y las deje soñando con aventuras por venir. Aprovecha el tema elegido para inspirar la creatividad y capturar la esencia del asombro infantil.
        
        Ten en cuenta la edad del público y busca una historia que sea apropiada para su edad y esté llena de mensajes positivos. Fomenta la imaginación, la amistad y el coraje, y deja espacio para que los corazones jóvenes vuelen alto.
        
        Tu historia debe ser un tesoro de encantamiento, rebosante de emoción, amistad y alegría. Ahora, deja que brille tu creatividad mientras tejes un cuento para dormir que dejará una impresión duradera en los pequeños oyentes. ¡Asegúrate de que la historia sea adecuada para un niño y tenga un mensaje positivo!` 
        : 

        `Create an enchanting bedtime story tailored for a child's of age ${age} imagination, incorporating the following elements, woth a total of ${maxTokens} words:

        1. Main Character's Name: ${name}
        ${friendName ? ` 2. Best Friend's Name: ${friendName}` : ''}
        3. Adventure Theme: ${theme}
        
        Your task is to craft a narrative that transports young minds to magical worlds and leaves them dreaming of adventures yet to come. Embrace the chosen theme to spark creativity and capture the essence of childhood wonder.
        
        Consider the age of the audience and aim for a story that is both age-appropriate and filled with positive messages. Encourage imagination, friendship, and courage, and leave room for young hearts to soar.
        
        Your story should be a treasure trove of enchantment, brimming with excitement, friendship, and joy. Now, let your creativity shine as you weave a bedtime tale that will leave a lasting impression on young listeners! Please ensure the story is suitable for a child and has a positive message.`;
      
    console.log(prompt)


    let data = JSON.stringify({
      "model": "gpt-3.5-turbo",
      "messages": [
        {
          "role": "user",
          "content": prompt
        }
      ],
      "temperature": 1,
      "top_p": 1,
      "n": 1,
      "stream": false,
      "max_tokens": 1500,
      "presence_penalty": 0,
      "frequency_penalty": 0, 
    });


    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.openai.com/v1/chat/completions',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json', 
        'Authorization': `Bearer ${import.meta.env.VITE_OPEN_AI_KEY}`
      },
      data : data
    };

    axios.request(config)
    .then((response) => {
      console.log(response.data)
      console.log(response.data.choices[0].message.content)
      const separateContent = () => {
        const paragraphs = response.data.choices[0].message.content.split('\n\n');
        return paragraphs.map((paragraph, index) => (
          <p key={index} className="leading-relaxed mb-5">{paragraph}</p>
        ));
      };
      setStory(separateContent());
      setIsLoading(false);
      setHasStory(true);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  
  return (
    <div className="bg-[#FFBAC3] rounded-xl p-6 form-container mt-7">
        <h2 className='text-2xl mb-5'><FormattedMessage id="fill-data" /></h2>
        <form className="flex flex-col" onSubmit={generateStory}>   
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder={namePlaceholder}/>
            <input type="text" placeholder={`${agePlaceholder}:`} value={age} onChange={(e) => setAge(e.target.value)} required />
            <input type="text" value={friendName} placeholder={`${friendPlaceholder}:`} onChange={(e) => setFriendName(e.target.value)} />
         
            <select value={theme} onChange={(e) => setTheme(e.target.value)} required>
                <option disabled defaultValue>{themePlaceholder}</option>
                <option value="superhero">Superhero</option>
                <option value="soccer-player">Soccer Player</option>
                <option value="astronaut">Astronaut</option>
                <option value="race-driver">Race Driver</option>
                <option value="race-driver">Love Story</option>
            </select>
    
         
            <select value={length} onChange={(e) => setLength(e.target.value)} required>
              <option disabled defaultValue>{durationPlaceholder}</option>
              <option value="short">{shortPlaceholder}</option>
              <option value="medium">{mediumPlaceholder}</option>
              <option value="long">{longPlaceholder}</option>
            </select>
            {/* <select value={language} onChange={(e) => setLanguage(e.target.value)} required>
                <option value="" disabled defaultValue>Seleccioná un idioma</option>
                <option value="spanish">Spanish</option>
                <option value="english">English</option>    
            </select> */}
           
            
            <button className="loading generate-button relative overflow-hidden p-2 font-medium rounded-full mt-3 flex justify-between items-center px-3 w-[max-content] gap-3" type="submit">
               <p className="z-20">{isLoading ? 'Loading...' : <FormattedMessage id="generate" />}</p>
                <img className="relative z-20" src={arrowLeft} alt="My SVG" />    
            </button>
        </form>

        {/* <div className="fixed w-screen h-screen bg-transparent top-0 left-0 z-10 flex justify-center items-center loading" style={{display: isLoading ? 'flex' : 'none'}}>
          <h2 className="m-auto">Loading</h2>
        </div> */}

        <div className={`fixed w-100 h-screen overflow-y-scroll top-0 left-[50%] translate-x-[-50%] bg-white p-12 min-h-[100vh] w-screen max-w-[768px] mx-auto flex flex-col z-200  smooth-t z-50 pb-36 ${hasStory ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} id="story">

            <p className='flex items-center gap-2 ml-auto mr-0 cursor-pointer mb-5' 
                onClick={() => setHasStory(false)}>
                <FormattedMessage id="close" />
                <img src={close} alt="My SVG" />    
            </p>
            <div>{story}</div>
            
        </div>
    </div>

  )
}


export default Body;


Body.propTypes = {
  currentLanguage: PropTypes.string.isRequired,
};