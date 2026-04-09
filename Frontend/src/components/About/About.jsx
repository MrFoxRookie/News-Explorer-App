import author from "../../assets/author.jpeg";

function About() {
  return (
    <div className="about">
      <div className="about__container">
        <img
          src={author}
          alt="Imagen del autor"
          className="about__author-image"
        />
        <div className="about__author-container">
          <h2 className="about__author-title">About the author</h2>
          <p className="about__author-text">
            My name is Zahid Tejeda Amaro. I'm a full-stack web developer
            enthusiastic about technology, with knowledge of HTML, CSS,
            JavaScript, and Node.js, among other tools.
          </p>
          <p className="about__author-text">
            I consider technology as a door that enables us to chase our wildest
            dreams and turn them into tangible ideas, whose impact on the world
            is limited only by our imagination. This is what motivates me every
            day to wake up and explore new ways to create meaningful impact in
            my daily life, while continuously learning about the exciting
            innovations and opportunities that the tech community has to offer.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
