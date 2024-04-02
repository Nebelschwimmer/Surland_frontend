import { Link } from "react-router-dom"
import MyPhoto from '../../pictures/MyPhoto.jpg'
import './aboutPage.scss'
import TelegramIcon from '@mui/icons-material/Telegram';


export const AboutPage = ({langEn}) => {

 return (
  <>
  {langEn ? 
  <section className="about__page">
    
      <h1>ABOUT PROJECT</h1>
      <h2>Technical information</h2>
      <div className="about__page__techincal__info__grid">
        <div className="about__page__techincal__info__wrapper">
          <h3>Frontend</h3>
          <p>The Frontend of the project was created in <b>React JS v18</b> and bootstrapped using Create-React-App.</p>
          <ul>The following addditional packages and libraries were used:
            <li>React-Router-DOM</li>
            <li>React Hook Form</li>
            <li>MUI Materials library</li>
            <li>Use-Sound hook</li>
            <li>Firebase Authentication</li>
            <li>SASS</li>
            
          </ul>
          <p>You can see the full code of the Frontend in my Github repository <Link style={{color: 'darkorange'}}
              target="blank" to="https://github.com/Nebelschwimmer/NebelschwimmerWebSite_frontend">here</Link> </p>
        </div>
        
        <div className="about__page__techincal__info__wrapper">
          <h3>Backend</h3>
          <p>The project's Backend was created in <b>Express JS</b> with the use of <b>MONGO DB</b> as database.</p>
          <ul>There I used the following additional packages:
            <li>Body-parser</li>
            <li>CORS</li>
            <li>Express-fileupload</li>
            <li>Mongoose</li>
            <li>Nodemon</li>
            <li>Firebase Admin SDK</li>
        
          </ul>
          <p>You can see the full code of the Backend in my Github repository <Link style={{color: 'darkorange'}}
              target="blank" to="https://github.com/Nebelschwimmer/NebelschwimmerWebSite_backend">here</Link> </p>
        </div>
      </div>
  </section>
  :
  <section className="about__page">
      <h1>О проекте</h1>
      <h2>Техническая информация</h2>
      <div className="about__page__techincal__info__grid">
        <div className="about__page__techincal__info__wrapper">
          <h3>Фронтенд</h3>
          <p>Фронтенд был создан в <b>React JS v18</b> и собран с помощью Create-React-App</p>
          <ul>Были использованы следующие дополнительные пакеты и библиотеки:
            <li>React-Router-DOM</li>
            <li>React Hook Form</li>
            <li>MUI Materials library</li>
            <li>Use-Sound hook</li>
            <li>Firebase Authentication</li>
            <li>SASS</li>
            
          </ul>
          <p>Вы можете посмотреть полный код фронтенда в репозитории Github <Link style={{color: 'darkorange', textDecoration:'none'}}
              target="blank" to="https://github.com/Nebelschwimmer/NebelschwimmerWebSite_frontend">здесь</Link> </p>
        </div>
        
        <div className="about__page__techincal__info__wrapper">
          <h3>Бэкенд</h3>
          <p>Бэкенд проекта был создан в  <b>Express JS</b> с использование <b>MONGO DB</b> в качестве базы данных.</p>
          <ul>Были использованы следующие дополнительные пакеты:
            <li>Body-parser</li>
            <li>CORS</li>
            <li>Express-fileupload</li>
            <li>Mongoose</li>
            <li>Nodemon</li>
            <li>Firebase Admin SDK</li>
        
          </ul>
          <p>Вы можете посмотреть полный код бэкенда в репозитории Github <Link style={{color: 'darkorange', textDecoration:'none'}}
              target="blank" to="https://github.com/Nebelschwimmer/NebelschwimmerWebSite_backend">здесь</Link> </p>
        </div>
      </div>
  </section>
  }
  
  
  
  
  {langEn ? 
  <section>
  <h1>About Project Creator</h1>
 
    <span>Hi! My name is Andrew Dyakov.</span>
    <img  className='about__page__img' src={MyPhoto}/>
 

        <div className='home_page_biography_block'>
          <p>I am 33 years old, from Russia, Vologda</p>
          <p>My major at university was French and English, but now I would like to change my job to become a professional web-developer.</p>
          <p>This website shows my current skills in that field.</p>
      </div> 
      <p>In general, I'm into a lot of other things, apart from web-development:</p> 
      <ul className='home_page_hobbies_list'>
        <li>music (composing, playing the flute, the piano)</li>
        <li>3d graphics (3ds max)</li>
        <li>linguistics (European languages)</li>
        <li>literature (I write surrealistic short stories)</li>
        <li>science (Biology, Chemistry, Physics, Astronomy, medicine)</li>
        <li>cooking (all kinds of!)</li>
        <li>fitness</li>
      </ul>
      
      <p>Contacts: </p>
      <ul className="about__page__contacts__container">
        <li>
          <Link to='https://t.me/nebelschwimmer'>Telegram<TelegramIcon/></Link>
        </li>
        <li>Email: nebelschwimmer@gmail.com</li>
      </ul>
  </section>
  
:
<section>
<h1>О создателе проекта</h1>
 
    <span>Привет! Меня зовут Андрей Дьяков</span>
    <img  className='about__page__img' src={MyPhoto}/>
 

        <div className='home_page_biography_block'>
          <p>Мне 33 года, я живу в Вологде, РФ</p>
          <p>Мое основное образование - лингвистика (французский и английский языки), но в данный момент я бы хотел сменить работу и стать профессиональным веб-разработчиком</p>
          <p>Данный проект демонстрирует мои навыки в данной области на данный момент.</p>
      </div> 
      <p>В целом, кроме веб-разработки, я увлекаюсь многим:</p> 
      <ul className='home_page_hobbies_list'>
      <li>3d графика(3ds max)</li>
        <li>лингвистика (европейские языки)</li>
        <li>литература (пишу сюрреалистические рассказы)</li>
        <li>естествознание (биология, химия, физика, астрономия, медицина)</li>
        <li>кулинария (все виды!)</li>
        <li>фитнес</li>
      </ul>
      
      <p>Контакты: </p>
      <ul className="about__page__contacts__container">
        <li>
          <Link to='https://t.me/nebelschwimmer'>Telegram<TelegramIcon/></Link>
        </li>
        <li>Email: nebelschwimmer@gmail.com</li>
      </ul>
</section> 
}
  </>
 ) 
}