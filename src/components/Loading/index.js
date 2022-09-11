import styles from './Loading.module.css'

const Loading = () => {
  return (
    <div className={styles.wrapper}>
      <img src={`${process.env.PUBLIC_URL}/loading.svg`} alt="Loading" />
    </div>
  )
}

export default Loading
