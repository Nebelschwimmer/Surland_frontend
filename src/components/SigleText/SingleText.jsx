import './singleText.scss'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { ModalWindow } from '../ModalWindow/ModalWindow';
import { deleteTextFromItsPage, updateRuTextById } from '../../utils/api_texts';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { updateEnTextById } from '../../utils/api_texts';
import { useForm } from "react-hook-form";
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import { Backbutton } from '../BackButton/BackButton';
import { CommentsForm } from './CommentsForm/CommentsForm';
import cn from 'classnames'
import { Comments } from './Comments/Comments';
import { Link } from 'react-router-dom';
import { updateTextNameEn } from '../../utils/api_texts';
import { updateTextNameRu } from '../../utils/api_texts';


export const SingleText = ({singleText, langEn, setSingleText, showModal, setLangEn, setShowModal, currentUser, handleTextLike}) => {

const navigate = useNavigate(); 

const [noContent, setNoContent] = useState(false);
const [contentEn, setContentEn] = useState('');
const [contentRu, setContentRu] = useState('');
const [editMode, setEditMode] = useState(false);
const [updateSuccess, setUpdateSuccess] = useState(false);
const [favText, setFavText] = useState(false);
const [showComments, setShowComments] = useState(false);
const [showDeleteIcon, setShowDeleteIcon] = useState(false);
const [showNotAuth, setShowNotAuth] = useState(false);
const [editName, setEditName] = useState(false);
const [ruName, setRuName] = useState(singleText.name_ru)
const [enName, setEnName] = useState(singleText.name_en)
const inputRef = useRef(null)

const user_id = currentUser.uid
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm();

useEffect(()=>{
if (currentUser !== '' && currentUser.uid === singleText.author_id)
setShowDeleteIcon(true)
}, [currentUser])

useEffect(()=>{
  if (currentUser === '')
  setShowNotAuth(true)
  else setShowNotAuth(false)
}, [currentUser])


const options = { 
  day: "numeric",
  month: "numeric",
  year: "numeric",
  timeZone: "Europe/Moscow",
  hour: "2-digit", 
  minute: "2-digit"
  }

const createdAtDate = new Date (singleText.createdAt).toLocaleString("ru-RU", options);

const textID = singleText._id;

useEffect(()=>{
  if (singleText.likes?.includes(user_id))
  setFavText(true)
  else setFavText(false)
  }, [singleText, favText]);


const onTextDelete = async (textID) => {
  try {
  await deleteTextFromItsPage(textID);
  navigate('/texts');
  setShowModal(false)
  }
  catch(err) {
    console.log(err)
  }
}

useEffect(()=>{
  if (!langEn && contentRu === '')
  setNoContent(true);
  else setNoContent(false);
  if (langEn && contentRu !== '')
  setNoContent(true);
  if (contentEn !== '' && contentRu !== '')
  setNoContent(false);
  if (updateSuccess)
  setNoContent(false)
}, [langEn, contentRu, noContent, updateSuccess])

useEffect (()=>{
  if (singleText.content_en !== '') {
  const enContentSplited = singleText.content_en.split('\n');
  const newEnContent = enContentSplited.map((e, i)=> {  
    return (
        <p className='text__readonly__p' key={i}>
        {e}
        </p>
    )
  })
  setContentEn(newEnContent)
  }
  else setContentEn('')
}, 
[singleText])

useEffect (()=>{
  if (singleText.content_ru !== '') {
  const ruContentSplited = singleText.content_ru.split('\n');
  const newRuContent = ruContentSplited.map((e, i)=> {
    return (
      <p className='text__readonly__p' key={i}>{e}</p>
    )
  })
  setContentRu(newRuContent)
  }
  else setContentRu('')
}, 
[singleText])



const sendUpdatedEnText = async (data) => {
    try {
        await updateEnTextById(textID, data)
        .then(res => setSingleText(()=>({...res})));
        setUpdateSuccess(true);
        setEditMode(false);
      }
      catch(err) {
      console.log(err)
      }
}

const sendUpdatedRuText = async (data) => {
  try {
      await updateRuTextById(textID, data)
      .then(res => setSingleText(res));
      setUpdateSuccess(true);
      setEditMode(false);
    }
    catch(err) {
    console.log(err)
    }
}
const sendUpdatedNameEn = async (data) => {
  
  try {
      await updateTextNameEn(textID, data)
      .then(res => setSingleText(()=>({...res})));
      setUpdateSuccess(true);
      setEditName(false); 
    }
    catch(err) {
    console.log(err)
    }
}

const sendUpdatedNameRu = async (data) => {
  try {
    await updateTextNameRu(textID, data)
    .then(res => setSingleText(()=>({...res})));
    setUpdateSuccess(true);
    setEditName(false); 
  }
  catch(err) {
  console.log(err)
  }
}





useEffect(()=>{
if (updateSuccess)
  setTimeout(()=>{
  setUpdateSuccess(false)
}, 5000)
}, [updateSuccess])

const onTextLike = () => {
  handleTextLike(textID, user_id);
}

const handleNameEditClick = () => {
  setEditName(true);
  if (editName)
  setEditName(false)
}





document.addEventListener("keydown", function(event) {
  if (event.key === 'Escape') {
    setEditName(false);
    setEditMode(false)
  }
})



const handleChangeEn = (event) => {
  setEnName(event.target.value)
}

const handleChangeRu = (event) => {
  setRuName(event.target.value)
}

const nameEnRegister = register("name_en", {
    
  maxLength: {
    value:50,
    message:
    "Your name is too long, it must not exceed 25 characters",
    }
  }
);

const nameRuRegister = register("name_ru", {
  
  maxLength: {
    value:50,
    message:
    "Название слишком длинное, оно должно быть не длиннее 25 символов",
    }
  }
);
console.log(enName, singleText.name_en)

  return (
    <div className='single__text__main__container'>
    <div className='single__text__top'>
      
      <div className='single__text__top__wrapper'>
        <div onClick={()=>{navigate(-1)}}>
          <Backbutton/>
        </div>
        
        <div className='single__text__top__titile__container'>
          <div>
            <div className='single__text__top__name'>
            
              {!!langEn ?
              <form className='single__text__top__name__form' onSubmit={handleSubmit(sendUpdatedNameEn)}>
                <input
                  type='text'
                  value={enName}
                  readOnly={!editName}
                  onInput={handleChangeEn}
                  id='name_input'
                  {...nameEnRegister}
                  className={cn('single__text__top__name__input', { ['single__text__top__name__input__Active']: editName })}
                >
                </input>
              </form>
              :
              <form className='single__text__top__name__form' onSubmit={handleSubmit(sendUpdatedNameRu)}>
                <input
                  id='name_input'
                  type='text'
                  value={ruName}
                  {...nameRuRegister}
                  readOnly={!editName}
                  className={cn('single__text__top__name__input', { ['single__text__top__name__input__Active']: editName })}
                  onInput={handleChangeRu}
                >
                </input>
              </form>
              }
              
              
              {showDeleteIcon && 
              <span title={langEn ? "Edit Name" : "Редактировать название"}  
                onClick={()=>{handleNameEditClick()}}><EditIcon fontSize='small' /> 
              </span>
              }
            </div>
            <em >{singleText.author}</em>
          </div>
          <button onClick={()=>{navigate('/texts/add-text')}} className='add__text__sumbit_btn' type='submit'>{langEn? "Publish new Text" : "Опубликовать новый текст"}</button>
        </div>
      </div>
      
      <div className='single__text__top__lower' >
        <div className='single__text__top__lower__timestamps'>
          <span><em>{langEn ? "Published" : "Опубликовано"} : {createdAtDate}</em></span>
        
        </div>
        <div className='single__text__top__lower__middle__container'> 
          <div className='single__text__top__lower__middle__wrapper'>
            {showNotAuth && 
            <Link to='/sign-in' style={{color: 'darkorange'}}>{langEn ? 
              <span >Please, sign in or sign up to set text favorite or comment it</span> : 
              <span>Пожалуйста, авторизуйтесь, чтобы добавить текст в избранное и комментировать его</span>}
            </Link>}
            <button className={cn("single__text__top__lower__like__btn", { ["single__text__top__lower__like__btn__Active"]: favText })} onClick={()=> onTextLike()}>
              <FavoriteIcon fontSize='small'/>
            </button>
            <span title={langEn ? 'Like it' : 'Нравится'}>{singleText.likes.length}</span>
          </div>
          <div className='single__text__top__lower__middle__wrapper'>
            <CommentIcon className='single__text__top__lower__like__btn' fontSize='small'/>
            <span title={langEn ? 'Comments' : 'Комментарии'}>{singleText.comments.length}</span>
          </div>
        </div>
        
        {showDeleteIcon &&
          <div className='single__text__top__lower__ctrl__btn__container'>
            <button className='single__text__top__lower__ctrl__btn' title={langEn ? "Delete" : "Удалить"}  
            onClick={()=>{setShowModal(true)}}> <DeleteForeverIcon fontSize='small' /> </button>
            <button className='single__text__top__lower__ctrl__btn' title={langEn ? "Edit" : "Редактировать"}  
            onClick={()=>{setEditMode(true)}}><EditIcon fontSize='small' /> </button>
          </div>
          
        }

      </div>
    </div>
    {!!showModal && 
      <ModalWindow showModal={showModal} setShowModal={setShowModal}> 
      <div className='modal_top'>
        <h3 style={{color:'darkorange'}}>{langEn ? "Are you sure?" : "Вы уверены?"}</h3>
      </div>
        <div className='modal_btns_wrapper'>
          <button onClick={()=>{onTextDelete(textID)}} className='modal_btn_warn'>{langEn ? "Delete Text" : "Удалить текст"}</button>
          <button onClick={()=>{setShowModal(false)}} className='modal_btn'>{langEn ? "Cancel" : "Отмена"}</button>
        </div>
      </ModalWindow>
    }
      {updateSuccess && <small>{langEn ? 'Text successfully updated!' : 'Текст успешно обновлен!'}</small>}
      {!editMode ?
        <div className='single__text__textarea__containter'>
          <div>{langEn ? contentEn : contentRu}</div>
          
          {!!noContent && <div>
            {langEn ? 
            <div className='single__text__notAvailable__container'>
              <span>Unfortunately, there is no Enlgish version of this text</span>
              <span id='change_lang' onClick={()=>{setLangEn(false)}}> See Russian version</span>
            </div> 
            : 
            <div>
              <span className='single__text__notAvailable__container'>К сожалению, версии на русском языке этого текста нет</span>
              <span id='change_lang' onClick={()=>{setLangEn(true)}}>Посмотреть английскую версию</span>
            </div>}
          </div>}
        </div>

        :

        <div className='single__text__textarea__editMode__containter'>
          <div>
            <span>{langEn ? "Edit Mode" : "Режим редактирования"}</span>
            <span onClick={()=>{setEditMode(false)}} className='close__span' title={langEn ? "Quit Edit Mode" : "Выйти из режима редактирования"}>
              <CloseIcon/>
            </span>
          </div>
          {langEn ?
            <form onSubmit={handleSubmit(sendUpdatedEnText)}>
              <textarea className='textarea_auto' defaultValue={singleText.content_en} {...register("content_en")}></textarea>
              <button className='add__text__sumbit_btn' type='submit'>Send</button>
            </form>
            :
            <form onSubmit={handleSubmit(sendUpdatedRuText)}>
              <textarea className='textarea_auto' defaultValue={singleText.content_ru} {...register("content_ru")}></textarea>
              <button 
                className='add__text__sumbit_btn'
                type='submit'>{langEn? "Send" : "Отправить"}
              </button>
            </form>
          }    
        </div>
      }
    <section className='single__text__comments__section'>
      {!showComments && <button 
      onClick={()=>{setShowComments(true)}} 
      disabled={showNotAuth} 
      className={cn("add__text__sumbit_btn", { ["add__text__sumbit_btn__Disabled"]: showNotAuth })}
      >
        {langEn ? 'Comment' : 'Комментировать'}</button> }
      {showComments &&
        <div className='single__text__comments__section__upper'>
          <small onClick={()=>{setShowComments(false)}}><CloseIcon/></small>
          <CommentsForm setShowComments={setShowComments} setSingleText={setSingleText} textID={textID} user_id={user_id} currentUser={currentUser} langEn={langEn}/>
        </div>
      }
      {
        singleText.comments.length !== 0  ? 
        <Comments user_id={user_id} currentUser={currentUser}  options={options} textID={textID} singleText={singleText} setSingleText={setSingleText}/>
            :  
            <span>{langEn ? 'No comments yet' : 'Комментариев пока нет'}</span>
        }
    </section>
    </div>
  )
}