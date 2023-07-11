import classes from './Loading.module.scss'

type TLoadingProps = React.PropsWithChildren & {
  isLoading: boolean
  overlay?: boolean
}

export default function Loading({ isLoading, overlay }: TLoadingProps) {
  if (!isLoading) {
    return null
  }

  if (overlay) {
    return (
      <div className={classes.ldsOverlay}>
        <div className={classes.ldsEllipsis}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    )
  }

  return (
    <div className={classes.ldsEllipsis}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
