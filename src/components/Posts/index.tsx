import React, { useEffect, useLayoutEffect, useState } from 'react';
import { GetPostsQuery, useGetPostsQuery } from '../../graphql/generated';
import { PostsProps } from '../../types';
import { LoadingSpinner } from '../LoadingSpinner';
import './style.scss';

const Posts: React.FC<PostsProps> = ({ setPostsCountHandler }) => {
  const [total, setTotal] = useState<any>(); // Количество записей
  const [page, setPage] = useState<number>(1); // Счётчик страниц пагинации для подгрузки записей
  const [postsData, setPostsData] = useState<GetPostsQuery | GetPostsQuery[] | any>([]); // Здесь храним все записи полученные из запроса

  const { data, loading } = useGetPostsQuery({
    variables: {
      page: page
    }
  });

  useLayoutEffect(() => {
    if (!loading) { // Добавим в стейт подгруженные данные
      !postsData ? setPostsData([data?.posts]) : setPostsData((prevState: GetPostsQuery[]) => [...prevState, data?.posts]); // Сохраняем в одном месте альбомы

      if (!total) { // Добавим в стейт количество полученных записей
        setTotal(data?.posts?.meta?.totalCount);
      }
    }
  }, [data]);

  useEffect(() => { // Передаём наверх количество подгруженных записей
    if (total) setPostsCountHandler(total); // Устанавливаем значение count, значение пробрасывается в компонент Tab (выводится в табе) 
  }, [total]);

  useEffect(() => { // Событие на скролл страницы
    document.addEventListener('scroll', scrollHandler);

    return () => {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, [total, page]);

  const scrollHandler = (e: any) => { // Слушаем событие прокрутки страницы, ф-ия определяет когда пользователь дошел до конца списка
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) === 0
      && postsData.length + 1 < total / 20) {
      console.log('page"s end, loading page:', page + 1);
      setPage(page + 1);
    }
  };

  return (
    <div className="posts" data-loading={loading}>
      {
        !postsData.length ? (
          <>
            <div className="post dummy">
              <div className="name"></div>
              <div className="title"></div>
              <div className="text">
                <span className="line"></span>
                <span className="line"></span>
                <span className="line"></span>
              </div>
            </div>
            <div className="post dummy">
              <div className="name"></div>
              <div className="title"></div>
              <div className="text">
                <span className="line"></span>
                <span className="line"></span>
                <span className="line"></span>
              </div>
            </div>
            <div className="post dummy">
              <div className="name"></div>
              <div className="title"></div>
              <div className="text">
                <span className="line"></span>
                <span className="line"></span>
                <span className="line"></span>
              </div>
            </div>
          </>
        ) : postsData.map((page: any) => {
          return page.data.map((post: any, index: number) => {
            return (
              <div className="post" key={post?.id | index}>
                <div className="name">{post?.user?.name}</div>
                <div className="title">{post?.title}</div>
                <div className="text">{post?.body.length > 200 ? post?.body.substring(0, 200) + '...' : post?.body}</div>
              </div>
            );
          });
        })
      }

      {loading && <LoadingSpinner />}
    </div>
  );
};

export {
  Posts
};
