import './header.scss'
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import HomeIcon from '@mui/icons-material/Home';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import {Link, useNavigate } from 'react-router-dom';
import {scrollToTop} from '../../utils/utils.js'
import { useEffect, useState } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LogoutIcon from '@mui/icons-material/Logout';
import uk_flag from '../../pictures/uk-flag.webp';
import rus_flag from '../../pictures/rus_flag.png';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import cn from "classnames";
import { setLangEn } from '../../redux/slices/language_slice.js';
import { useDispatch, useSelector } from 'react-redux';



export const Header = ({currentUser, onSignOut}) => {


  const langEn = useSelector((state) => state.langEn);
  const dispatch = useDispatch();



  const [avatarURL, setAvatarURL] = useState('');
  const [showPopOver, setShowPopover] = useState(false)
  const [showLangPopOver, setShowLangPopOver] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  

  useEffect(()=>{
    if (currentUser !== null) setShowPopover(false)
  }, [currentUser])

  useEffect(()=>{
    if (currentUser === null) return
  }, [currentUser])


  const photoURL = currentUser.photoURL;
  const userName = currentUser.displayName;
  const userEmail = currentUser.email;


  // useEffect(()=>{
  //   if (userName !== null) setName(userName) 
  //   else setName(userEmail)
  // }, [userName, currentUser])

  useEffect(()=>{
    if (photoURL !== null) {
      setAvatarURL(photoURL)
    }
    else setAvatarURL('https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg')
  }, [photoURL, currentUser])


const navigate = useNavigate()


  const onEnLangChange = () => {
    if (langEn) dispatch(setLangEn(true));
    else dispatch(setLangEn(true));
    scrollToTop();
    setShowLangPopOver(false);
  }

  const onRuLangChange = () => {
    if (!langEn) dispatch(setLangEn(false));
    else dispatch(setLangEn(false));
    scrollToTop();
    setShowLangPopOver(false);
  }


  return (
  <div className='header'>
    <div className='header_container'>
      <div className='header_icon_container'>
        <span className='header_icon'>
          <MenuIcon onClick={()=>{setShowMenu(true)}} fontSize=''/>
        </span>
        <span onClick={()=>{navigate('/')}} className='header_name_wrapper_logo'>SurLand</span>

      </div>
      {showMenu &&
      <div className={cn("modal", { ["active"]: showMenu })} onClick={()=>{setShowMenu(false)}}>
        <div className={cn("menu__container", { ["active"]: showMenu })} >
          <div className='menu__top'>
              <span>{langEn ? 'Menu' : 'Меню'}</span>
              <span onClick={()=>(setShowMenu(false))}><CloseIcon/></span>
          </div>
        {langEn ?
          <nav>
            <span className='menu__section'>Navigation</span>
            <Link to="/">
              <span className='menu__item' ><HomeIcon fontSize='small'/>Ноme</span></Link>
            <Link  to="/music">
              <span className='menu__item'><LibraryMusicIcon fontSize='small'/>Music</span></Link>
            <Link  to="/texts">
              <span className='menu__item'><LibraryBooksIcon fontSize='small'/>Texts</span></Link>
            <Link  to="/pictures">
              <span className='menu__item'><InsertPhotoOutlinedIcon fontSize='small'/>Pictures</span></Link>
          </nav>
          :
          <nav>
            <span className='menu__section'>Навигация</span>
          <Link  to="/">
            <span className='menu__item'><HomeIcon fontSize='small'/>Главная</span></Link>
          <Link  to="/music">
            <span className='menu__item'><LibraryMusicIcon fontSize='small'/>Музыка</span></Link>
          <Link  to="/texts">
            <span className='menu__item'><LibraryBooksIcon fontSize='small'/>Тексты</span></Link>
          <Link  to="/pictures">
            <span className='menu__item'><InsertPhotoOutlinedIcon fontSize='small'/>Картинки</span></Link>
          </nav>
        }
          
          <nav>
            <span className='menu__section'>{langEn ? 'Account' : 'Аккаунт'}</span>
            {currentUser ?
            <div>
              <span onClick={()=>{navigate('/user-settings')}} className='menu__item'><HowToRegIcon/> {langEn ? 'Profile' : 'Личный кабинет'} </span>
              <span onClick={()=>{onSignOut()}} className='menu__item'><LogoutIcon/> {langEn ? 'Sign out' : 'Выйти из аккаунта'} </span>
            </div>
            :
            <div>
              <span onClick={()=>{navigate('/sign-in')}} className='menu__item'><LoginIcon/> {langEn ? 'Sign in' : 'Вход'} </span>
              <span onClick={()=>{navigate('/sign-up')}}  className='menu__item'><HowToRegIcon/> {langEn ? 'Sign up' : 'Регистрация'} </span>
            </div>
            }
          </nav>
          <nav>
            <span className='menu__section'>{langEn ? 'Language / Язык' : 'Язык / Language'}</span>
            <span onClick={()=>{dispatch(setLangEn(true));}} className='menu__item'><img src={uk_flag}/> English / Английский </span>
            <span onClick={()=>{dispatch(setLangEn(false));}} className='menu__item'><img src={rus_flag}/>Русский / Russian </span>
          </nav>
          <nav>
            <span className='menu__item' onClick={()=>{navigate('/about')}}><InfoIcon/>{langEn ? 'About project' : 'О проекте'}</span>
          </nav>
        
        </div>
      </div>
      }
      
      {langEn ? 
        <nav className='header_controls_block'>
          <div className='header_aut_nav'>
          
          {currentUser  ? (
          <div className='header_aut_nav_wrapper'>
            <div title={langEn ? 'View Profile' : 'Личный кабинет'} onClick={()=>{navigate('/user-settings')}} className='header_aut_name_img_wrapper'>
              <span>{userName || userEmail}</span>
              <img className='header_aut_nav_img' src={avatarURL}/>
            </div>
        
            <button className='header_controls_block_single_btn_signin' title='Sign out' onClick={()=>{setShowPopover(true)}}><LogoutIcon fontSize='small' /></button>
            {!!showPopOver &&
          <div className='header_popover'>
            <span>{langEn ? 'Are you sure?' : "Вы уверены?"}</span>
            <div className='header_popover_btns_wrapper'>
              <button className='header_popover_btn' onClick={()=>{onSignOut()}}>{langEn ? 'Sign out' : "Выйти"}</button>
              <button className='header_popover_btn' onClick={()=>{setShowPopover(false)}}>{langEn ? 'Cancel' : "Выйти"}</button>
            </div>
          </div>
            }
          </div>
          )
          :
          (<div className='header_aut_nav_wrapper'>
            <button onClick={()=>navigate('/sign-in')} title='Sign in' className='header_controls_block_single_btn_signin' >
            <LoginIcon fontSize='small'/>Sign in</button>
            <button  onClick={()=>navigate('/register')} title='Sign up' className='header_controls_block_single_btn_signin' >
            <HowToRegIcon fontSize='small'/>Sign up</button>
          </div>)}
          </div>
          
          
          
        
          <div className='header_controls_block_nav_btns_wrapper'>
            <Link className='header_controls_block_single_btn_link' to="/">
              <button className='header_controls_block_single_btn' ><HomeIcon fontSize='small'/>Ноme</button></Link>
            <Link className='header_controls_block_single_btn_link' to="/music?page=1">
              <button className='header_controls_block_single_btn'><LibraryMusicIcon fontSize='small'/>Music</button></Link>
            <Link className='header_controls_block_single_btn_link' to="/texts?page=1">
              <button className='header_controls_block_single_btn'><LibraryBooksIcon fontSize='small'/>Texts</button></Link>
            <Link className='header_controls_block_single_btn_link' to="/pictures">
              <button className='header_controls_block_single_btn'><InsertPhotoOutlinedIcon fontSize='small'/>Pictures</button></Link>
          </div>
        </nav>
        :
        <nav className='header_controls_block'>
          <div className='header_aut_nav'>
          {currentUser ? (
          <div className='header_aut_nav_wrapper'>
          <div title={langEn ? 'View Profile' : 'Личный кабинет'} onClick={()=>{navigate('/user-settings')}} className='header_aut_name_img_wrapper'>
              <span>{userName || userEmail}</span>
              <img className='header_aut_nav_img' src={avatarURL}/>
            </div>
            <button className='header_controls_block_single_btn_signin' title='Выйти' onClick={()=>{setShowPopover(true)}}> <LogoutIcon fontSize='small'/></button>
            {!!showPopOver &&
          <div className='header_popover'>
            <span>{langEn ? 'Are you sure?' : "Вы уверены?"}</span>
            <div className='header_popover_btns_wrapper'>
              <button className='header_popover_btn' onClick={()=>{onSignOut()}}>{langEn ? 'Sign out' : "Выйти"}</button>
              <button className='header_popover_btn' onClick={()=>{setShowPopover(false)}}>{langEn ? 'Cancel' : "Отмена"}</button>
            </div>
          </div>
            }
          </div>
          )
          :
          (<div className='header_aut_nav_wrapper'>
            <button onClick={()=>navigate('/sign-in')} className='header_controls_block_single_btn_signin' >
            <LoginIcon/>Войти</button>
            <button  onClick={()=>navigate('/register')}  className='header_controls_block_single_btn_signin' >
            <HowToRegIcon/>Регистрация</button>
        </div>
        )}
          </div>
          <div className='header_controls_block_nav_btns_wrapper'>
            <Link className='header_controls_block_single_btn_link' to="/">
              <button className='header_controls_block_single_btn'><HomeIcon fontSize='small'/>Главная</button></Link>
            <Link className='header_controls_block_single_btn_link' to="/music?page=1">
              <button className='header_controls_block_single_btn'><LibraryMusicIcon fontSize='small'/>Музыка</button></Link>
            <Link className='header_controls_block_single_btn_link' to="/texts?page=1">
              <button className='header_controls_block_single_btn'><LibraryBooksIcon fontSize='small'/>Тексты</button></Link>
            <Link className='header_controls_block_single_btn_link' to="/pictures">
              <button className='header_controls_block_single_btn'><InsertPhotoOutlinedIcon fontSize='small'/>Картинки</button></Link>
            
          </div>
        
        </nav>
      }
      <div className='header_controls_block_languages' >
          
          <div className='header_controls_languages_wrapper' onClick={()=>{setShowLangPopOver(true)}} title={langEn? "Переключить язык" : "Switch to English"}>
          {langEn? "Язык" : "Language"}
              <img className='header_lang_img' src={langEn? uk_flag : rus_flag} alt='flag'/>
          </div>
          {showLangPopOver &&
            <div className='header_controls_languages_popover' onMouseLeave={()=>{setShowLangPopOver(false)}}>
              <img className='header_lang_img' title='English' src={uk_flag} alt='flag' onClick={()=>{onEnLangChange()}}/>
              <img className='header_lang_img' title='Русский' src={rus_flag} alt='flag' onClick={()=>{onRuLangChange()}}/>
            </div>
          }
        
        </div>
    </div>
  </div>  
  )
}
