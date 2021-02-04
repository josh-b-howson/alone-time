import PropTypes from 'prop-types';

const BibleContent = (props) => {
  const content = props.content;

  const ContentTag = (props) => {
    const item = props.item;
    const paragraphNumber = props.paragraphNumber;
    switch (item.name) {
      case 'para': return (
        <p className={item?.attrs?.style}>
          {paragraphNumber===0 && props.chapterNumber && <span className="drop-cap">{props.chapterNumber}</span>}
          {/* Yes this is recursive */}
          {item.items && item.items.map((item, index) =>
            <ContentFromJson {...{ item }} key={index} />
          )}
          <style jsx>{`
            .drop-cap {
              float:left;

              font-size:4.8rem;
              line-height:1;
              text-indent:0;
              padding-right:.5rem;
              font-style:normal;
            }
          `}</style>
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
    const paragraphNumber = props.paragraphNumber;
    switch (item.type) {
      case 'tag': return <ContentTag {...{ item }} chapterNumber={props.chapterNumber} paragraphNumber={paragraphNumber} />
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

  /**
   * Add a drop cap number to the first paragraph
   */
  return <>
    {content.map((item, index) =>
      <ContentFromJson {...{ item }} key={index} paragraphNumber={index} chapterNumber={props.chapterNumber} />
    )}
  </>
}

BibleContent.propTypes = {
  content: PropTypes.array.isRequired,
}

export default BibleContent;
