import styles from './LinkList.module.scss';

const LinkList = (props) => {
  const className = [
    styles.list,
    props.className
  ].filter(i => !!i).join(' ');

  return (
    <ul className={className}>
      {props.children}
    </ul>
  )
}

LinkList.defaultProps = {
}

export default LinkList;
