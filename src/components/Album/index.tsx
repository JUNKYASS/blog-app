import React from 'react';
import { AlbumProps } from '../../types';
import './style.scss';

const Album: React.FC<AlbumProps> = ({ unique = 0, data, setDeleteModalActive, setGalleryModalActiveHandler, dummy }) => {
  let firstPhoto: string = '';
  let allPhotos: any = [];
  if (data?.photos?.data?.length) {
    firstPhoto = data?.photos?.data[0]?.thumbnailUrl;
    allPhotos = data?.photos?.data;
  }

  const optionsBtnHandler = (e: any): void => {
    e.target.parentNode.classList.toggle('active');
  };

  return !dummy && setDeleteModalActive && setGalleryModalActiveHandler ? (
    <div className="album" data-unique={unique}>
      <div className="img" onClick={() => setGalleryModalActiveHandler(true, allPhotos)} >
        {firstPhoto && <img src={firstPhoto} alt={data?.title || 'Album'} />}
      </div>
      <div className="info">
        <div className="name">{data?.user?.name}</div>
        <div className="title">{data?.title}</div>
      </div>
      <div className="options">
        <div className="toggle-options-btn" onClick={optionsBtnHandler}>...</div>
        <div className="options-menu">
          <div className="option delete" onClick={() => setDeleteModalActive(true, unique)}>Delete</div>
        </div>
      </div>
    </div>
  ) : (
    <div className="album dummy">
      <div className="img"></div>
      <div className="info">
        <div className="name"></div>
        <div className="title"></div>
      </div>
    </div>
  );
};

export {
  Album
};
