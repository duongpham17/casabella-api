import styles from './More.module.scss';
import Slidein from '@components/slidein';

const More = ({button}: {button: any}) => {
  return (
    <Slidein icon={button}>
      <div className={styles.container}>
          <p>{`<h1> Header 1 </h1>`}</p>
          <p>{`<h2> Header 2 </h2>`}</p>
          <p>{`<p> Paragraph </p>`}</p>
          <p>{`<img> <url> </img>`}</p>
          <p>{`<video> <url> </video>`}</p>
          <p>{`<youtube> <embed url E.g  https://www.youtube.com/embed/...> </youtube>`}</p>
      </div>
    </Slidein>
  )
}

export default More