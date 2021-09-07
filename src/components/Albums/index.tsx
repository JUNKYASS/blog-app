import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { GetAlbumsQuery, useGetAlbumsQuery } from '../../graphql/generated';
import { AlbumsProps, CreateFormValues } from '../../types';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Album } from '../Album';
import { LoadingSpinner } from '../LoadingSpinner';
import { Modal } from '../Modal';
import './style.scss';
import Slider, { Settings } from 'react-slick';

const Albums: React.FC<AlbumsProps> = ({ setAlbumsCountHandler }) => {
  const [total, setTotal] = useState<any>(); // Количество записей
  const [page, setPage] = useState<number>(1); // Счётчик страниц пагинации для подгрузки записей
  const [albumsData, setAlbumsData] = useState<GetAlbumsQuery | GetAlbumsQuery[] | any>([]); // Здесь храним все записи полученные из запроса
  const [deleteModalActive, setDeleteModalActive] = useState<boolean>(false); // Состояние активности модального окна удаления записи
  const [createModalActive, setCreateModalActive] = useState<boolean>(false); // Состояние активности модального окна добавления записи
  const [galleryModalActive, setGalleryModalActive] = useState<boolean>(false); // Состояние активности модального окна с галереей
  const [galleryPhotos, setGalleryPhotos] = useState<any>([]); // Состояние активности модального окна с галереей
  const [currentItemId, setCurrentItemId] = useState<number>(0);
  const [deleteFlag, setDeleteFlag] = useState<boolean>(false);
  const [createFlag, setCreateFlag] = useState<boolean>(false);
  const [createFormValues, setCreateFormValues] = useState<CreateFormValues>({ title: '', description: '' });
  const { data, loading } = useGetAlbumsQuery({ variables: { page: page } }); // Кастомный хук аполло, отсюда получаем данные
  const sliderSettings: Settings = { // Настройка карусели в галерее фотографий
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <ArrowRightOutlined />,
    prevArrow: <ArrowLeftOutlined />
  };

  useLayoutEffect(() => {
    if (!loading) { // Добавим в стейт подгруженные данные
      !albumsData ? setAlbumsData([data?.albums?.data]) : setAlbumsData((prevState: GetAlbumsQuery[]) => [...prevState, data?.albums?.data]); // Сохраняем в одном месте альбомы

      if (!total) { // Добавим в стейт количество полученных записей
        setTotal(data?.albums?.meta?.totalCount);
      }
    }
  }, [data]);

  useEffect(() => { // Передаём наверх количество подгруженных записей
    if (total) setAlbumsCountHandler(total); // Устанавливаем значение count, значение пробрасывается в компонент Tab (выводится в табе) 
  }, [total]);

  useEffect(() => { // Событие на скролл страницы
    document.addEventListener('scroll', scrollHandler);

    return () => {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, [total, page]);

  useLayoutEffect(() => { // Удаление записи
    if (currentItemId !== 0 && deleteFlag === true) { // Если в стейте есть ID записи и стоит флаг на удаленеие
      const tempData = albumsData.map((page: any) => {
        return page.filter((album: any) => album.id !== currentItemId); // Убираем ненужную запись
      });

      setAlbumsData(tempData); // Устанавливаем в стейт новый массив
      setDeleteFlag(false); // Снимаем флаг удаления записи
      deleteModalActiveHandler(false, 0); // Закрываем модалку
    }
  }, [deleteFlag]);

  const deleteModalActiveHandler = useCallback((isActive: boolean, itemId: number): void => { // Управление модальным окном удаления записей
    setDeleteModalActive(isActive);
    setCurrentItemId(itemId);
  }, [currentItemId]);

  useLayoutEffect(() => {
    if (createFlag === true && createFormValues.title && createFormValues.description) { // Если активен флаг создания и заполнены инпуты
      const newAlbum = { // Готовим новую запись
        id: '1000',
        title: createFormValues.description,
        photos: { __typename: 'PhotosPage', data: [] },
        user: { __typename: 'User', name: createFormValues.title },
        __typename: 'Album'
      };

      const tempData = albumsData; // Создаём временное хранилище
      tempData[0] = [newAlbum, ...tempData[0]]; // Добавляем новую запись в начало массива

      setAlbumsData(tempData); // // Устанавливаем в стейт новый массив
      setCreateFlag(false); // Снимаем флаг создания записи
      setCreateModalActive(false); // Закрываем модалку
      setCreateFormValues({ title: '', description: '' }); // Очищаем значения инпутов в стейте
    }

    // Мутация GraphQL, шаблон запроса
    // mutation($title: String!, $userId: ID!) {
    //   createAlbum(input:{title:$title, userId:$userId}) {
    //     title
    //   }
    // }
  }, [createFlag]);

  const setGalleryModalActiveHandler = (isActive: boolean, photos: any): void => {
    if (photos && photos.length && isActive) {
      setGalleryModalActive(true);
      setGalleryPhotos(photos);
    }
  };

  const setCreateFormValuesHandler = (name: string) => { // Функция установки значений инпутов в стейт
    return ({ target: { value } }: any) => {
      setCreateFormValues(oldValues => ({ ...oldValues, [name]: value }));
    };
  };

  const scrollHandler = (e: any): void => { // Слушаем событие прокрутки страницы, ф-ия определяет когда пользователь дошел до конца списка
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) === 0
      && albumsData.length + 1 < total / 20) {
      console.log('page"s end, loading page:', page + 1);
      setPage(page + 1);
    }
  };

  return (
    <div className="albums" data-loading={loading}>
      <div className="album add" onClick={() => setCreateModalActive(true)}>
        <span className="plus-icon"></span>
        <div className="title">Add album</div>
      </div>

      {
        !albumsData.length ? (
          <>
            <Album dummy={true} />
            <Album dummy={true} />
          </>
        ) : albumsData.map((page: any) => { // Проходимся по "страницам" с записями
          return page.map((album: any) => { // Проходимся по самим записям
            return <Album
              key={album.id}
              unique={album.id}
              data={album}
              setDeleteModalActive={deleteModalActiveHandler}
              setGalleryModalActiveHandler={setGalleryModalActiveHandler}
            />;
          });
        })
      }

      {loading && <LoadingSpinner />}

      {
        deleteModalActive &&
        <Modal active={deleteModalActive} setActive={deleteModalActiveHandler}>
          <div className="delete-prompt">
            <div className="icon"><img src="/delete.svg" alt="delete icon" /></div>
            <div className="title">Delete album</div>
            <div className="notice">Album will be permanently deleted</div>
            <div className="delete-cofirm-btn" onClick={() => setDeleteFlag(true)}>Delete</div>
          </div>
        </Modal>
      }

      {
        createModalActive &&
        <Modal active={createModalActive} setActive={setCreateModalActive}>
          <div className="create-prompt">
            <div className="title">Add album</div>

            <label>
              <span className="label-name">Title</span>
              <input type="text" name="title" value={createFormValues.title} onChange={setCreateFormValuesHandler('title')} />
            </label>

            <label>
              <span className="label-name">Description</span>
              <input type="text" name="description" value={createFormValues.description} onChange={setCreateFormValuesHandler('description')} />
            </label>

            <div className="create-cofirm-btn" onClick={() => setCreateFlag(true)}>Send</div>
          </div>
        </Modal>
      }

      {
        galleryModalActive && galleryPhotos.length &&
        <Modal active={galleryModalActive} setActive={setGalleryModalActive}>
          <Slider {...sliderSettings}>
            {
              galleryPhotos.map((photo: any) => {
                return <img key={photo.id} src={photo.url} alt={photo.title} />;
              })
            }
          </Slider>
        </Modal>
      }
    </div>
  );
};

export {
  Albums
};