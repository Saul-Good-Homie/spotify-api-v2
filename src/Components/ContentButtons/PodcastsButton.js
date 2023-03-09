import "./ContentButton.css"

const PodcastButton = (data) => {
    return (
    <>
      <button className="content-button">{data.children}</button>
    </>
  );
};

export default PodcastButton;