import TypeIt from "typeit-react";

export default function index() {
  return (
    <div className="mt-7 mb-3">
        <h1 className=" text-3xl">
            <TypeIt  options={{ loop: true }}
                getBeforeInit={(instance) => {
                    instance.type("Astronauta").pause(750).delete(10).pause(500).type("Superhéroe").pause(750).delete(10).pause(500).type("Futbolista").pause(750).delete(10).pause(500).type("Piloto de carreras").pause(750).delete(18).pause(500).type("Pirata").pause(750).delete(6).pause(500);

                    return instance;
                }}>
        
            </TypeIt> antes de dormir.
          </h1> 

          <p className="mt-1 text-l">Dale un respiro a tu imaginación. Completá el formulario y recibí un cuento corto para tu hijo antes de dormir.</p>

    </div>
  )
}
