import React, { useCallback, useState } from 'react';
import { Albums } from '../components/Albums';
import { Posts } from '../components/Posts';
import { Tabs, Tab } from '../components/Tabs';

const Feed: React.FC = () => {
  const [albumsCount, setAlbumsCount] = useState<number>(0);
  const [postsCount, setPostsCount] = useState<number>(0);

  const setAlbumsCountHandler = useCallback((count: number) => { // Пробрасываем колбек для установки итогового кол-ва записей альбомов
    console.log('Albums count just has been set');
    setAlbumsCount(count);
  }, [albumsCount]);

  const setPostsCountHandler = useCallback((count: number) => { // Пробрасываем колбек для установки итогового кол-ва записей постов
    console.log('Posts count just has been set');
    setPostsCount(count);
  }, [postsCount]);

  return (
    <section className="feed">
      <h1>Feed</h1>

      <Tabs>
        <Tab title="Albums" count={albumsCount}>
          <Albums setAlbumsCountHandler={setAlbumsCountHandler} />
        </Tab>
        <Tab title="Posts" count={1}>
          <Posts setPostsCountHandler={setPostsCountHandler} />
        </Tab>
      </Tabs>
    </section>
  );
};

export {
  Feed
};