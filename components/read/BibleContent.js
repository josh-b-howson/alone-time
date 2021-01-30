import PropTypes from 'prop-types';

const BibleContent = (props) => {
  const content = props.content;

  const ContentTag = (props) => {
    const item = props.item;
    switch (item.name) {
      case 'para': return (
        <p className={item?.attrs?.style}>
          {/* Yes this is recursive */}
          {item.items && item.items.map((item, index) =>
            <ContentFromJson {...{ item }} key={index} />
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

  const ContentFromJson = (props) => {
    const item = props.item
    switch (item.type) {
      case 'tag': return <ContentTag {...{ item }} />
      case 'verse': return <Verse {...{ item }} />
      case 'text': return <Text {...{ item }} />
      case "undefined": console.log(item)
      default:
        console.error(`unknown content type "${item.type}". Check renderContentFromJson().`);
        return null;
    }
  }

  ContentFromJson.propTypes = {
    // An object containing all data necessary for rendering the content
    item: PropTypes.object.isRequired,
  }

  return <>
    {content.map((item, index) =>
      <ContentFromJson {...{ item }} key={index} />
    )}
  </>
}

BibleContent.propTypes = {
  content: PropTypes.array.isRequired,
}

export default BibleContent;
