import React from "react";
// import PropTypes from "prop-types";

const YouTubeEmbed = () => (
    <div id="weatherCard2">
        <h3>Storm Watch</h3> 
        <div className="video-responsive">
        <iframe id="youtube"
        width="100%" 
        height="315" 
        src="https://www.youtube.com/embed/YfOF_ggEcRo" title="YouTube video player" 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        ></iframe>
        </div>
    </div>
);

// YouTubeEmbed.propTypes = {
//   embedId: PropTypes.string.isRequired
// };

export default YouTubeEmbed;
// Data gets plugged into App.js