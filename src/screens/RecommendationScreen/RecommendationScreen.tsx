import { useGetUserRecommendations } from 'api'
import classes from './RecommendationScreen.module.scss'
import { Loading } from 'components'

export default function RecommendationScreen() {
  const {
    data: recommendations,
    isLoading: recommendationsLoading,
    isFetchingNextPage: recommendationsFetchingNextPage,
    fetchNextPage: recommendationsFetchNextPage,
    hasNextPage: recommendationsHasNextPage,
  } = useGetUserRecommendations()

  return (
    <div className={classes.ctn}>
      <div className={classes.titleCtn}>
        {COLUMNS.map(({ description, title }) => (
          <div key={title} className={classes.titleItem}>
            <div className={classes.heading}>{title}</div>
            <hr />
            <div className={classes.description}>{description}</div>
          </div>
        ))}
      </div>
      <div className={classes.articlesCtn}>
        {recommendations?.pages.map(({ data }) =>
          data.map(({ id, createdDate, hashtag, imageSrc, title }) => (
            <div key={id} className={classes.article}>
              <div className={classes.articleCover}>
                <img src={imageSrc} alt='Article' />
                <div className={classes.createdDate}>{createdDate}</div>
              </div>
              <div className={classes.title}>{title}</div>
              <div className={classes.hashtag}>{hashtag.join('   ')}</div>
            </div>
          )),
        )}
      </div>
      <Loading isLoading={recommendationsLoading || recommendationsFetchingNextPage} />
      {recommendationsHasNextPage && (
        <div className={classes.showMore}>
          <button
            type='button'
            className='button'
            onClick={() => recommendationsFetchNextPage()}
            disabled={recommendationsLoading || recommendationsFetchingNextPage}>
            コラムをもっと見る
          </button>
        </div>
      )}
    </div>
  )
}

const COLUMNS = [
  {
    title: 'RECOMMENDED COLUMN',
    description: 'オススメ',
  },
  {
    title: 'RECOMMENDED DIET',
    description: 'ダイエット',
  },
  {
    title: 'RECOMMENDED BEAUTY',
    description: '美容',
  },
  {
    title: 'RECOMMENDED HEALTH',
    description: '健康',
  },
]
