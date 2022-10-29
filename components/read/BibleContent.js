import PropTypes from 'prop-types';

const BibleContent = (props) => {
  const content = props.content;

  const Paragraph = (props) => {
    const item = props.item;
    const paragraphNumber = props.paragraphNumber;
    const style = item.attrs && item.attrs.style;

    return (
      <p className={style}>
        {/* Add a drop cap number to the first paragraph */}
        {paragraphNumber === 0 && props.chapterNumber && <span className="drop-cap">{props.chapterNumber}</span>}
        {/* Yes this is recursive */}
        {item.items && item.items.map((item, index) =>
          <ContentFromJson {...{ item }} key={index} />
        )}
      </p>
    )
  }

  const Verse = (props) => {
    const item = props.item;
    const { number, style, sid } = item.attrs;
    return (
      <span className={style}>
        {item.items && item.items.map((item, index) =>
          <ContentFromJson {...{ item }} key={index} />
        )}
      </span>
    )
  }

  /**
   * "An element for marking character level content types within para, table cell and note elements." 
   * More: https://ubsicap.github.io/usx/elements.html#char
   */
  const Char = (props) => {
    const item = props.item;
    const { style } = item.attrs;

    return (
      <span className={style}>
        {item.items && item.items.map((item, index) =>
          <ContentFromJson {...{ item }} key={index} />
        )}
      </span>
    )
  }

  const ContentTag = (props) => {
    const item = props.item;
    const paragraphNumber = props.paragraphNumber;
    switch (item.name) {
      case 'para': return <Paragraph {...{ item, paragraphNumber }} />
      case 'verse': return <Verse {...{ item }} />
      case 'char': return <Char {...{ item }} />
      case 'ref': console.error('ContentTag not yet implemented: Scripture reference. More info: https://ubsicap.github.io/usx/elements.html#usx-element-ref');
      default: return null;
    }
  }

  /* Returns some text as JSX.
  item.attrs is not always defined. For example verse 
  numbers are just {text, type} */
  const Text = (props) => {
    const item = props.item;
    // verseId is a string. Example: "GEN.2.24"
    const verseId = item.attrs && item.attrs.verseId;
    // verseOrgIds is an array
    const verseOrgIds = item.attrs && item.attrs.verseOrgIds;

    return item.text;
  }

  const ContentFromJson = (props) => {
    const item = props.item
    const paragraphNumber = props.paragraphNumber;
    switch (item.type) {
      case 'tag': return (
        <ContentTag {...{ item }}
          chapterNumber={props.chapterNumber}
          paragraphNumber={paragraphNumber} />
      )
      case 'text': return (
        <Text
          {...{ item }} />
      )
      case "undefined":
        console.log(item);
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
      <ContentFromJson {...{ item }} key={index} paragraphNumber={index} chapterNumber={props.chapterNumber} />
    )}
  </>
}

BibleContent.propTypes = {
  content: PropTypes.array.isRequired,
}

export default BibleContent;
