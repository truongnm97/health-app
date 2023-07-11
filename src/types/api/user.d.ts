type TListParams = {
  page: string
  pageSize: string
}

type TUserMeal = {
  id: number
  date: string
  type: 'Morning' | 'Lunch' | 'Dinner' | 'Snack'
  imageSrc: string
}

type TUserMealList = {
  data: TUserMeal[]
  total: number
  page: number
  pageSize: number
}

type TUserRecord = {
  id: number
  bodyFat: number[]
  bodyWeight: number[]
}

type TUserExercise = {
  id: number
  title: string
  duration: string
  calories: string
}

type TUserExerciseList = {
  data: TUserExercise[]
  total: number
  page: number
  pageSize: number
}

type TUserDiary = {
  id: number
  createdDate: string
  content: string
}

type TUserDiaries = {
  data: TUserDiary[]
  total: number
  page: number
  pageSize: number
}

type TUserRecommendation = {
  id: number
  title: string
  createdDate: string
  imageSrc: string
  hashtag: string[]
}

type TUserRecommendationList = {
  data: TUserRecommendation[]
  total: number
  page: number
  pageSize: number
}
