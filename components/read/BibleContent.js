import PropTypes from 'prop-types';

const BibleContent = (props) => {
  const content = props.content;

  const ContentTag = (props) => {
    const item = props.item;
    switch (item.name) {
      case 'para': return (
        <p className={item?.attrs?.style}>
          {item.items && item.items.map(item =>
            renderContentFromJson(item)
          )}
        </p>
      )
      default: return null;
    }
  }

  const Verse = (props) => {
    const item = props.item
    return (
      <span className={item?.attrs?.style}>
        {item.items && item.items.map(item =>
          renderContentFromJson(item)
        )}
      </span>
    )
  }

  const Text = (props) => {
    const item = props.item;
    return item.text;
  }

  const renderContentFromJson = (item) => {
    switch (item.type) {
      case 'tag': return <ContentTag item={item} />
      case 'verse': return <Verse item={item} />
      case 'text': return <Text item={item} />
      default:
        console.error(`unknown content type "${item.type}". Check renderContentFromJson().`);
        return null;
    }
  }

  return <>
    {content.map(item => renderContentFromJson(item))}
  </>
}

BibleContent.propTypes = {
  content: PropTypes.array.isRequired,
}

export default BibleContent;
