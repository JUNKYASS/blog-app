import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { GetAlbumsQuery, useGetAlbumsQuery } from '../../graphql/generated';
import './style.scss';

type AlbumsProps = {
  setAlbumsCountHandler: (count: number) => void;
}

const Albums: React.FC<AlbumsProps> = ({ setAlbumsCountHandler }) => {
  const [total, setTotal] = useState<number>(); // Количество записей
  const [page, setPage] = useState<number>(1); // Счётчик страниц пагинации для подгрузки записей
  const [albumsData, setAlbumsData] = useState<GetAlbumsQuery | GetAlbumsQuery[] | any>([]); // Здесь храним все записи полученные из запроса

  const { data, loading } = useGetAlbumsQuery({ // Кастомный хук аполло, получаем данные
    variables: {
      page: page
    },
    onCompleted: data => {
      if(data?.albums?.meta?.totalCount && !total) { // Устанавливаем значение total
        setTotal(data?.albums?.meta?.totalCount);
      }
    }
  });

  useLayoutEffect(() => { // Добавим в стейт подгруженные данные
    if(!loading)
    !albumsData ? setAlbumsData([data?.albums]) : setAlbumsData((prevState: GetAlbumsQuery[]) => [...prevState, data?.albums]); // Сохраняем в одном месте альбомы
  }, [data]);

  useEffect(() => {
    if(total) {
      setAlbumsCountHandler(total); // Устанавливаем значение count, значение пробрасывается в компонент Tab (выводится в табе)
    }
  }, [total]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);

    return () => {
      document.removeEventListener('scroll', scrollHandler);
    };
  });

  const scrollHandler = (e: any) => { // Слушаем событие прокрутки страницы, ф-ия определяет когда пользователь дошел до конца списка
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
      if (total && page * 20 < total) {
        console.log('page"s end, loading page:', page + 1);
        setPage(page + 1);
      }
    }
  };

  return (
    <div className="albums" data-loading={loading}>
      <div className="album add">
        <span className="plus-icon"></span>
        <div className="title">Add album</div>
      </div>

      {
        !albumsData.length ? (
          <>
            <div className="album dummy">
              <div className="img"></div>
              <div className="info">
                <div className="name"></div>
                <div className="title"></div>
              </div>
            </div>
            <div className="album dummy">
              <div className="img"></div>
              <div className="info">
                <div className="name"></div>
                <div className="title"></div>
              </div>
            </div>
          </>
        ) : albumsData.map((page: any) => {
          return page.data.map((album: any, index: number) => {
            const firstPhoto = album?.photos?.data?.length && album?.photos?.data[0]?.thumbnailUrl;

            return (
              <div className="album" key={index}>
                <div className="img">{firstPhoto && <img src={firstPhoto} alt={album?.title || 'Album'} />}</div>
                <div className="info">
                  <div className="name">{album?.user?.name}</div>
                  <div className="title">{album?.title}</div>
                </div>
              </div>
            );
          });
        })
      }

      {loading && <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div> }
    </div>
  );
};

export {
  Albums
};