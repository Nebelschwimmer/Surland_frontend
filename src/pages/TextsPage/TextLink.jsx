import { Link } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import { useState, useEffect } from 'react';
import { getPublisherInfoByID } from '../../utils/api_texts';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
export const TextLink = ({link, langEn}) => {

  const options = { 
    day: "numeric",
    month: "numeric",
    year: "numeric",
    }


    const [userInfo, setUserInfo] = useState({});
    
    const publisherID = link.publisher_id
  



    
  useEffect(()=>{
    getPublisherInfoByID(publisherID).then(res => {
    if (res.message === 'Success')
    setUserInfo(()=>({...res}))
    else setUserInfo({publisher_name: 'Deleted / Удаленный', publisher_avatar: 'https://cdn-icons-png.freepik.com/512/3519/3519212.png'})
  })
  },[])



  return (
    <>
      <Link to={`/texts/${link._id}`} className='texts__page__text__info__container'>
                  
                  <div className='texts__page__text__main__info__wrapper'>
                    <div className='texts__page__text__main__info__top__wrapper'>
                      <h4>{langEn ? link.name_en : link.name_ru}</h4>
                
                    </div>
                    <div>
                      <em>{langEn ? link.author_en : link.author_ru}</em>
                    </div>
                  </div>
                  <div className='texts__page__text__add__info'>
                    <div>
                      <span >{langEn ? 'Published': "Опубликовал"}</span>
                      <span>{userInfo.publisher_name}</span>
                    
                      <img alt='avatar' src={userInfo.publisher_avatar || 'https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg'}></img>
                      <span>{new Date (link.createdAt).toLocaleString("ru-RU", options)}</span>
                      
                    </div>
                    <div>
                      {link.likes.length !== 0 &&
                      <div>
                        <span>{langEn ? 'Likes:': "Понравилось:"}</span>
                        <span>{link.likes.length}</span>
                        <span>
                          <FavoriteIcon fontSize=''/>
                        </span>
                      </div>
                      }
                      {link.comments.length !== 0 &&
                      <div>
                        <span>{langEn ? 'Comments:': "Комментарии:"}</span>  
                        <span>{link.comments.length}</span>
                        <span>
                          <CommentIcon fontSize=''/>
                        </span>
                      </div>
                      }
                    </div>
                  </div>
            
            </Link>
    </>
  )
}