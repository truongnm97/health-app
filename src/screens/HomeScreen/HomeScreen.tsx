import { useGetUserMeal, useGetUserMeals, useGetUserRecord } from 'api'
import classes from './HomeScreen.module.scss'
import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { Loading } from 'components'
import { useState } from 'react'
import clsx from 'clsx'

export default function HomeScreen() {
  const [mealType, setMealType] = useState<TUserMealType>()
  const {
    data: meals,
    isLoading: mealsLoading,
    fetchNextPage: mealsFetchNextPage,
    hasNextPage: mealsHasNextPage,
    isFetchingNextPage: mealsFetchingNextPage,
  } = useGetUserMeals(mealType)
  const { data: meal, isLoading: mealLoading, isSuccess: mealSuccess } = useGetUserMeal()
  const { data: record, isLoading: recordLoading } = useGetUserRecord()

  const chartOptions: Highcharts.Options = {
    chart: {
      backgroundColor: '#2E2E2E',
      height: 316,
      spacing: [12, 0, 12, 0],
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

  const donutChartOptions: Highcharts.Options = {
    chart: {
      type: 'pie',
      height: 316,
      backgroundColor: 'transparent',
    },
    credits: {
      enabled: false,
    },
    title: {
      text: `<span style="font-size: 18px; margin-right: 4px">${
        meal ? meal.date : ''
      }</span><span style="font-size: 25px;">75%</span>`,
      useHTML: true,
      verticalAlign: 'middle',
      align: 'center',
      y: 20,
      style: {
        fontFamily: 'Inter',
        fontWeight: '400',
        color: 'white',
        textShadow: '0px 0px 6px #FC7400',
      },
    },
    plotOptions: {
      pie: {
        innerSize: '95%',
        fillColor: '#fff',
        borderWidth: 0,
        shadow: {
          color: '#FC7400',
          width: 6,
          offsetX: 0,
          offsetY: 0,
        },
        dataLabels: {
          enabled: false,
        },
      },
    },
    tooltip: {
      enabled: false,
    },
    series: [
      {
        type: 'pie',
        data: [
          {
            name: 'Item',
            y: 0.75,
            color: 'white',
          },
          {
            name: '',
            y: 0.25,
            color: 'transparent',
          },
        ],
      },
    ],
  }

  return (
    <div className={classes.ctn}>
      <div className={classes.slideCtn}>
        <div className={classes.currentDish}>
          {mealSuccess && <img src={meal.imageSrc} alt='Current Dish' />}
          <div className={classes.foreground}></div>
          <Loading isLoading={mealLoading} overlay />
          <div className={classes.pieChart}>
            <HighchartsReact highcharts={Highcharts} options={donutChartOptions} />
          </div>
        </div>
        <div className={classes.chartCtn}>
          <Loading isLoading={recordLoading} overlay />
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>
      </div>
      <div className={classes.mainCtn}>
        <div className={classes.filterCtn}>
          {MEAL_TYPES.map(({ imageSrc, type }) => (
            <div
              id={type}
              className={clsx(classes.filterItem, type === mealType && classes.active)}
              onClick={() => {
                if (type === mealType) {
                  setMealType(undefined)
                } else {
                  setMealType(type)
                }
              }}>
              <img src={imageSrc} alt='Meal' />
              {type}
            </div>
          ))}
        </div>
        <div className={classes.mealsCtn}>
          {meals?.pages.map(({ data }) =>
            data.map(({ id, imageSrc, date, type }) => (
              <div key={id} className={classes.meal}>
                <img className={classes.mealImg} src={imageSrc} alt='Meal' />
                <div className={classes.mealName}>{`${date}.${type}`}</div>
              </div>
            )),
          )}
        </div>
        <Loading isLoading={mealsLoading || mealsFetchingNextPage} />
        {mealsHasNextPage && (
          <div className={classes.showMore}>
            <button
              type='button'
              className='button'
              disabled={mealsLoading || mealsFetchingNextPage}
              onClick={() => mealsFetchNextPage()}>
              記録をもっと見る
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

const MEAL_TYPES = [
  {
    type: 'Morning',
    imageSrc: '/icons/icon-meal.png',
  },
  {
    type: 'Lunch',
    imageSrc: '/icons/icon-meal.png',
  },
  {
    type: 'Dinner',
    imageSrc: '/icons/icon-meal.png',
  },
  {
    type: 'Snack',
    imageSrc: '/icons/icon-snack.png',
  },
] as const
