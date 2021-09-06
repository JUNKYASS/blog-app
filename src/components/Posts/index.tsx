import React, { useEffect, useLayoutEffect, useState } from 'react';
import { GetPostsQuery, useGetPostsQuery } from '../../graphql/generated';

type PostsProps = {
  setPostsCountHandler: (count: number) => void;
}

const Posts: React.FC<PostsProps> = ({ setPostsCountHandler }) => {
  const [total, setTotal] = useState<number>(); // Количество записей
  const [page, setPage] = useState<number>(1); // Счётчик страниц пагинации для подгрузки записей
  const [postsData, setPostsData] = useState<GetPostsQuery | GetPostsQuery[] | any>([]); // Здесь храним все записи полученные из запроса
  
  const {data, loading} = useGetPostsQuery({
    variables: {
      page: page
    },
    onCompleted: data => {
      if(data) console.log(data);
      if(data?.posts?.meta?.totalCount && !total) { // Устанавливаем значение total
        setTotal(data?.posts?.meta?.totalCount);
      }
    }
  });

  useLayoutEffect(() => { // Добавим в стейт подгруженные данные
    if(!loading)
    !postsData ? setPostsData([data?.posts]) : setPostsData((prevState: GetPostsQuery[]) => [...prevState, data?.posts]); // Сохраняем в одном месте альбомы
  }, [data]);

  useEffect(() => {
    if(total) {
      setPostsCountHandler(total); // Устанавливаем значение count, значение пробрасывается в компонент Tab (выводится в табе)
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
<div className="posts" data-loading={loading}>
      {
        !postsData.length ? (
          <>
            <div className="post dummy">
              <div className="info">
                <div className="name"></div>
                <div className="title"></div>
              </div>
            </div>
            <div className="post dummy">
              <div className="info">
                <div className="name"></div>
                <div className="title"></div>
              </div>
            </div>
          </>
        ) : postsData.map((page: any) => {
          return page.data.map((post: any, index: number) => {
            return (
              <div className="album" key={index}>
                <div className="info">
                  <div className="name">{post?.user?.name}</div>
                  <div className="title">{post?.title}</div>
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
  Posts
};
