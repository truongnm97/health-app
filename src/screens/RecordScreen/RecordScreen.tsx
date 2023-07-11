import { useState } from 'react'
import classes from './RecordScreen.module.scss'
import clsx from 'clsx'
import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useGetUserDiaries, useGetUserExercises, useGetUserRecord } from 'api'
import { Loading } from 'components'

export default function RecordScreen() {
  const [chartType, setChartType] = useState<(typeof CHART_TYPES)[number]>('年')
  const { data: record, isLoading: recordLoading, refetch: refetchRecord } = useGetUserRecord()
  const { data: exercises, isLoading: exercisesLoading } = useGetUserExercises()
  const {
    data: diaries,
    isLoading: diariesLoading,
    isFetchingNextPage: diariesFetchingNextPage,
    fetchNextPage: diariesFetchNextPage,
    hasNextPage: diariesHasNextPage,
  } = useGetUserDiaries()

  const chartOptions: Highcharts.Options = {
    chart: {
      backgroundColor: 'transparent',
      height: 200,
      spacing: [0, 0, 0, 0],
    },
    title: {
      text: '',
    },
    series: [
      {
        type: 'line',
        name: 'Body weight',
        data: record?.bodyFat,
        lineWidth: 3,
        color: '#FFCC21',
      },
      {
        type: 'line',
        name: 'Body fat',
        data: record?.bodyWeight,
        lineWidth: 3,
        color: '#8FE9D0',
        marker: {
          symbol: 'circle',
        },
      },
    ],
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    yAxis: {
      gridLineWidth: 0,
      labels: {
        enabled: false,
      },
      title: {
        text: null,
      },
    },
    xAxis: {
      type: 'datetime',
      gridLineWidth: 1,
      gridLineColor: '#777',
      tickWidth: 0,
      lineWidth: 0,
      labels: {
        style: {
          color: 'white',
        },
      },
      tickmarkPlacement: 'on',
      categories: [
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月',
      ],
    },
  }

  return (
    <div className={classes.ctn}>
      <div className={classes.filterCtn}>
        {RECOMMENDATIONS.map(({ id, description, imageSrc, title }) => (
          <a href={`#${id}`} key={title} className={classes.filterItem}>
            <img src={imageSrc} alt='My recommend' />
            <div className={classes.titleCtn}>
              <div className={classes.title}>{title}</div>
              <div className={classes.description}>{description}</div>
            </div>
          </a>
        ))}
      </div>
      <div id='body-record' className={classes.bodyRecord}>
        <div className={classes.titleCtn}>
          <div className={classes.title}>BODY RECORD</div>
          <div className={classes.date}>2021.05.21</div>
        </div>
        <div className={classes.chart}>
          <Loading isLoading={recordLoading} overlay />
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>
        <div className={classes.filterBtnCtn}>
          {CHART_TYPES.map((val) => (
            <button
              key={val}
              className={clsx(classes.filterBtn, chartType === val && classes.selected)}
              onClick={() => {
                refetchRecord()
                setChartType(val)
              }}>
              {val}
            </button>
          ))}
        </div>
      </div>
      <div id='my-exercise' className={classes.myExercise}>
        <div className={classes.titleCtn}>
          <div className={classes.title}>MY EXERCISE</div>
          <div className={classes.date}>2021.05.21</div>
        </div>
        <div className={classes.exercisesCtn}>
          <Loading isLoading={exercisesLoading} overlay />
          {exercises?.data.map(({ duration, title, calories, id }) => (
            <div key={id} className={classes.exercise}>
              <div className={classes.headline}>
                <div className={classes.title}>{title}</div>
                <div className={classes.description}>{calories}</div>
              </div>
              <div className={classes.duration}>{duration}</div>
            </div>
          ))}
        </div>
      </div>
      <div id='my-diary' className={classes.myDiary}>
        <div className={classes.title}>MY DIARY</div>
        <div className={classes.diaries}>
          {diaries?.pages.map(({ data }) =>
            data.map(({ id, content, createdDate }) => (
              <div key={id} className={classes.diary}>
                <div className={classes.createdDate}>{createdDate}</div>
                <div className={classes.content}>{content}</div>
              </div>
            )),
          )}
        </div>
      </div>
      <Loading isLoading={diariesFetchingNextPage || diariesLoading} />
      {diariesHasNextPage && (
        <div className={classes.showMore}>
          <button
            type='button'
            className='button'
            onClick={() => diariesFetchNextPage()}
            disabled={diariesFetchingNextPage || diariesLoading}>
            自分の日記をもっと見る
          </button>
        </div>
      )}
    </div>
  )
}

const CHART_TYPES = ['日', '週', '月', '年'] as const

const RECOMMENDATIONS = [
  {
    id: 'body-record',
    title: 'BODY RECORD',
    imageSrc: '/images/MyRecommend-1.jpg',
    description: '自分の運動の記録',
  },
  {
    id: 'my-exercise',
    title: 'MY EXERCISE',
    imageSrc: '/images/MyRecommend-2.jpg',
    description: '自分の運動の記録',
  },
  {
    id: 'my-diary',
    title: 'MY DIARY',
    imageSrc: '/images/MyRecommend-3.jpg',
    description: '自分の日記',
  },
]
