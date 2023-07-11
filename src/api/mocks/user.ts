import { rest } from 'msw'
import { API_PATH, getRandomNumbers } from 'utils'

const DEFAULT_PAGE_SIZE = 10

function getListPaging<T>(
  data: T[],
  page: number | string | null,
  pageSize: number | string | null,
) {
  if (typeof page !== 'number') {
    page = Number(page) || 1
  }
  if (typeof pageSize !== 'number') {
    pageSize = Number(pageSize) || DEFAULT_PAGE_SIZE
  }

  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize

  const newData = data.slice(startIndex, endIndex)

  return {
    data: newData,
    page,
    pageSize,
    total: data.length,
  }
}

export default [
  rest.get(API_PATH.USER, (_, res, ctx) => {
    const isAuthenticated = localStorage.getItem('is-authenticated')

    if (!isAuthenticated) {
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Not authorized',
        }),
      )
    }

    return res(
      ctx.status(200),
      ctx.json({
        username: 'admin',
      }),
    )
  }),

  rest.get<null, never, TUserMealList>(API_PATH.USER_MEALS, (req, res, ctx) => {
    const page = req.url.searchParams.get('page')
    const pageSize = req.url.searchParams.get('pageSize')

    return res(ctx.status(200), ctx.json(getListPaging(MEALS_RESPONSE, page, pageSize)))
  }),

  rest.get<null, never, TUserMeal>(API_PATH.USER_MEAL, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(MEALS_RESPONSE[2]))
  }),

  rest.get<null, never, TUserRecord>(API_PATH.USER_RECORD, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        bodyFat: getRandomNumbers(12),
        bodyWeight: getRandomNumbers(12),
        id: 1,
      }),
    )
  }),

  rest.get<null, never, TUserDiaries>(API_PATH.USER_DIARIES, (req, res, ctx) => {
    const page = req.url.searchParams.get('page')
    const pageSize = req.url.searchParams.get('pageSize')

    return res(ctx.status(200), ctx.json(getListPaging(DIARIES_RESPONSE, page, pageSize)))
  }),

  rest.get<null, never, TUserExerciseList>(API_PATH.USER_EXERCISES, (req, res, ctx) => {
    const page = req.url.searchParams.get('page')
    const pageSize = req.url.searchParams.get('pageSize')

    return res(ctx.status(200), ctx.json(getListPaging(EXERCISES_RESPONSE, page, pageSize)))
  }),

  rest.get<null, never, TUserRecommendationList>(API_PATH.USER_RECOMMENDATIONS, (req, res, ctx) => {
    const page = req.url.searchParams.get('page')
    const pageSize = req.url.searchParams.get('pageSize')

    return res(ctx.status(200), ctx.json(getListPaging(RECOMMENDATIONS_RESPONSE, page, pageSize)))
  }),
]

const MEALS_RESPONSE: TUserMeal[] = [
  {
    id: 1,
    date: '05.21',
    type: 'Morning',
    imageSrc: '/images/m01.jpg',
  },
  {
    id: 2,
    date: '05.21',
    type: 'Morning',
    imageSrc: '/images/l03.jpg',
  },
  {
    id: 3,
    date: '05.21',
    type: 'Morning',
    imageSrc: '/images/d01.jpg',
  },
  {
    id: 4,
    date: '05.21',
    type: 'Morning',
    imageSrc: '/images/l01.jpg',
  },
  {
    id: 5,
    date: '05.20',
    type: 'Morning',
    imageSrc: '/images/m02.jpg',
  },
  {
    id: 6,
    date: '05.20',
    type: 'Morning',
    imageSrc: '/images/l02.jpg',
  },
  {
    id: 7,
    date: '05.20',
    type: 'Morning',
    imageSrc: '/images/d02.jpg',
  },
  {
    id: 8,
    date: '05.20',
    type: 'Morning',
    imageSrc: '/images/s01.jpg',
  },
  {
    id: 9,
    date: '05.21',
    type: 'Morning',
    imageSrc: '/images/m01.jpg',
  },
  {
    id: 10,
    date: '05.21',
    type: 'Morning',
    imageSrc: '/images/l03.jpg',
  },
  {
    id: 11,
    date: '05.21',
    type: 'Morning',
    imageSrc: '/images/d01.jpg',
  },
  {
    id: 12,
    date: '05.21',
    type: 'Morning',
    imageSrc: '/images/l01.jpg',
  },
  {
    id: 13,
    date: '05.20',
    type: 'Morning',
    imageSrc: '/images/m02.jpg',
  },
  {
    id: 14,
    date: '05.20',
    type: 'Morning',
    imageSrc: '/images/l02.jpg',
  },
  {
    id: 15,
    date: '05.20',
    type: 'Morning',
    imageSrc: '/images/d02.jpg',
  },
  {
    id: 16,
    date: '05.20',
    type: 'Morning',
    imageSrc: '/images/s01.jpg',
  },
]

const DIARIES_RESPONSE: TUserDiary[] = [
  {
    id: 1,
    createdDate: '2021.05.21 23:25',
    content: `私の日記の記録が一部表示されます。
    テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト…`,
  },
  {
    id: 2,
    createdDate: '2021.05.21 23:25',
    content: `私の日記の記録が一部表示されます。
    テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト…`,
  },
  {
    id: 3,
    createdDate: '2021.05.21 23:25',
    content: `私の日記の記録が一部表示されます。
    テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト…`,
  },
  {
    id: 4,
    createdDate: '2021.05.21 23:25',
    content: `私の日記の記録が一部表示されます。
    テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト…`,
  },
  {
    id: 5,
    createdDate: '2021.05.21 23:25',
    content: `私の日記の記録が一部表示されます。
    テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト…`,
  },
  {
    id: 6,
    createdDate: '2021.05.21 23:25',
    content: `私の日記の記録が一部表示されます。
    テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト…`,
  },
  {
    id: 7,
    createdDate: '2021.05.21 23:25',
    content: `私の日記の記録が一部表示されます。
    テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト…`,
  },
  {
    id: 8,
    createdDate: '2021.05.21 23:25',
    content: `私の日記の記録が一部表示されます。
    テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト…`,
  },
  {
    id: 9,
    createdDate: '2021.05.21 23:25',
    content: `私の日記の記録が一部表示されます。
    テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト…`,
  },
  {
    id: 10,
    createdDate: '2021.05.21 23:25',
    content: `私の日記の記録が一部表示されます。
    テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト…`,
  },
  {
    id: 11,
    createdDate: '2021.05.21 23:25',
    content: `私の日記の記録が一部表示されます。
    テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト…`,
  },
  {
    id: 12,
    createdDate: '2021.05.21 23:25',
    content: `私の日記の記録が一部表示されます。
    テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト…`,
  },
  {
    id: 13,
    createdDate: '2021.05.21 23:25',
    content: `私の日記の記録が一部表示されます。
    テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト…`,
  },
  {
    id: 14,
    createdDate: '2021.05.21 23:25',
    content: `私の日記の記録が一部表示されます。
    テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト…`,
  },
  {
    id: 15,
    createdDate: '2021.05.21 23:25',
    content: `私の日記の記録が一部表示されます。
    テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト…`,
  },
  {
    id: 16,
    createdDate: '2021.05.21 23:25',
    content: `私の日記の記録が一部表示されます。
    テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト…`,
  },
]

const EXERCISES_RESPONSE: TUserExercise[] = [
  {
    id: 1,
    title: '家事全般（立位・軽い',
    duration: '10 min',
    calories: '26kcal',
  },
  {
    id: 2,
    title: '家事全般（立位・軽い',
    duration: '10 min',
    calories: '26kcal',
  },
  {
    id: 3,
    title: '家事全般（立位・軽い',
    duration: '10 min',
    calories: '26kcal',
  },
  {
    id: 4,
    title: '家事全般（立位・軽い',
    duration: '10 min',
    calories: '26kcal',
  },
  {
    id: 5,
    title: '家事全般（立位・軽い',
    duration: '10 min',
    calories: '26kcal',
  },
  {
    id: 6,
    title: '家事全般（立位・軽い',
    duration: '10 min',
    calories: '26kcal',
  },
  {
    id: 7,
    title: '家事全般（立位・軽い',
    duration: '10 min',
    calories: '26kcal',
  },
  {
    id: 8,
    title: '家事全般（立位・軽い',
    duration: '10 min',
    calories: '26kcal',
  },
  {
    id: 9,
    title: '家事全般（立位・軽い',
    duration: '10 min',
    calories: '26kcal',
  },
  {
    id: 10,
    title: '家事全般（立位・軽い',
    duration: '10 min',
    calories: '26kcal',
  },
  {
    id: 11,
    title: '家事全般（立位・軽い',
    duration: '10 min',
    calories: '26kcal',
  },
  {
    id: 12,
    title: '家事全般（立位・軽い',
    duration: '10 min',
    calories: '26kcal',
  },
  {
    id: 13,
    title: '家事全般（立位・軽い',
    duration: '10 min',
    calories: '26kcal',
  },
]

const RECOMMENDATIONS_RESPONSE: TUserRecommendation[] = [
  {
    id: 1,
    title: '魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ',
    createdDate: '2021.05.17 23:25',
    imageSrc: '/images/column-1.jpg',
    hashtag: ['#魚料理', '#和食', '#DHA'],
  },
  {
    id: 2,
    title: '魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ',
    createdDate: '2021.05.17 23:25',
    imageSrc: '/images/column-2.jpg',
    hashtag: ['#魚料理', '#和食', '#DHA'],
  },
  {
    id: 3,
    title: '魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ',
    createdDate: '2021.05.17 23:25',
    imageSrc: '/images/column-3.jpg',
    hashtag: ['#魚料理', '#和食', '#DHA'],
  },
  {
    id: 4,
    title: '魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ',
    createdDate: '2021.05.17 23:25',
    imageSrc: '/images/column-4.jpg',
    hashtag: ['#魚料理', '#和食', '#DHA'],
  },
  {
    id: 5,
    title: '魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ',
    createdDate: '2021.05.17 23:25',
    imageSrc: '/images/column-5.jpg',
    hashtag: ['#魚料理', '#和食', '#DHA'],
  },
  {
    id: 6,
    title: '魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ',
    createdDate: '2021.05.17 23:25',
    imageSrc: '/images/column-6.jpg',
    hashtag: ['#魚料理', '#和食', '#DHA'],
  },
  {
    id: 7,
    title: '魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ',
    createdDate: '2021.05.17 23:25',
    imageSrc: '/images/column-7.jpg',
    hashtag: ['#魚料理', '#和食', '#DHA'],
  },
  {
    id: 8,
    title: '魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ',
    createdDate: '2021.05.17 23:25',
    imageSrc: '/images/column-8.jpg',
    hashtag: ['#魚料理', '#和食', '#DHA'],
  },
  {
    id: 9,
    title: '魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ',
    createdDate: '2021.05.17 23:25',
    imageSrc: '/images/column-1.jpg',
    hashtag: ['#魚料理', '#和食', '#DHA'],
  },
  {
    id: 10,
    title: '魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ',
    createdDate: '2021.05.17 23:25',
    imageSrc: '/images/column-2.jpg',
    hashtag: ['#魚料理', '#和食', '#DHA'],
  },
  {
    id: 11,
    title: '魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ',
    createdDate: '2021.05.17 23:25',
    imageSrc: '/images/column-3.jpg',
    hashtag: ['#魚料理', '#和食', '#DHA'],
  },
  {
    id: 12,
    title: '魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ',
    createdDate: '2021.05.17 23:25',
    imageSrc: '/images/column-4.jpg',
    hashtag: ['#魚料理', '#和食', '#DHA'],
  },
  {
    id: 13,
    title: '魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ',
    createdDate: '2021.05.17 23:25',
    imageSrc: '/images/column-5.jpg',
    hashtag: ['#魚料理', '#和食', '#DHA'],
  },
  {
    id: 14,
    title: '魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ',
    createdDate: '2021.05.17 23:25',
    imageSrc: '/images/column-6.jpg',
    hashtag: ['#魚料理', '#和食', '#DHA'],
  },
  {
    id: 15,
    title: '魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ',
    createdDate: '2021.05.17 23:25',
    imageSrc: '/images/column-7.jpg',
    hashtag: ['#魚料理', '#和食', '#DHA'],
  },
  {
    id: 16,
    title: '魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ',
    createdDate: '2021.05.17 23:25',
    imageSrc: '/images/column-8.jpg',
    hashtag: ['#魚料理', '#和食', '#DHA'],
  },
]
