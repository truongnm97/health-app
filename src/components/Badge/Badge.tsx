import classes from './Badge.module.scss'

type TBadgeProps = React.PropsWithChildren & {
  count?: number
}

export default function Badge({ count = 0, children }: TBadgeProps) {
  return (
    <div className={classes.badge}>
      {count ? <div className={classes.icon}>{count}</div> : null}
      {children}
    </div>
  )
}
