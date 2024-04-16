import TypeIt from "typeit-react";
import { FormattedMessage } from 'react-intl';


export default function index( {currentLanguage}) {
  return (
    <div className="mt-7 mb-3">
        <h1 className=" text-3xl">

           {(currentLanguage === 'es') && (
            <TypeIt  options={{ loop: true }}
                getBeforeInit={(instance) => {
                    instance.type("Astronauta").pause(750).delete(10).pause(500).type("Superhéroe").pause(750).delete(10).pause(500).type("Futbolista").pause(750).delete(10).pause(500).type("Piloto de carreras").pause(750).delete(18).pause(500).type("Pirata").pause(750).delete(6).pause(500);
                    return instance;
                }}>
        
            </TypeIt>     
            
            )} 
              {(currentLanguage === 'en') && (
            <TypeIt  options={{ loop: true }}
                getBeforeInit={(instance) => {
                    instance.type("Astronaut").pause(750).delete(9).pause(500).type("Superhero").pause(750).delete(9).pause(500).type("Soccer Player").pause(750).delete(13).pause(500).type("Race driver").pause(750).delete(11).pause(500).type("Pirate").pause(750).delete(6).pause(500);
                    return instance;
                }}>
        
            </TypeIt> )} <FormattedMessage id="heading-ending" />
          </h1> 

          <p className="mt-1 text-l">
            <FormattedMessage id="intro-p" />
          </p>

    </div>
  )
}
