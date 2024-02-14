
import { useState, useEffect } from 'react';
import { SingleText } from '../../../components/SigleText/SingleText';

import { useParams } from 'react-router-dom';
import { getTextByID } from '../../../utils/api_texts';
import { addTextToFavourites } from '../../../utils/api_texts';
import { removeTextFromFavourites } from '../../../utils/api_texts';
import { Spinner } from '../../../components/Spinner/Spinner';

export const SingleTextPage = ({langEn, setLangEn, showModal, setShowModal, currentUser}) => {

const [singleText, setSingleText] = useState(undefined) 
const id = useParams()
const textID = id?.textID



// Getting text by ID
useEffect(()=>  { 
  getTextByID(textID)
  .then((res) => {
    setSingleText(res);
  });
}, [id?.textID])

const handleTextLike = async (textID, user_id) =>{
  const textIsLiked = singleText?.likes?.some((s) => s === user_id);
  try {
  if (textIsLiked) {
      await removeTextFromFavourites(textID, {user_id: user_id} )
      .then((newTextLikes)=>
        setSingleText(()=>({...newTextLikes})));
      }
    else {
      await addTextToFavourites(textID, {user_id: user_id})
      .then((newTextLikes)=>
      setSingleText(()=>({...newTextLikes})));  
      }
    }
    catch(err) {
      console.log(err)
    }
  }


  return (
    <>
      {
        singleText !== undefined ?
          <SingleText
          singleText={singleText}
          setLangEn={setLangEn}
          key={textID}
          setSingleText={setSingleText}
          langEn={langEn}
          showModal={showModal}
          setShowModal={setShowModal}
          currentUser={currentUser}
          handleTextLike={handleTextLike}
        />
      :
        <div className='single__text__page__spinner__container'><Spinner/></div>
      }
  </> 
      )

  
}